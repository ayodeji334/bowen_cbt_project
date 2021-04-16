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

export default async function CreateUser(req, res) {
    if (req.method === "POST") {
        const { matric_number,firstname, surname , college, dept } = req.body;
        if (!matric_number || !firstname || !surname || !college || !dept ) {
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
                } else if (result.length > 0) {
                    res.status(401).json({
                        message: "The matric number already exist",
                        status: 401,
                    });
                    res.end();
                } else {
                    const user = req.body;
                    let sql = 'INSERT INTO bowen_students SET ?';
                    dbConnect.query(sql, user, (err, result) => {
                        if (err) {
                            console.log(err);
                            res.json({
                                status: 500,
                                message: "Server error",
                            });
                            res.end();
                        } else {
                            const token = jwt.sign({
                                id: user.id,
                                name: `${user.firstname} ${user.surname} `,
                                matric_number: user.matric_number
                            }, process.env.SECRET, {
                                expiresIn: Math.floor(Date.now() / 1000) - 30,
                            });

                            const cookieOptions = {
                                expires: new Date(Math.floor(Date.now() / 1000) - 30),
                                httpOnly: true,
                                secure: process.env.NODE_ENV !== "development",
                                sameSite: 'strict',
                                maxAge: Math.floor(Date.now() / 1000) - 30,
                                path: '/'
                            };

                            res.setHeader('Set-Cookie', cookie.serialize('auth_cookie',token, cookieOptions));
                            res.status(200).json({
                                message: 'User created Successfully',
                                status: 200,
                                token
                            });

                            res.end();
                        }
                    });
                }
            });
        }
    } else {
        res.status(404).json({ message: 'The request method is not allowed' });
        res.end()
    }
}

export const config = {
    api:{
        externalResolver: true,
    },
}