import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export default function verifyToken(context) {
    const { cookie:session_cookie } = context.req.headers;

    if (!session_cookie) {
        return { status: 401, message: "Unauthorized" }
    }

    if (session_cookie) {
        const token = cookie.parse(session_cookie).session;

        if(!token){
            return { status: 401, message: "Unauthorized" }
        }

        return jwt.verify(token, process.env.SECRET, (err, user) => {

            if (err) {
                return { 
                    message: 'Invalid token',
                    status: 400
                };

            } else {
                return { 
                    current_user: user, 
                    status: 200 
                };
            }
        });
    }
}