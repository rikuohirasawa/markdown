require('dotenv').config();

module.exports = {
    apps: [{
        name: 'markdown-app',
        script: "build/index.js",
        env: {
            "ORIGIN": process.env.DOMAIN_NAME,
        },
    }]
}