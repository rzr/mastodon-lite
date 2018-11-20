/* -*- mode: js; js-indent-level:2;  -*-
   SPDX-License-Identifier: Apache-2.0 */
/* Copyright 2018-present Samsung Electronics Co., Ltd. and other contributors
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
var console = require('console');
var webthing = require('webthing');
var Property = webthing.Property;
var SingleThing = webthing.SingleThing;
var Thing = webthing.Thing;
var Value = webthing.Value;
var WebThingServer = webthing.WebThingServer;

var fs = require('fs');
var Mastodon = require('mastodon-lite');

// TODO: Workaround TizenRT issue
if (!process.env.HOME) {
  process.env.HOME = process.env.IOTJS_PATH;
}
var conf = process.env.HOME + '/.mastodon-lite.json';
console.log('log: Loading private file: ' + conf);
var config = JSON.parse(fs.readFileSync(conf, 'utf8'));
var mastodon = Mastodon(config);

function main () {
  var self = this;
  var port = process.argv[2] ? Number(process.argv[2]) : 8888;
  var message = process.argv[3] ? String(process.argv[3])
      : 'https://www.npmjs.com/package/mastodon-lite# Hello world! from #MastodonLite';
  var url = 'http://localhost:' + port + '/properties/message';

  console.log('Usage:\n' +
              process.argv[0] + ' ' + process.argv[1] + ' [port]\n' +
              'Try:\ncurl -H "Content-Type: application/json" -X PUT --data \'{"message": "' +
              message + '"} \' ' + url + '\n');

  var thing = new Thing('MastodonActuator', ['String'], 'An actuator example that just blog');

  thing.addProperty(new Property(
    thing,
    'message',
    new Value(message, function (value) {
      if (self.message !== String(value)) {
        self.message = String(value);
        console.log(self.message);
        mastodon.post(String(value));
      }
    }),
    {
      label: 'Message',
      type: 'string',
      description: 'Message to be sent on change'
    }
  ));

  var server = new WebThingServer(new SingleThing(thing), port);
  process.on('SIGINT', function () {
    server.stop();
    process.exit();
  });
  server.start();
}

main();
