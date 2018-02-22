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

var http = require('https');

var Mastodon = function(config) {
  var self = this;
  if (!(self instanceof Mastodon)) {
    return new Mastodon(config);
  }
  self.config = config;
}


function receive(incoming, callback) {
  var data = '';
  incoming.on('data', function(chunk) { data += chunk; });
  incoming.on('end', function() { callback ? callback(data) : ''; });
}

Mastodon.prototype.post = function (message, callback) {
  var self = this;
  if (undefined === self.config) {
    console.log("log: TODO: must provide config, attempt to use defaults: " + self.config);
    return 1;
  }
  if (undefined === message) {
    message = "ping from #IoTJs to @TizenHelper@quitter.is";
    console.log("log: TODO: must provide message, attempt to use default: " + message);
  }

  message = 'status=' + message ;
  var config = self.config;
  config.method = "POST";
  config.path = self.config.api + "/statuses"
  config.headers = {
    'Content-Length': message.length,
    'Authorization': "Bearer " + self.config.access_token
  };

  if (undefined === callback) {
    callback = function(data) {
      if (true) console.log(data);
    }
  }
  
  http.request(config, function(res) {
    receive(res, callback);
  }).end(message);
}

Mastodon.prototype.get = function (path, callback) {
  var self = this;
  if (undefined === self.config) {
    console.log("log: TODO: must provide config, attempt to use defaults: " + self.config);
    return 1;
  }
  if (undefined === path) {
    path = "/timeline/home";
    console.log("log: TODO: must provide message, attempt to use default: " + message);
  }

  var config = self.config;
  config.method = "GET";
  config.path = self.config.api + "/" + path;
  config.headers = {
    'Authorization': "Bearer " + self.config.access_token
  };

  if (undefined === callback) {
    callback = function(data) {
      if (true) console.log(data);
    }
  }
  http.request(config, function(res) {
    receive(res, callback);
  }).end();
}


module.exports = Mastodon;
