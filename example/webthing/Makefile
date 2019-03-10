#!/bin/make -f
# -*- makefile -*-
# SPDX-License-Identifier: Apache-2.0
# Copyright: 2018-present Samsung Electronics France SAS, and contributors

example_file?=index.js

IOTJS_EXTRA_MODULE_PATH?=../..
export IOTJS_EXTRA_MODULE_PATH

port?=8888
base_url?=http://localhost:${port}
webthing_url?=https://github.com/rzr/webthing-iotjs
runtime?=iotjs

iotjs_modules_dir?=${CURDIR}/iotjs_modules
iotjs_modules_dirs?=${iotjs_modules_dir}/webthing-iotjs


${iotjs_modules_dir}/webthing-iotjs:
	@mkdir -p $@
	git clone --depth 1 --recursive ${webthing_url} $@
	make -C $@ iotjs/modules iotjs_modules_dir=${iotjs_modules_dir}

iotjs/start: ${example_file} modules
	iotjs $<

iotjs/debug: ${example_file}
	rm -rf node_modules
	NODE_PATH=iotjs_modules:../.. node $<
test:
	curl ${base_url}
	@echo
	curl ${base_url}/properties
	@echo
	curl ${base_url}/properties/message
	@echo
	curl \
 -X PUT \
 -H "Content-Type: application/json" \
 --data "{\"message\":\"${webthing_url}# #WebThingIotJs\"}" \
 "${base_url}/properties/message"
	@echo
	curl ${base_url}/properties/message
	@echo

node_modules: package.json
	npm install

node/modules: node_modules
	ls $<

modules: ${runtime}/modules
	@echo "# $@: $^"

node/start: node_modules
	npm start

start: iotjs/start
	@echo "# $@: $^"

run: start
	@echo "# $@: $^"

cleanall:
	rm -rf iotjs_modules node_modules

put:
	echo "npm start ${port} post"

timelines/%: ${example_file} ${iotjs_modules_subdirs}
	iotjs $< ${port}  get '$@?limit=1'
#	npm start ${port} get '$@?limit=1'

${HOME}/.mastodon-lite.conf: ../../mastodon-lite.js
	make -C ${<D} start

demo: timelines/home ${HOME}/.mastodon-lite.conf
	@echo "# $@: $^"

iotjs/modules: ${iotjs_modules_dirs}
	ls $<
