/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
const [main, ssrServerConfig, renderer] = require('pwa-kit-dev/configs/webpack/config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const isDevMode = process.env.NODE_ENV !== 'production'

const APP_ROOT = './react-app/app'
const CSS_DEST_FILENAME = '[name].css'
const CSS_SRC = APP_ROOT + '/**/*'
const STATIC_APP_ROOT = './react-app/static/rituals'
const FONTS_FOLDER = STATIC_APP_ROOT + './fonts/'
const IMAGES_FOLDER = STATIC_APP_ROOT + '/img/'

const loaderConfig = [
    {
        test: /\.(sa|sc|c)ss$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    sourceMap: isDevMode,
                    importLoaders: 1
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: isDevMode
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: isDevMode
                }
            }
        ]
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: FONTS_FOLDER
                }
            }
        ]
    },
    {
        test: /\.(png|jpe?g|gif)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: IMAGES_FOLDER
                }
            }
        ]
    }
]

const pluginConfig = [
    new StyleLintPlugin({
        configFile: '.stylelintrc.json',
        files: CSS_SRC
    }),
    new MiniCssExtractPlugin({
        filename: CSS_DEST_FILENAME
    })
]

main.module.rules.push(...loaderConfig)
main.plugins.push(...pluginConfig)

ssrServerConfig.module.rules.push(...loaderConfig)
ssrServerConfig.plugins.push(...pluginConfig)

renderer.module.rules.push(...loaderConfig)
renderer.plugins.push(...pluginConfig)

module.exports = [main, ssrServerConfig, renderer]
