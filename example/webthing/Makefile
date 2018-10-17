base_url?=http://localhost:8888
webthing_url?=https://github.com/rzr/webthing-iotjs

iotjs_modules/webthing:
	@mkdir -p $@
	git clone --depth 1 --recursive ${webthing_url} $@

iotjs_modules/webthing/%: iotjs_modules/webthing
	@ls $@

iotjs/run: index.js iotjs_modules/webthing/index.js
	IOTJS_EXTRA_MODULE_PATH=../..:iotjs_modules iotjs $<

iotjs/debug:
	rm -rf node_modules
	NODE_PATH=iotjs_modules:../.. node index.js

test:
	curl ${base_url}
	@echo
	curl ${base_url}/properties
	@echo
	curl ${base_url}/properties/level
	@echo
	curl -H "Content-Type: application/json" -X PUT --data '{"level": 42}' http://localhost:8888/properties/level
	curl ${base_url}/properties/level
	@echo

node_modules: package.json
	npm install

node/run: node_modules
	npm start

run: iotjs/run
	@echo "# $@: $^"
