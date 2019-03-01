// -*- mode: js; js-indent-level:2;  -*-
/* Copyright 2017-present Samsung Electronics Co., Ltd. and other contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var fs = require('fs');
var console = require('console');
var Mastodon;
try {
  Mastodon = require('../mastodon-lite');
} catch (err) {
  Mastodon = require('mastodon-lite');
}
var conf = process.env.HOME + '/.mastodon-lite.json';

var config = {
  access_token: '[TODO: Update with app token at https://mastodon.social/settings/applications]',
  host: 'mastodon.social',
  port: 443,
  api: '/api/v1',
  rejectUnauthorized: false
};

try {
  config = JSON.parse(fs.readFileSync(conf, 'utf8'));
} catch (err) {
  fs.writeFileSync(conf, JSON.stringify(config, null, 2));
  console.log('error: TODO: edit configuration file ' + conf);
  process.exit(0);
}

module.exports = function(argv, callback) {
  var mastodon = Mastodon(config);
  var verb = 'get';
  var token = null;
  var idx = 2;

  if (argv.length > idx && (token = argv[idx])) {
    if (token === 'get' || token === 'post' ||
        token === 'put' || token === 'delete') {
      verb = token;
      idx += 1;
    } else {
      verb = 'post';
    }
  }

  switch (verb) {

  case 'post':
    if (argv.length > idx) {
      var message = null;
      message = argv[idx];
      mastodon.post(message, function(data) {
        callback(null, data);
      });
    }
    break;

  case 'get':
    var endpoint = 'timelines/home';
    if (argv.length > idx) endpoint = argv[idx];
    mastodon.get(endpoint, function(data) {
      callback(null, data);
    });
    break;

  default:
    if (callback) return callback('Error: Must be implemented', null);
    break;
  }
};


if (module.parent === null) {
  module.exports(process.argv, function(err, data) {
    console.log(err, data);
  });
}
