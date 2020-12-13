const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USER_DB,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.DATABASE,
})

module.exports = pool;