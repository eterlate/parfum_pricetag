const config = require('config')
const mssql = require('mssql')

const database_config = config.get('database')

const sqlConfig = {
    user: database_config.DB_USER,
    password: database_config.DB_PASSWORD,
    database: database_config.DB_NAME,
    server: database_config.DB_HOST,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, 
        trustServerCertificate: false
    }
}

async function sendQuery(query) {
    try{
        await mssql.connect(sqlConfig)
        result = await mssql.query(query)
        await mssql.close(sqlConfig)
        return result
    } catch(e){
        throw e
    }
}

module.exports = {sendQuery}