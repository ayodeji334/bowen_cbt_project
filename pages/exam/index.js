import axios from "axios";
import Link from "next/link";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import verifyToken from "../api/v1/auth/verifytoken";
import React from "react";

export default function AvaliableCourses({ user }) {
    const [loading, setLoading] = React.useState(true);
    const [avaliableCourses, setAvailableCourses] = React.useState([]);

    React.useEffect(() => {
        let subscribe = true;

        const getAvailableCourses = async () => {

            await axios.get("/api/v1/courses/getavailablecourse").then(res => {
                if (subscribe) {
                    setAvailableCourses([...res.data.result]);
                    setLoading(false);
                }

            }).catch(err => {
                console.log(err);
                // alert(err.response.data);
            })
        }

        getAvailableCourses();

        return () => subscribe = false;
    }, [avaliableCourses]);
    
    return (
        <div className="w-full bg-gray-200 h-full">
            <Header title="Available Courses" />
            <Navbar username={user.name} />
            <div className="container mx-auto pt-24">
                <div className="w-7/12 mx-auto mt-6 rounded-xl bg-white">
                    <div className="w-full p-5 border-b-2">
                        <h1 className="font-bold text-lg">Avaliable Courses</h1>
                    </div>
                    <div className="px-5 py-6">
                        
                            {
                                loading ? (
                                    <h2>Please wait...</h2>
                                ) : (
                                    <ul>
                                        {
                                            avaliableCourses.map(course => (
                                                <li key={course.id} className="my-2 py-1">
                                                    <Link key={course.id} href="/exam/[id]" as={`/exam/${course.id}`} >
                                                        <a className="text-blue-700 hover:underline text-lg font-bold my-3">
                                                            {course.title}
                                                        </a>
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                )
                            }
                        
                    </div>
                </div>
            </div>
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

    const result = await axios.get("/api/v1/courses/getavailablecourse").then(res => res).catch(err => err);

    console.log(result);

    return {
        props: {
            user: resp.current_user
        }
    }
}