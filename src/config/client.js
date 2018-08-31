const isProd = ("production" === process.env.NODE_ENV);

let configDev = {
  api: {
    protocol: 'http',
    host: 'localhost',
    port: 5000,
    prefix: 'api'
  },
};
let configProd = {
    api: {
        protocol: 'https',
        host: '...heroku',
        port: 80,
        prefix: 'api'
    },
};

let config;
if (isProd) {
    console.log("Using production settings");
    config = configDev;
} else {
    console.log("Using development settings");
    config = configDev;
}

config.endpoint = config.api.protocol + '://' +
  config.api.host + ':' +
  config.api.port + '/' +
  config.api.prefix + '/';

module.exports = config;