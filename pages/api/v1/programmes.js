import dbConnect  from "../../../util/sqldb";

export default async function handler(req, res) {

    if (req.method === "POST") {
        const { college_id:id } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "Forbidden",
                status: 400
            });

        }

        let sql = 'SELECT * From programmes WHERE college_id = ?';

        dbConnect.query(sql, id, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal Server Error"
                });
                
            } else{
                return res.status(200).json({
                    result,
                    success: true
                });

            }
        });

    } else {
        return res.status(404).json({ 
            name: 'The request method is not allowed' 
        });
    }
}

export const config = {
    api:{
        externalResolver: true,
    }
}