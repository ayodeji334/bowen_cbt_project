import { useRouter } from "next/router"
import React from 'react'
import Navbar from "../../../components/navbar"
import Header from '../../../components/header'
import verifyToken from "../../api/v1/auth/verifytoken"

export default function ExamInstructions({ data }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const router = useRouter();

    const handleStartExam = () => {
        router.push('/exam/exam-dashboard');
    };
    
    return (
        <div className="w-full bg-gray-200">
            <Header title="Exam Instructions" />
            <Navbar username="Odunayo Fawumi"/>
            <div className="container mx-auto pt-24">
                <div className="w-7/12 mx-auto mt-6 py-9">
                    <div className="bg-white border-2 shadow-md rounded-md w-full p-8">
                        <h1 className="font-extrabold text-2xl">Hello, Odunayo Fawumi</h1>
                        <p className="text-base pt-5">
                            Please make sure you go through the instructions on this page before proceeding. It is your
                            responsibility to comply with this regulation. Unannotated materials must not contain highlighting,
                            underlining, tabs or notes. <br />
                            Mobile phones, smart watches and any other electronic devices (excluding calculators where permitted in
                            your exam) are banned in this center. If you are cut to be in possession of a mobile phone or smart device, including smart watches, will have a case of
                            formal academic misconduct reported.
                        </p>
                    </div>
                    <div className="bg-white my-7 border-2 shadow-md rounded-md w-full p-8">
                        <h1 className="font-extrabold text-lg">Course Title</h1>
                        <p className="text-base pt-5">
                        User Interface Design (CSE 401)
                        </p>
                    </div>
                    <div className="bg-white my-7 border-2 shadow-md rounded-md w-full p-8">
                        <h1 className="font-extrabold text-lg">Duration</h1>
                        <p className="text-base pt-5">
                            50 minutes
                        </p>
                    </div>
                    <div className="bg-white my-7 border-2 shadow-md rounded-md w-full p-8">
                        <h1 className="font-extrabold text-lg">Questions</h1>
                        <p className="text-base pt-5">
                        40 multiple choice questions.
                        </p>
                    </div>
                    <div className="bg-white my-7 border-2 shadow-md rounded-md w-full p-8">
                        <h1 className="font-extrabold text-lg">Instructions</h1>
                        <ol className="list-decimal px-0 py-4 ml-4">
                            <li className="text-base">Each question has between 2 and 8 options; one or more may be correct.</li>
                            <li className="text-base">There is no penalty for guessing if you don't know the answer; therefore, make sure you attempt all of the questions.</li>
                            <li className="text-base">In order to pass, you will need to answer at least 60% of the questions correctly.</li>
                            <li className="text-base">The clock timing of your test is located at the top of the test window.</li>
                            <li className="text-base">This test is best viewed using Internet Explorer version 11.0 or higher or Mozilla Firefox 45.0 or higher or Google Chrome 48 or higher.</li>
                            <li className="text-base">Questions will be displayed one at a time. A next button is provided at the bottom of the test page for navigating to the next question. Do not press the next button if you have not answered the question.</li>
                            <li className="text-base">Once you have answered a question, you cannot go back and change your answer.</li>
                            <li className="text-base">Do not use the shortcut menu options (mouse right-click) or the keyboard for navigating backwards or forwards within the test.</li>
                            <li className="text-base">There is a 1 day waiting period between test retakes. You can only take a test twice in a three months time window.</li>
                        </ol>
                    </div>
                    <div className="w-full text-center my-7 p-8 flex flex-row justify-center items-center">
                        <button className="focus:ring-blue-900 mt-3 shadow-lg rounded-full bg-blue-900 hover:bg-blue-700 text-case
                     text-white font-semibold p-5 focus:outline-none">
                            Start Attempt
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const resp = verifyToken(ctx);

    if (!ctx.req && resp.status === 401 || resp.status === 400) {
        Router.replace('/');
        return {
            props: {}
        };
    }
    
    if (ctx.req && resp.status === 401 || resp.status === 400) {
        ctx.res.writeHead(302, {
            Location: process.env.NEXTAUTH_URL
        });
        ctx.res.end();
        return { props: {} };
    }

    return {
        props: {
            data: resp.current_user
        }
    }
}