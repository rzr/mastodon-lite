#!/bin/make -f
# -*- makefile -*-
# SPDX-License-Identifier: Apache-2.0
#{
# Copyright 2018-present Samsung Electronics France SAS, and other contributors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#}

default: build


runtime?=iotjs
srcs?=mastodon-lite.js
V?=1
eslint ?= node_modules/eslint/bin/eslint.js

%/run: example/index.js
	${@D} $<

%/check: ${srcs}
	${@D} $<

run: ${runtime}/run
	@echo "# log: $@: $^"

check: ${runtime}/check
	@echo "# log: $@: $^"

test: check run
	@echo "# log: $@: $^"

clean:
	rm -rf *~

cleanall: clean
	rm -rf node_modules iotjs_modules

distclean: cleanall
	rm -rf tmp

setup:
	@echo "log: Expected iotjs help to be printed"
	${runtime} -h ||:

rule/npm/version/%: package.json
	-git describe --tags
	cd example/webthing && npm version ${@F}
	-git add example/webthing/package*.json
	cd example/mozilla-iot-activitypub-adapter && npm version ${@F}
	-git add example/*/package*.json
	-git commit -sam "webthing: Update version to ${@F}"
	-git add package*.json
	npm version ${@F}

${eslint}:
	npm install --only=dev

rule/eslint: .eslintrc.js ${eslint}
	@rm -rf tmp/dist
	${eslint} --no-color --fix . ||:
	${eslint} --no-color .
	git diff --exit-code

lint: rule/eslint
	@echo "# log: $@: $^"

