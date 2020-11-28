'use strict';
//所有的配置项可参考 https://cli.vuejs.org/zh/config/
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: true,
    devServer: {
        port: 4444,
        open: true,
        overlay: {
            warnings: false,
            errors: true,
        },
    },
    configureWebpack: (config) => {
        config.name = 'three3d';
        config.resolve.alias['@'] = resolve('src');
    },
};
