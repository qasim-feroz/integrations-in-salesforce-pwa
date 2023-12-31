/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
const config = require('pwa-kit-dev/configs/babel/babel-config')

if (config && config.default && config.default.plugins) {
    config.default.plugins.push(
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                root: ['./app'],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.svg', '.png'],
                alias: {
                    App: './app',
                    Config: './config',
                    Core: './pwa-custom-core'
                }
            }])
}

module.exports = config
