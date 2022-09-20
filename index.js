const express = require('express');

const PORT = process.env.PORT || 8080;

const appleAccordingToDocs = {
    "applinks": {
        "details": [
            {
                "appIDs": ["YAP562AABL.com.fixzy.agent.app"],
                "components": [
                    {
                        "/": "*",
                        "comment": "Matches any URL whose path starts with /job/media"
                    }
                ]
            }
        ]

    }
}

const apple = {
    "activitycontinuation": {
        "apps": [
            "YAP562AABL.com.fixzy.agent.app"
        ]
    },
    "applinks": {
        "apps": [],
        "details": [
            {
                "appIDs": ["YAP562AABL.com.fixzy.agent.app"],
                "components": [
                    {
                        "/": "/buy/*",
                        "comment": "Matches any URL whose path starts with /buy/"
                    },
                    {
                        "/": "*",
                        "comment": "Matches any URL "
                    }
                ]
            },
            {
                "appID": "YAP562AABL.com.fixzy.agent.app",
                "paths": ["/buy/*", "*",]
            }
        ]
    }
}

const google = [{
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
        "namespace": "android_app",
        "package_name": "com.fixzy.agent.app",
        "sha256_cert_fingerprints":
            ["44:E0:93:C3:3B:72:DD:1A:A5:09:2F:B8:D4:06:E9:C4:38:43:7E:88:6F:66:2A:8E:EC:9B:ED:4F:E9:41:1D:38"]
    }
}]

const page = `
<p>Hello from test server!</p>
<br/>
<a href='/.well-known/apple-app-site-association'>Link to apple well-known links</a>
<br/>
<a href='/.well-known/assetlinks.json'>Link to google well-known links</a>
`

const app = express();
app.get('/.well-known/apple-app-site-association', (req, res) => {
    res.json(apple)
})

app.get('/.well-known/assetlinks.json', (req, res) => {
    res.json(google)
})

app.get('/', (_, res) => res.send(page))

app.listen(PORT, () =>
    console.log(`Running on http://localhost:${PORT}`)
);

