module.exports = {
    app_port: process.env.APP_PORT || 3000,
    client_url: process.env.CLIENT_URL || 'http://127.0.0.1:5500',

    db_host: process.env.DB_HOST || 'localhost',
    db_port: process.env.DB_PORT || 3306,
    db_username: process.env.DB_USER || 'root',
    db_password: process.env.DB_PASS || '',
    db_name: process.env.DB_NAME || 'unicode',

    jwt_secret: process.env.JWT_SECRET || '',
}