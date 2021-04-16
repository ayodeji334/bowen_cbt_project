import mysql from 'mysql'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

const dbConnect = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER ,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

dbConnect.connect(err => {
    if (err) {
        throw err;
    } else {
        console.log("Db connected!")
    }
});

export default async function Login(req, res) {
    if (req.method === "POST") {
        const { matric_number, password } = req.body;
        if (!matric_number || !password) {
            res.status(400).json({
                message: "Forbidden",
                status: 400
            });
            res.end();
        } else {
            let sql = 'select * from bowen_students WHERE matric_number = ?';
            dbConnect.query(sql, matric_number, (err, result) => {
                if (err) {
                    res.status(500).json({
                        message: "Server side error"
                    });
                    res.end();
                } else if (result.length === 0) {
                    res.status(401).json({
                        message: "The credentail doesn't match any record",
                        status: 401,
                    });
                    res.end();
                } else {
                    const user = result[0];
                    const token = jwt.sign({
                        id: user.id,
                        name: `${user.firstname} ${user.surname} `,
                        matric_number: user.matric_number
                    }, process.env.SECRET, { 
                        expiresIn: '1h'
                    });

                    const cookieOptions = {
                        expires: new Date(Math.floor(Date.now() / 1000) - 30),
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== "development",
                        sameSite: 'strict',
                        maxAge: 3600,
                        path: '/'
                    };

                    res.setHeader('Set-Cookie', cookie.serialize('auth_cookie',token, cookieOptions));
                    res.status(200).json({
                        message: 'Login Successfully',
                        status: 200,
                    });
                    res.end();
                }
            });
        }
    } else {
        res.status(404).json({ name: 'The request method is not allowed' });
        res.end()
    }
}

export const config = {
    api:{
        externalResolver: true,
    },
}