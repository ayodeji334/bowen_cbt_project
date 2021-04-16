import Link from "next/link";
import Header from "../../components/header";
import Navbar from "../../components/navbar";
import verifyToken from "../../api/v1/auth/verifyToken";

export default function AvaliableCourses({ data }) {
    const avaliableCourses = [
        {
            id: 1,
            name: "Introduction to Computer science CSC101"
        },
        {
            id: 2,
            name: "Numeral Computation MAT101"
        }
    ];
    
    return (
        <div className="w-full bg-gray-200 h-full">
            <Header title="Exam Instructions" />
            <Navbar username={data.name} />
            <div className="container mx-auto pt-24">
                <div className="w-7/12 mx-auto mt-6 rounded-xl bg-white">
                    <div className="w-full p-5 border-b-2">
                        <h1 className="font-bold text-2xl">Avaliable Courses</h1>
                    </div>
                    <div className="px-5 py-6 w-full flex flex-col">
                        {
                            avaliableCourses.map(course => (
                                <Link key={course.id} href="/exam/[id]" as={`/exam/${course.id}`} >
                                    <a className="text-blue-700 hover:underline text-xl font-bold w-full my-3">{course.name}</a>
                                </Link>
                            ))
                        }
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