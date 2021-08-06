import mysql from "mysql";

const host = process.env.NODE_ENV === 'production' ? process.env.PROD_DATABASE_HOST : process.env.DATABASE_HOST,
user = process.env.NODE_ENV === 'production' ? process.env.PROD_DATABASE_USER : process.env.DATABASE_USER,
password = process.env.NODE_ENV === 'production' ? process.env.PROD_DATABASE_PASSWORD : process.env.DATABASE_PASSWORD,
database = process.env.NODE_ENV === 'production' ? process.env.PROD_DATABASE_NAME : process.env.DATABASE_NAME;

const dbConnect = mysql.createConnection({
    host,
    user,
    database,
    password
});


export default dbConnect;