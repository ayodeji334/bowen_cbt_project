import React from 'react'
import Question from './question'
import { useRouter } from 'next/router'
import QuestionsButtons from './pagination'

function QuestionBox({ shuffleQuestions, time }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);
    const [examQuestions, setExamQuestions] = React.useState([]);
    const [secondsLeft, setSecondsLeft] = React.useState(null);
    const [minutesLeft, setMinutesLeft] = React.useState(null);
    const [hoursLeft, setHoursLeft] = React.useState(null);

    const handleQuestionSelected = React.useCallback((index) => {
        localStorage.setItem('examData', JSON.stringify(examQuestions));
        setCurrentQuestionIndex(index);
    }, []);

    const handleSubmitExam = () => {
        const userExamData = JSON.parse(localStorage.getItem('examData'));
        const totalCorrectAns = _.filter(userExamData, QtnObj => QtnObj.selectedOption === QtnObj.correct_answer);
        const finalScorePercent = (totalCorrectAns.length / userExamData.length) * 100;
    
        if (finalScorePercent > 50) {
            alert(`Congrat!. You passed the exam. You scored ${finalScorePercent}% `);
        } else {
            alert(`Sorry!. You failed the exam. You scored ${finalScorePercent}% `);
        }
        localStorage.removeItem('examData');
        router.push('/exam');
    }

    const goToNextQuestion = () => {
        localStorage.setItem('examData', JSON.stringify(examQuestions));
        if (examQuestions.length === currentQuestionIndex + 1) {
            setIsOpen(true);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const goToPrevQuestion = () => {
        localStorage.setItem('examData', JSON.stringify(examQuestions));
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    React.useEffect(() => {
        setLoading(false);
        const userExamData = JSON.parse(localStorage.getItem('examData'));
        if (!userExamData) {
            setExamQuestions(shuffleQuestions.results);
        } else {
            setExamQuestions([...userExamData]);
        }
    }, []);

    React.useEffect(() => {
        const setTimeInterval = () => {
            const currentTime = new Date().getTime();
            const startTime = new Date(JSON.parse(time)).getTime();
            const stopTime = new Date(startTime + 10 * 60000).getTime();
            const remTime = stopTime - currentTime;
            const hours = Math.floor((remTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const seconds = Math.floor((remTime % (1000 * 60) / 1000));
            const minutes = Math.floor((remTime % (1000 * 60 * 60)) / (1000 * 60));

            if (currentTime > stopTime){
                clearInterval(timeInterval);
                handleSubmitExam();
            } else {
                setMinutesLeft(minutes);
                setSecondsLeft(seconds);
                setHoursLeft(hours);
            }
        };
        const timeInterval = setInterval(setTimeInterval, 1000);
        return () => clearInterval(timeInterval);
    }, []);

    return loading ? (
            <div className="my-5 mx-3"><h1 className="font-extrabold text-3xl">Please..</h1></div>
        )
        :
        (
            <div className="w-full h-full">
                <div className="w-full flex flex-row">
                    <div className="w-8/12">
                        <div className="mr-10">
                            <Question
                                currentQuestion={examQuestions[currentQuestionIndex]}
                                currentQuestionIndex={currentQuestionIndex} />
                            <div className="py- w-full flex flex-row justify-between items-center">
                                <button
                                    onClick={goToPrevQuestion}
                                    disabled={currentQuestionIndex === 0 }
                                    className={
                                        currentQuestionIndex === 0 ? `opacity-30 cursor-not-allowed focus:outline-none rounded-md py-4 px-5 bg-blue-900 text-white` :
                                            `focus:outline-none rounded-md py-4 px-5 bg-blue-900 text-white`
                                    }>
                                    Previous
                                </button>
                                <div className="py-3">
                                    <h2 className={minutesLeft < 1 ? "text-red-500 text-2xl font-bold" :"text-blue-700 text-2xl font-bold"}>
                                        {`${hoursLeft}:${minutesLeft}:${secondsLeft}`}
                                    </h2>
                                </div>
                                <button
                                    onClick={goToNextQuestion}
                                    className="focus:outline-none rounded-md py-4 px-5 bg-blue-900 text-white">
                                        {currentQuestionIndex + 1 === examQuestions.length ? 'Finish attempt' : "Next"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-4/12">
                        <div className="ml-4">
                            <QuestionsButtons questions={examQuestions} onQuestionSelected={handleQuestionSelected} />
                        </div>
                    </div>
                </div>
                    
                <AlertContainer>
                    
                </AlertContainer>
            </div>
        )
}

export default QuestionBox;


