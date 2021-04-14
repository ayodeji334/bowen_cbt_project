import Link from "next/link";
import Header from "../../components/header";
import Navbar from "../../components/navbar";

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
        <div className="w-full bg-gray-200">
            <Header title="Exam Instructions" />
            <Navbar username="Odunayo Fawumi" />
            <div className="container mx-auto pt-24">
                <div className="w-7/12 mx-auto mt-6 rounded-xl border-2">
                    <div className="border-b-2 w-full p-5">
                        <h1 className="font-bold text-2xl">Avaliable Courses</h1>
                    </div>
                    <div className="px-5 py-6 w-full flex flex-col">
                        {
                            avaliableCourses.map(course => (
                                <Link key={course.id} href="/exam/[id]" as={`/exam/${course.id}`} >
                                    <a className="text-blue-700 underline text-xl font-bold w-full my-3">{course.name}</a>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}