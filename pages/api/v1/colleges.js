import dbConnect from "../../../util/mongodb"
import College from "../../../models/College";

export default async function handler(req, res) {
    await dbConnect();

    // if (req.method === "POST") {
    //     if (!college_id) {

    //         return res.status(400).json({
    //             message: "Forbidden",
    //             status: 400
    //         });
    //     } 
    // }

    if(req.method === "GET"){
        College.find().exec(function(err, result){
            if(err){
                return res.json({
                    message: "colleges fetch successfully",
                    data: result,
                    success: true,
                    status: 200
                })
            }
        });
    }

    if(req.method !== "GET" && req.method !== "POST"){
        return res.status(400).json({
            message: "Forbidden!",
            status: 400,
            success: false
        });
    }
}

export const config = {
    api:{
        externalResolver: true,
    },
}