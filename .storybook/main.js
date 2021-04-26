const path = require('path')

const resolve = (p) => path.join(process.cwd(), p)

module.exports = {
    webpackFinal(config) {
        config.resolve.alias = {
            ...config.resolve.alias,
            // https://github.com/system-ui/theme-ui/issues/354#issuecomment-805161307
            '@emotion/styled': resolve('node_modules/@emotion/styled'),
        }
        return config
    },
    stories: [
        '../stories/**/*.stories.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: ['@storybook/addon-knobs', '@storybook/addon-actions'],
}
