"use strict"

process.env.Babel_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';


process.on('unhandledRejection',err => {
    throw err;

});

require('../env');

const jest = require('jest');
const argv = process.argv.slice(2);

if (!process.env.CI && argv.indexOf('--coverage') < 0) {
    argv.push('--watch');

}

jest.run(argv);