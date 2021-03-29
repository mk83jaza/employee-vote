const env = process.env;

const config = {
    db: {
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        timezone: env.DB_TIME_ZONE
    },
    dbName: env.DB_NAME
};

module.exports = config;
