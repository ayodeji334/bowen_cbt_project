import React from 'react'

function QuestionsButtons({ questions, onQuestionSelected}) {
    return (
        <div className="bg-white my-7 border-2 shadow-md rounded-md w-full px-4 py-6">
            <h1 className="font-bold text-xl">Quiz Navigation</h1>
            <div className="flex flex-wrap gap-4 pt-6">
                {
                    questions.map((question, index) => (
                        <button
                            onClick={() => onQuestionSelected(index)}
                            key={index}
                            className={
                                question.selectedOption ?
                                    "focus:outline-none hover:bg-blue-700 hover:text-white rounded-md w-10 h-10 border-2 text-center bg-gray-300"
                                    :
                                    "focus:outline-none hover:bg-blue-700 hover:text-white rounded-md w-10 h-10 border-2 text-center bg-white"
                            }>{index + 1}</button>
                    ))
                }
            </div>
        </div>
    )
}

export default QuestionsButtons
