const libServer = require('./build/lib-server.config');
const libWeb = require('./build/lib-web.config');
const shellServer = require('./build/shell-server.config');
const shellWeb = require('./build/shell-web.config');

module.exports = [
    libServer,
    libWeb,
    shellServer,
    shellWeb
];
