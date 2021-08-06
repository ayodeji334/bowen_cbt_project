import _ from "lodash";
import dbConnect from "../../../../util/sqldb";

export default async function handler(req, res) {
    const { id } = req.query;
    
    if (req.method === "GET") {
        let sql = "SELECT * FROM courses WHERE id = ?";

        dbConnect.query(sql, parseInt(id) , (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Server side error"
                });
                
            };
            
            if (result.length === 0) {
                return res.status(401).json({
                    message: "No questions found",
                    status: 401,
                });
            }; 

            return res.status(200).json({
                result,
                status: 200
            });
        });
        
    } else {
        return res.status(403).json({ 
            message: 'The request method is not allowed' 
        });
    }
}

export const config = {
    api:{
        externalResolver: true,
    },
}