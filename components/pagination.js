import React from 'react'

function QuestionsButtons({ questions, onQuestionSelected}) {
    return (
        <div className="bg-white my-7 border-2 shadow-md rounded-md w-full px-5 py-7">
            <h1 className="font-extrabold text-2xl">Quiz Navigation</h1>
            <div className="my-2 w-full py-3">
                {
                    questions.map((question, index) => (
                        <button
                            onClick={() => onQuestionSelected(index)}
                            key={index}
                            className={
                                question.selectedOption ?
                                    "focus:outline-none hover:bg-blue-700 hover:text-white rounded-md w-12 h-12 border-2 text-center bg-gray-300 m-2"
                                    :
                                    "focus:outline-none hover:bg-blue-700 hover:text-white rounded-md w-12 h-12 border-2 text-center bg-white m-2"
                            }>{index + 1}</button>
                    ))
                }
            </div>
        </div>
    )
}

export default QuestionsButtons
