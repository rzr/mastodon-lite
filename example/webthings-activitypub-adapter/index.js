/* -*- mode: js; js-indent-level:2;  -*-
   SPDX-License-Identifier: MPL-2.0 */
/**
 * Index.js - Loads the ActivityPub adapter.
 *
 * Copyright 2018-present Samsung Electronics Co., Ltd. and other contributors
 */

function maybeLoadActivityPubAdapter(addonManager, _, errorCallback) {
  const loadActivityPubAdapter = require('./activitypub-adapter');

  return loadActivityPubAdapter(addonManager, errorCallback);
}

module.exports = maybeLoadActivityPubAdapter;
