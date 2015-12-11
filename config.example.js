var config = {}

config.systemName = 'Remax (Thailand) API';
config.apiKey = '1234';
config.shopIdTest = '5678';
config.port = 1122;


config.mssql = {
    user: 'abc',
    password: '123',
    server: 'remax.co.th',
    database: 'Remax',
	options: {
        encrypt: true
    }
};

config.crypto = {};
config.crypto.algorithm = 'remax';
config.crypto.password = 'remax';

module.exports = config;