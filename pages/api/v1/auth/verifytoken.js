import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export default function verifyToken(context) {
    const cookies = cookie.parse(context.req.headers.cookie);
    const token = cookies.auth_cookie;

    if (!token) {
        return { status: 401, message: "Unauthorized" }
    }
    if (token) {
        return jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return { message: 'Invalid token', status: 400 }
            } else {
                return { current_user: user, status: 200 };
            }
        });
    }
}