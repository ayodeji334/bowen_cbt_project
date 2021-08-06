import _ from "lodash";
import dbConnect from "../../../../util/sqldb";

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === "GET") {
        if (!id) {
            return res.status(400).json({
                message: "Forbidden",
                status: 400
            });
        };

        let exam_detail = {};

        //Get course detail from db
        let sql = "SELECT * FROM courses WHERE id = ?";

        dbConnect.query(sql, parseInt(id), (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Server side error"
                });
                
            };

            exam_detail.course_detail = result[0];

            if (!_.isEmpty(exam_detail)) {
                sql = `SELECT * FROM questions WHERE course_id = ${exam_detail.course_detail.id} ORDER BY 
                RAND() LIMIT ${exam_detail.course_detail.number_of_questions}`;

                dbConnect.query(sql, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Internal Server Error"
                        });
                        
                    };
                    
                    if (result.length === 0) {
                        return res.status(401).json({
                            message: "No questions found",
                            status: 401,
                        });
                    }; 

                    const questions = [];

                    result.forEach(questionElm => {
                        const question = {
                            question: questionElm.question,
                            options: [
                                questionElm.option1,
                                questionElm.option2,
                                questionElm.option3,
                                questionElm.answer
                            ],
                            correct_answer: questionElm.answer
                        };

                        question.options = _.shuffle(question.options);

                        questions.push(question);
                    });

                    exam_detail.questions = _.shuffle(questions);

                    return res.status(200).json({
                        exam_detail,
                        status: 200
                    });
                });
            }
        
        })
    
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