module.exports = {
    apps: [{
        name: 'markdown-app',
        script: "build/index.js",
        env: {
            "ORIGIN": "http://3.145.180.51/",
            "NODE_ENV": "production",
        }
    }]
}