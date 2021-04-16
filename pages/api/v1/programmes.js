import mysql from 'mysql'

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

export default async function getAllCollegeDept(req, res) {
    if (req.method === "POST") {
        const { college_id } = req.body;
        if (!college_id) {
            res.status(400).json({
                message: "Forbidden",
                status: 400
            });
            res.end();
        } else {
            let sql = 'SELECT * From programmes WHERE college_id = ?';
            dbConnect.query(sql, college_id, (err, result) => {
                if (err) {
                    res.status(500).json({
                        message: "Server side error"
                    });
                    res.end();
                } else{
                    res.status(200).json({
                        message: "The depts data get successfully",
                        result,
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