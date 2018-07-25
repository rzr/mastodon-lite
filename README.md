# MASTODON-LITE #

Lightweight client for mastodon micro blogging service.

This implementation is focusing on reducing dependencies,
for supporting iotjs runtime, (as well as node).

So far only 'https' module is used (and 'fs' for the example app)

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frzr%2Fmastodon-lite.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Frzr%2Fmastodon-lite?ref=badge_shield)


## USAGE: ##


### USING NODEJS: ###

Running from sources tree is straightforward, but each step will be detailed.


#### PREREQUISITE: ###

Then user need to create an account on decentralized, mastodon social network (or setup your own instance)

* https://instances.social

While we're here, let's go to settings to create an application and generate it's secret token, that will be used later:

Once logged go to "Settings" / "Development" / "New Application" ie:
* https://mastodon.social/settings/applications/new

Then just set application name to "mastodon-lite" or any name of your choice, other fields can be skipped.


#### CONFIGURE: ####

On first run, if not already present, configuration file will generated in ~/.mastodon-lite.js.

```
cd ../mastodon-lite
nodejs main.js
error: TODO: edit configuration file ~/.mastodon-lite.json
```

Then update credentials in template file with "Your access token" in earlier step,
if running on different instance, host and port should be changed accordingly,

Alternatively, class can be included directly from current work directory:

```
sed -e 's/mastodon-lite/index.js/g' < main.js
nodejs main.js
```


#### FETCH CONTENTS: ####

By default timeline will be displayed:

```
nodejs main.js
```

Response is a JSON stream of all posts:

```
[
{
  "id": "99568354696365896",
  "created_at": "2018-02-22T09:42:01.636Z",
   (...)
  "uri": "https://mastodon.social/users/rzr/statuses/99568354696365896",
  "content": "<p><a href=\"https://www.npmjs.com/package/mastodon-lite#\" rel=\"nofollow noopener\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"ellipsis\">npmjs.com/package/mastodon-lit</span><span class=\"invisible\">e#</span></a> <a href=\"https://mastodon.social/tags/mastodonlite\" class=\"mention hashtag\" rel=\"tag\">#<span>MastodonLite</span></a> : A lightweight <a href=\"https://mastodon.social/tags/mastodon\" class=\"mention hashtag\" rel=\"tag\">#<span>Mastodon</span></a> client to support <a href=\"https://mastodon.social/tags/constrainteddevices\" class=\"mention hashtag\" rel=\"tag\">#<span>ConstraintedDevices</span></a> using <a href=\"https://mastodon.social/tags/iotjs\" class=\"mention hashtag\" rel=\"tag\">#<span>IotJs</span></a></p>",
  "url": "https://mastodon.social/@rzr/99568354696365896",
   (...)
(...)
]
```


#### POSTING: ####

To post a message, just add a quoted message as parameter:

```
nodejs main.js 'https://www.npmjs.com/package/mastodon-lite# #MastodonLite : A lightweight #Mastodon client to support #ConstraintedDevices using #IotJs cc: @TizenHelper@quitter.is '
```

Message (toot) should be displayed on your profile's page (ie: https://mastodon.social/@tizenhelper/99568473401250711 )
and client will get server's answer in this form:

```
{
  "id": "99568473401250711",
  "created_at": "2018-02-22T10:12:12.931Z",
  "in_reply_to_id": null,
  "in_reply_to_account_id": null,
  "sensitive": false,
  "spoiler_text": "",
  "visibility": "public",
  "language": "en",
  "uri": "https://mastodon.social/users/tizenhelper/statuses/99568473401250711",
  "content": "<p><a href=\"https://www.npmjs.com/package/mastodon-lite#\" rel=\"nofollow noopener\" target=\"_blank\"><span class=\"invisible\">https://www.</span><span class=\"ellipsis\">npmjs.com/package/mastodon-lit</span><span class=\"invisible\">e#</span></a> <a href=\"https://mastodon.social/tags/mastodonlite\" class=\"mention hashtag\" rel=\"tag\">#<span>MastodonLite</span></a> : A lightweight <a href=\"https://mastodon.social/tags/mastodon\" class=\"mention hashtag\" rel=\"tag\">#<span>Mastodon</span></a> client to support <a href=\"https://mastodon.social/tags/constrainteddevices\" class=\"mention hashtag\" rel=\"tag\">#<span>ConstraintedDevices</span></a> using <a href=\"https://mastodon.social/tags/iotjs\" class=\"mention hashtag\" rel=\"tag\">#<span>IotJs</span></a> cc: <span class=\"h-card\"><a href=\"https://quitter.is/tizenhelper\" class=\"u-url mention\">@<span>tizenhelper</span></a></span></p>",
  "url": "https://mastodon.social/@tizenhelper/99568473401250711",
  "reblogs_count": 0,
  "favourites_count": 0,
  "favourited": false,
  "reblogged": false,
  "muted": false,
  "pinned": false,
  "reblog": null,
  "application": {
    "name": "mastodon-lite",
    "website": "https://www.npmjs.com/package/mastodon-lite"
  },
  "account": {
    "id": "287178",
    "username": "tizenhelper",
    "acct": "tizenhelper",
    "display_name": "",
    "locked": false,
    "created_at": "2018-02-22T09:55:04.226Z",
    "note": "<p></p>",
    "url": "https://mastodon.social/@tizenhelper",
    "avatar": "https://mastodon.social/avatars/original/missing.png",
    "avatar_static": "https://mastodon.social/avatars/original/missing.png",
    "header": "https://mastodon.social/headers/original/missing.png",
    "header_static": "https://mastodon.social/headers/original/missing.png",
    "followers_count": 0,
    "following_count": 2,
    "statuses_count": 1
  },
  "media_attachments": [],
  "mentions": [
    {
      "id": "287020",
      "username": "tizenhelper",
      "url": "https://quitter.is/tizenhelper",
      "acct": "tizenhelper@quitter.is"
    }
  ],
  "tags": [
    {
      "name": "mastodonlite",
      "url": "https://mastodon.social/tags/mastodonlite"
    },
    {
      "name": "mastodon",
      "url": "https://mastodon.social/tags/mastodon"
    },
    {
      "name": "constrainteddevices",
      "url": "https://mastodon.social/tags/constrainteddevices"
    },
    {
      "name": "iotjs",
      "url": "https://mastodon.social/tags/iotjs"
    }
  ],
  "emojis": []
}
```


#### INTEGRATE ####

Module is in NPM repo, so it can be added using npm tool:

```
ls package.json || npm init
npm install mastodon-lite
cp -a node_modules/mastodon-lite/main.js .
IOTJS_EXTRA_MODULE_PATH=./node_modules/ iotjs ./main.js
```


### USING IOTJS: ###

It's very similar to nodejs, just the PATH environment variable is changed:

```
iotjs main.js
```

Code can be imported using node npm package manager tool:

```
ls package.json || npm init
npm install mastodon-lite
cp -a node_modules/mastodon-lite/main.js .
IOTJS_EXTRA_MODULE_PATH=./node_modules/ iotjs ./main.js
```

Alternatively gitmodule can be used to track master branch.


## RESOURCES: ##

* https://github.com/rzr/mastodon-lite
* https://www.npmjs.com/package/mastodon-lite
* http://iotjs.net
* https://w3c.github.io/activitypub/


## LICENSE: ##

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frzr%2Fmastodon-lite.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Frzr%2Fmastodon-lite?ref=badge_large)
