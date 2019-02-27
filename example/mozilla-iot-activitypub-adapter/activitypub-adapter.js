// -*- mode: js; js-indent-level:2;  -*-
// SPDX-License-Identifier: MPL-2.0
/**
 * activitypub-adapter.js - ActivityPub adapter.
 *
 * Copyright 2018-present Samsung Electronics Co., Ltd. and other contributors
 */

const Mastodon = require('mastodon-lite');

const {
  Adapter,
  Device,
  Property,
} = require('gateway-addon');

function message() {
  return {
    name: 'message',
    metadata: {
      type: 'string',
    },
  };
}

const mastodonActuator = {
  type: 'stringActuator',
  actuatorType: 'stringActuator',
  name: 'ActivityPubActuator',
  properties: [
    message(),
  ],
};


const ACTIVITYPUB_THINGS = [
  mastodonActuator,
];


class ActivityPubProperty extends Property {
  constructor(device, name, desc, value) {
    super(device, name, desc);
    this.setCachedValue(value);
    this.device.notifyPropertyChanged(this);
  }

  setValue(value) {
    const changed = this.value !== value;
    return new Promise((resolve, reject) => {
      super.setValue(value).then((updatedValue) => {
        resolve(updatedValue);
        if (changed) {
          this.device.adapter.mastodon.post(updatedValue);
          this.device.notifyPropertyChanged(this);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

class ActivityPubDevice extends Device {
  constructor(adapter, id, config) {
    super(adapter, id);
    this.config = config;
    this.type = config.type;
    this.name = config.name;
    this.description = 'ActivityPub Actuator';
    this.actuatorType = config.actuatorType;

    for (const prop of config.properties) {
      this.properties.set(
        prop.name, new ActivityPubProperty(this, prop.name, prop.metadata,
                                           '#IgnoreThis'));
    }

    this.adapter.handleDeviceAdded(this);
  }
}

class ActivityPubAdapter extends Adapter {
  constructor(addonManager, manifest) {
    super(addonManager, manifest.name, manifest.name);
    addonManager.addAdapter(this);

    let devices;
    if (manifest.moziot.config.hasOwnProperty('activitypub') &&
        manifest.moziot.config.activitypub.length > 0) {
      devices = manifest.moziot.config.activitypub;
    } else {
      devices = ACTIVITYPUB_THINGS;
    }

    this.config = {};
    this.config.access_token = manifest.moziot.config.access_token;
    this.config.hostname = (manifest.moziot.config.hostname ||
                            'mastodon.social');
    this.config.port = Number(manifest.moziot.config.port || 443);
    this.config.api = (manifest.moziot.config.api || '/api/v1');
    this.config.rejectUnauthorized =
      Boolean(manifest.moziot.config.rejectUnauthorized);
    this.mastodon = Mastodon(this.config);

    for (const device in devices) {
      new ActivityPubDevice(this, device, devices[device]);
    }
  }
}

function loadActivityPubAdapter(addonManager, manifest, errorCallback) {
  try {
    new ActivityPubAdapter(addonManager, manifest);
  } catch (err) {
    errorCallback(manifest.name, `error: Failed to construct${err}`);
  }
}

module.exports = loadActivityPubAdapter;
