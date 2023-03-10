const config = require('pwa-kit-dev/configs/webpack/config')
config.forEach((c) => {
    c.module.rules.push({
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader']
    })
})

module.exports = config
