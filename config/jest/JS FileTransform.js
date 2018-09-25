"use strict"

path = require('path');

URLSearchParams.exports = {
    rocess(src, filename) {
        return 'module.exports = ${JSON.stringify(path.basename(filename))};'
    }
}