const express = require('express');

const PORT = process.env.PORT || 8080;

const appleAccordingToDocs = {
    "applinks": {
        "details": [
            {
                "appIDs": ["YAP562AABL.com.fixzy.agent.app", "YAP562AABL.com.fixzy.consumer.app"],
                "components": [
                    {
                        "/": "job/media/*",
                        "comment": "Matches any URL whose path starts with /job/media"
                    },
                    {
                        "/": "call/*",
                        "comment": "Matches any URL whose path starts with /call"
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

const google = [
    {
        "relation": ["delegate_permission/common.handle_all_urls"],
        "target": {
            "namespace": "android_app",
            "package_name": "com.fixzy.agent.app",
            "sha256_cert_fingerprints":
                ["3D:8E:2F:C4:07:F5:9D:FB:7B:BA:57:21:5A:54:B8:3E:4A:19:38:CA:86:DB:FC:36:C1:61:CD:42:2E:FB:2B:D3"]
        }
    }, {
        "relation": ["delegate_permission/common.handle_all_urls"],
        "target": {
            "namespace": "android_app",
            "package_name": "com.fixzy.consumer.app",
            "sha256_cert_fingerprints":
                ["AA:77:73:7A:B7:B1:75:99:60:FB:64:38:FF:FF:2A:BB:2F:A3:2E:5C:3B:09:71:2C:BA:0D:9D:04:EF:C4:81:68"]
        }
    }
]

const page = `
<p>Hello from test server!</p>
<br/>
<a href='/.well-known/apple-app-site-association'>Link to apple well-known links</a>
<br/>
<a href='/.well-known/assetlinks.json'>Link to google well-known links</a>
`

const app = express();
app.get('/.well-known/apple-app-site-association', (req, res) => {
    res.json(appleAccordingToDocs)
})

app.get('/.well-known/assetlinks.json', (req, res) => {
    res.json(google)
})

app.get('/', (_, res) => res.send(page))

app.listen(PORT, () =>
    console.log(`Running on http://localhost:${PORT}`)
);

