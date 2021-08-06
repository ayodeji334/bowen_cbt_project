import dbConnect from "../../../../util/sqldb";
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(req, res) {
    if (req.method === "POST") {

        const { matricNumber, firstName, surname, email, college, dept } = req.body;

        if (!matricNumber || !firstName || !surname || !email || !college || !dept ) {
            return res.status(400).json({
                message: "Forbidden",
                status: 400
            });
           
        }

        let sql = 'select * from students WHERE matric_number = ?';

        dbConnect.query(sql, matricNumber.toLowerCase(), (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server error",
                    status: 500
                });
            }
            
            if (result.length > 0) {
                return res.status(401).json({
                    message: "The matric number already exist",
                    status: 401,
                });
            };

            const user = {
                matric_number: matricNumber.toLowerCase(),
                firstname:  firstName.toLowerCase(),
                surname: surname.toLowerCase(),
                email: email.toLowerCase(),
                password: firstName.toLowerCase(),
                college,
                department: dept
            };

            sql = "INSERT INTO students SET ?";

            dbConnect.query(sql, user, (err) => {
                if(err){
                    return res.status(500).json({
                        message: "Internal Server Error",
                        status: 500
                    });
                }

                //Create token
                const token = jwt.sign({
                    name: `${user.firstname} ${user.surname}`,
                    matric_number: user.matric_number
                }, process.env.SECRET, {
                    expiresIn: "1h",
                });

                //Set the cookie
                const cookieOptions = {
                    expires: 60 * 60,
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    sameSite: 'strict',
                    maxAge: Math.floor(Date.now() / 1000) - 30,
                    path: '/'
                };

                //Set the cookie response header
                res.setHeader('Set-Cookie', cookie.serialize('session', token, cookieOptions));

                //Set the response
                return res.status(200).send("Account created successfully");
            });
        });
    } else {
        return res.status(404).json({ 
            message: 'The request method is not allowed' 
        });
    }
}

export const config = {
    api:{
        externalResolver: true,
    },
}