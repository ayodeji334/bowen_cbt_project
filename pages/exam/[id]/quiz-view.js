import React from 'react'
import Navbar from "../../../components/navbar"
import Header from '../../../components/header'
import QuestionBox from '../../../components/questionbox'
import verifyToken from "../../api/v1/auth/verifytoken"
import _ from 'lodash'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function QuizView({ user, startTime }) {
    const [loading, setLoading] = React.useState(true);
    const [examDetail, setExamDetail] = React.useState({});
    const router = useRouter();
    const { id } = router.query;

    React.useEffect(() => {
        let subscribe = true;

        const getExamDetail = async () => {
            await axios.get(`/api/v1/questions/${id}`).then(res => {
                if (subscribe) {
                    setExamDetail(res.data.exam_detail);
                    setLoading(false);
                }

            }).catch(err => {
                console.log(err);
                setLoading(false);
                // alert(err.response.data);
            })
        }

        getExamDetail();

        return () => subscribe = false;

    }, [examDetail]);

    return (
        <div className="w-full h-full bg-white">
            <Header title="CSE401 Exam Dashboard" />
            <Navbar username={user.name} />
            <div className="w-11/12 mx-auto h-full pt-24 relative">
                {
                    loading ? <h1>Loading....</h1> : (
                        <>
                            <div className="fixed py-3 w-full">
                                <h2 className="font-bold text-lg px-9">
                                    {examDetail.course_detail?.title} {`(${examDetail.course_detail?.course_code})`}
                                </h2>
                            </div>
                            <div className="px-9 pt-10">
                                <QuestionBox
                                    questions={examDetail.questions}
                                    time={startTime}
                                    examDuration={examDetail.course_detail?.duration}
                                />
                            </div>
                        </>
                    )
                }
               
            </div>
        </div>
    );
}

export async function getServerSideProps(ctx) {
    const resp = verifyToken(ctx);

    if (!ctx.req && resp.status === 401 || resp.status === 400) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }
    
    if (ctx.req && resp.status === 401 || resp.status === 400) {
        ctx.res.writeHead(302, {
            Location: "/"
        });

        ctx.res.end();

        return { props: {} };
    }

    const res = await fetch("http://localhost:3000/api/v1/questions/1");
    const result = await res.json();
    const startTime = JSON.stringify(new Date());

    return {
        props: {
            user: resp.current_user,
            startTime,
            // exam_detail: result.exam_detail
        }
    }
}
