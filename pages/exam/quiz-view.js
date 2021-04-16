import React from 'react'
import Navbar from "../../components/navbar"
import Header from '../../components/header'
import QuestionBox from '../../components/questionbox'
import verifyToken from "../api/v1/auth/verifytoken"

export default function QuizView({ questions, data, startTime }) {
    return (
        <div className="w-full h-full bg-white">
            <Header title="CSE401 Exam Dashboard" />
            <Navbar username={data.name} />
            <div className="w-11/12 mx-auto h-full pt-24 relative">
                <div className="fixed py-3 w-full">
                    <h2 className="font-bold text-lg px-9">User Interface Design (CSE 401)</h2>
                </div>
                <div className="px-9 pt-10">
                    <QuestionBox shuffleQuestions={questions} time={startTime} />
                </div>
            </div>
        </div>
    );
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

    const res = await fetch('https://opentdb.com/api.php?amount=50&category=18');
    const questions = await res.json();
    const startTime = JSON.stringify(new Date());

    return {
        props: {
            data: resp.current_user,
            startTime,
            questions
        }
    }
}
