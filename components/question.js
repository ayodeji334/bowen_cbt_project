import React from 'react'
import _ from 'lodash';

function Question({ currentQuestion, currentQuestionIndex }) {
    const [selectedAnsIndex, setSelectedAnsIndex] = React.useState(null);
    const [currentQtnOptions, setCurrentQtnOptions] = React.useState([]);

    const handleSelectAnswer = (index, option) => {
        setSelectedAnsIndex(index);
        currentQuestion.selectedOption = option;
    };

    React.useEffect(() => {
       
        setCurrentQtnOptions(currentQuestion.options);

        if (currentQuestion.selectedOption) {
            const selectedOptionIndex = currentQtnOptions.indexOf(currentQuestion.selectedOption);
            setSelectedAnsIndex(selectedOptionIndex);
        } else {
            setSelectedAnsIndex(null);
        }

    }, [currentQuestion]);

    return (
       <div className="bg-white my-7 border-2 shadow-md rounded-xl w-full p-5">
            <h1 className="font-bold text-xl">{`Question ${currentQuestionIndex + 1}`}</h1>
            <p className="font-medium text-sm py-4">
               {currentQuestion.question} 
            </p>
            <div className="my-2 w-full">{
                currentQtnOptions.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelectAnswer(index, option)}
                        className={
                            selectedAnsIndex === index ? `focus:outline-none hover:bg-black hover:text-white
                            rounded-md py-3 text-sm font-medium border-2 px-3 bg-black text-white w-full
                            text-left my-2` : `focus:outline-none hover:bg-blue-700 hover:text-white
                            rounded-md py-3 text-sm font-medium border-2 px-3 bg-white w-full text-left my-2`
                        }>
                        {option}
                    </button>
                ))
            }</div>
        </div>
    )
}

export default Question
