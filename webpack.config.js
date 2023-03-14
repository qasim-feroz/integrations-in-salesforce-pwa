const config = require('pwa-kit-dev/configs/webpack/config')
const DOTENV = require('dotenv-webpack')

const production = 'production'
const development = 'development'
const mode = process.env.NODE_INSTANCE === production ? production : development

config.forEach((c) => {
    c.module.rules.push({
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader']
    })
    c.plugins.push(
        new DOTENV({
            path: mode === production ? './.env.production' : './.env.development',
            systemvars: true
        })
    )
})

module.exports = config
