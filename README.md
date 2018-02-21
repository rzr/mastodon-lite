# MASTODON-LITE #

Lightweight client for mastodon micro blogging service.

This implantation is focusing on reducing dependencies,
for supporting iotjs runtime.

So far only 'https' module is used (and 'fs' for the example)


## USAGE ##

Using iotjs:


```
# First generate a config file in ~/.mastodon-lite.js
iotjs main.js

# Then update host, and application token, for instance:

https://mastodon.social/settings/applications

# List user timeline
iotjs main.js

# Post a message
iotjs main.js 'Hi @TizenHelper@quitter.is I am using #IoTJS too"
```

Same for NodeJS:

```
NODE_PATH=. node main.js
```


## MISC ##

* https://github.com/rzr/mastodon-lite
* http://iotjs.net
