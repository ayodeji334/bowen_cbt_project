import cookie from "cookie";

export default async function handler(req, res) {
    if (req.method === "POST") {
        //Set the cookie option
        const cookieOptions = {
            expires: new Date(),
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: 'strict',
            maxAge: -1,
            path: '/'
        };

        // return res.clearCookie("auth_cookie");
        res.setHeader("Set-Cookie", cookie.serialize('session', "deleted", cookieOptions));
        res.send({});
        
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