import mysql from "mysql2";
import dotenv from 'dotenv';
dotenv.config();

const db_host = String(process.env.DB_HOST);
const db_user = String(process.env.DB_USER);
const db_password = String(process.env.DB_PASSWORD);
const db_name = String(process.env.DB_NAME);

export async function dbConnection() {
    const db = mysql.createConnection({
        host: db_host,
        user: db_user,
        password: db_password,
        database: db_name
    });

    return db;
}