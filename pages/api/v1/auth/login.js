import dbConnect from "../../../../util/sqldb";
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    const { matric_number, password } = req.body;

    if (req.method === "POST") {
        if (!matric_number || !password) {
            return res.status(400).json({
                message: "Forbidden",
                status: 400
            });

        };

        let sql = "SELECT * FROM students WHERE matric_number = ?"

        dbConnect.query(sql, matric_number, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Server side error"
                });
                
            };
            
            if (result.length === 0) {
                return res.status(401).json({
                    message: "Invalid credentials",
                    status: 401,
                });
            }; 

            const user = result[0];

            if(user.password !== password.toLowerCase()){
                return res.status(401).json({
                    message: "Invalid credentials",
                    status: 401,
                });
            };

            const token = jwt.sign({
                name: `${user.firstname} ${user.surname} `,
                matric_number: user.matric_number
            }, process.env.SECRET, { 
                expiresIn: '1h'
            });

            //Set the cookie
            const cookieOptions = {
                expires: new Date(Math.floor(Date.now() / 1000) - 30),
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: 'strict',
                maxAge: Math.floor(Date.now() / 1000) - 30,
                path: '/'
            };

            res.setHeader('Set-Cookie', cookie.serialize('session', token, cookieOptions));

            //Set the response
            return res.status(200).send("loign successfully");
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