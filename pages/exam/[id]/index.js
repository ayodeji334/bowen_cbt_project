import { useRouter } from "next/router"
import React from 'react'
import Navbar from "../../../components/navbar"
import Header from '../../../components/header'
import verifyToken from "../../api/v1/auth/verifytoken"
import AlertContainer from '../../../components/alert'
import { FaTimes } from 'react-icons/fa'
import axios from "axios"

export default function Exam({ user }) {
    const [loading, setLoading] = React.useState(true);
    const [course, setCourse] = React.useState({});
    const [isAlertOpen, setIsAlertOpen] = React.useState(false);
    const router = useRouter();
    const { id } = router.query;
    const course_id = parseInt(id);

    React.useEffect(() => {
        let subscribe = true;

        const getCourses = async () => {
            await axios.get(`/api/v1/courses/${course_id}`).then(res => {

                if (subscribe) {
                    setCourse(res.data.result[0]);
                    setLoading(false);
                }   

            }).catch(err => {
                console.log(err);
                setLoading(false);
                // alert(err.response.data);
            })
        }

        getCourses();

        return () => subscribe = false;
        
    }, [course]);

    const handleStartExam = () => {
        setIsAlertOpen(false);
        router.push(`/exam/${course_id}/quiz-view`);
    };
    
    return (
        <div className="w-full bg-gray-200">
            <Header title="Exam Instructions" />
            <Navbar username={user.name} />
            <div className="container mx-auto pt-24">
                <div className="w-7/12 mx-auto mt-6 py-9">
                    {
                        loading ? (
                            <div className="bg-white my-7 border-2 shadow-md rounded-md w-full p-4">
                                <p className="text-base p">Please wait...</p>
                            </div>
                        ) : (
                            <>
                                <div className="bg-white border-2 shadow-md rounded-md w-full p-8">
                                    <h1 className="font-extrabold text-xl">Hello, <span className="capitalize">{user.name}</span></h1>
                                    <p className="text-base pt-5">
                                        Please make sure you go through the instructions on this page before proceeding. It is your
                                        responsibility to comply with this regulation.
                                    </p>
                                </div>
                                <div className="bg-white my-7 border-2 shadow-md rounded-md w-full p-8">
                                    <h1 className="font-extrabold text-lg">Course Title</h1>
                                    <p className="text-base pt-5">
                                        {course.title} {`(${course.course_code})`}
                                    </p>
                                </div>
                                <div className="bg-white my-7 border-2 shadow-md rounded-md w-full p-8">
                                    <h1 className="font-extrabold text-lg">Duration</h1>
                                    <p className="text-base pt-5">
                                        {course.duration} minutes
                                    </p>
                                </div>
                                <div className="bg-white my-7 border-2 shadow-md rounded-md w-full p-8">
                                    <h1 className="font-extrabold text-lg">Questions</h1>
                                    <p className="text-base pt-5">
                                        {course.number_of_questions} questions.
                                    </p>
                                </div>
                                <div className="bg-white my-7 border-2 shadow-md rounded-md w-full p-8">
                                    <h1 className="font-extrabold text-lg">Instructions</h1>
                                    <ol className="list-decimal px-0 py-4 ml-4">
                                        <li className="text-base">
                                            Each question has between 2 and 4 options; one or more may be correct.
                                        </li>
                                        <li className="text-base">
                                            There is no penalty for guessing if you don't know the answer; 
                                            therefore, make sure you attempt all of the questions
                                        .</li>
                                        <li className="text-base">
                                            This test is best viewed using Internet Explorer version 11.0 or higher 
                                            or Mozilla Firefox 45.0 or higher or Google Chrome 48 or higher.
                                        </li>
                                        <li className="text-base">
                                            Questions will be displayed one at a time.
                                            A next and previous button is provided at the bottom of the test page
                                            for navigating to the next and previous question
                                        </li>
                                        <li className="text-base">
                                            Do not use the shortcut menu options (mouse right-click) or the keyboard for
                                            navigating backwards or forwards within the test.
                                        </li>
                                    </ol>
                                </div>
                                <div className="w-full text-center my-7 p-8 flex flex-row justify-center items-center">
                                    <button
                                        type="button"
                                        onClick={() => setIsAlertOpen(true)}
                                        className="focus:ring-blue-900 mt-3 shadow-lg rounded-full bg-blue-900 hover:bg-blue-700 text-base
                                        text-white font-medium py-4 px-5 focus:outline-none">
                                        Start Attempt
                                    </button>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
                {
                    isAlertOpen &&
                        (
                            <AlertContainer>
                                <div className="w-full">
                                    <div className="flex justify-between items-center">
                                        <h1 className="font-bold text-base text-left py-3">Start Attempt</h1>
                                        <button
                                            onClick={() => setIsAlertOpen(false)}
                                            className="focus:outline-none bg-gray-100 hover:bg-gray-300 text-black p-2 rounded-lg">
                                            <FaTimes />
                                        </button>
                                    </div>
                                    <p className="font-medium text-base text-left py-3">Are you sure you want to start the attempt?</p>
                                    <div className="flex justify-end items-center pt-5">
                                            <button
                                                onClick={() => setIsAlertOpen(false)}
                                                className="focus:outline-none rounded-full text-black mr-3
                                                text-sm font-semibold bg-gray-300 px-4 py-3"
                                            >
                                                Cancel
                                            </button>
                                        <button
                                            onClick={handleStartExam}
                                            className="rounded-full focus:outline-none text-white text-sm font-semibold bg-blue-800 px-4 py-3"
                                        >
                                            Start Attempt
                                        </button>
                                    </div>
                                </div>
                            </AlertContainer>
                        )
                }
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const resp = verifyToken(ctx);
    
    if (ctx.req && resp.status === 401 || resp.status === 400) {
        ctx.res.writeHead(302, {
            Location: "/"
        });

        ctx.res.end();

        return { props: {} };
    }

    return {
        props: {
            user: resp.current_user
        }
    }
}