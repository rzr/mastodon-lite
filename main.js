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

var Mastodon;
try {
  Mastodon = require('./mastodon-lite');
} catch (err) {
  Mastodon = require('mastodon-lite');
}
var conf = process.env.HOME + "/.mastodon-lite.json";

var config = {
  access_token: '[TODO: Update with app token at https://mastodon.social/settings/applications]',
  host: 'mastodon.social',
  port: 443,
  api: '/api/v1',
  rejectUnauthorized: false
};

var fs = require('fs');
var mastodon;

try {
  config = JSON.parse(fs.readFileSync(conf, 'utf8'));
  //TODO: If used as module update with "require('mastodon-lite')" 
  mastodon = Mastodon(config);
} catch(err)
{
  fs.writeFileSync(conf, JSON.stringify(config,null,2));
  console.log("error: TODO: edit configuration file " + conf);
  process.exit(1);
}

var message;
if (process.argv.length > 2) {
  message = process.argv[2];
  mastodon.post(message);
} else {
  mastodon.get('timelines/home');
}
