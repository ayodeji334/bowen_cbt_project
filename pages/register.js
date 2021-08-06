import Header from '../components/header'
import Link from 'next/link'
import React from 'react'
import axios from 'axios';
import Image from "next/image";
// import { Router, useRouter } from 'next/router';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
import verifyToken from './api/v1/auth/verifytoken';
import router from 'next/router';
import { FaCheck } from 'react-icons/fa';

export default function SignUp() {
    const [matricNumber, setMatricNumber] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [dept, setDept] = React.useState("");
    const [college, setCollege] =  React.useState("");
    const [departments, setDepartments] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [isAuthSuccess, setIsAuthSuccess] = React.useState(false);

   // const router = useRouter();

    const handleRegistration = async (e) => {
        e.preventDefault();

        setLoading(true);

        const user = {
            matricNumber,
            firstName,
            surname,
            email,
            dept,
            college
        };

        await axios.post('/api/v1/auth/register', user).then(res => {
            setLoading(false);
            setIsAuthSuccess(true);
            setTimeout(() => router.push("/exam"));

        }).catch(err => {
            setLoading(false);
            alert(err.response.data.message);
        });
    };

    React.useEffect(() => {
        const getCollegeDepts = async () => {
            let college_id;

            if (college !== "") {

                switch (college) {
                    case '':
                        college_id = 0;
                        break;
                    case 'COAES':
                        college_id = 1;
                        break;
                    case 'COMSS':
                        college_id = 2;
                        break;
                    case 'COLAW':
                        college_id = 3;
                        break;
                    case 'COCCS':
                        college_id = 4;
                        break;
                    case 'COHES':
                        college_id = 5;
                        break;
                    case 'COLBS':
                        college_id = 6;
                        break;
                    case 'COEVS':
                        college_id = 7;
                        break;
                    case 'COPGS':
                        college_id = 8;
                        break;
                    default:
                        break;
                };

                await axios.post("/api/v1/programmes", { college_id }).then(res => {
                    setDepartments([...res.data.result]);
                }).catch(err => {
                    console.log(err.response)
                });
            }
        };

        getCollegeDepts();

    }, [college]);


    return (
       <div className="w-full h-full">
            <Header title="Create a New Account" />
            <div className="w-full h-full">
                <div className="w-full h-full flex flex-row">
                    <div className="hidden lg:block lg:w-1/2 h-full bg-purple-900">
                        <div className="h-full mx-auto w-9/12 flex flex-col justify-center text-white text-left">
                            <h1 className="text-2xl font-extrabold py-4 mb-4">Create account and Start your exam</h1>
                            <p className="text-lg xl:text-base pt-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua?. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                                anim id est laborum.
                            </p>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 h-full bg-white">
                        <div className="h-full w-full">
                            <div className="w-full h-full flex flex-col items-center overflow-y-scroll overflow-x-hidden py-10">
                                <div className="w-11/12 lg:w-9/12 py-5 px-7 lg:px-10">
                                    <h2 className="text-xl font-extrabold pt-6 pb-2">Create Account </h2>
                                    <p className="pb-4 text-base">Get started by creating an account.</p> 

                                    <form onSubmit={handleRegistration} className="py-4">
                                        <div className="mb-2">
                                            <label className="block text-black text-base capitalize font-bold mb-2" htmlFor="firstname">
                                                Firstname
                                            </label>
                                            <input 
                                                required
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="border-2 rounded-md w-full
                                                    py-3 px-3 text-gray-700
                                                    leading-tight
                                                    text-sm
                                                    focus:outline-none
                                                    focus:shadow-outline"
                                                type="text"
                                                value={firstName}
                                                placeholder="Enter your name"
                                                id="firstname"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="block text-black text-base capitalize font-bold mb-2" htmlFor="surname">
                                                Surname
                                            </label>
                                            <input
                                                onChange={(e) => setSurname(e.target.value)}
                                                className="border-2 rounded-md w-full
                                                py-3 px-3 text-gray-700
                                                leading-tight
                                                text-sm
                                                focus:outline-none
                                                focus:shadow-outline"
                                                value={surname}
                                                type="text"
                                                placeholder="Enter your surname"
                                                id="surname"
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="block text-black text-base capitalize font-bold mb-2" htmlFor="email">
                                                Email
                                            </label>
                                            <input
                                                required
                                                className="border-2 rounded-md w-full
                                                py-3 px-3 text-gray-700
                                                leading-tight
                                                text-sm
                                                focus:outline-none
                                                focus:shadow-outline"
                                                type="email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                placeholder="example@gmail.com"
                                                id="email"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="block text-black text-base capitalize font-bold mb-2" htmlFor="matric_number">
                                                Matric Number
                                            </label>
                                            <input
                                                required
                                                className="border-2 rounded-md w-full
                                                py-3 px-3 text-gray-700
                                                leading-tight
                                                text-sm
                                                focus:outline-none
                                                focus:shadow-outline"
                                                type="text"
                                                placeholder="Enter your Matric Number"
                                                id="matric_number"
                                                onChange={(e) => setMatricNumber(e.target.value)}
                                                value={matricNumber}
                                            />
                                        </div>  
                                        <div className="mb-2">
                                            <label className="block text-black text-base capitalize font-bold mb-2" htmlFor="matric_number">
                                                Select College
                                            </label>
                                            <select
                                                required
                                                className="border-2 rounded-md w-full
                                                py-3 px-3 text-gray-700
                                                leading-tight
                                                text-sm
                                                focus:outline-none
                                                focus:shadow-outline" 
                                                name="college" 
                                                id="college"
                                                value={college}
                                                onChange={(e) => setCollege(e.target.value)}
                                            >
                                                    <option value="">Select your College</option>
                                                    <option value="COAES">College of Agriculture, Engineering & Science</option>
                                                    <option value="COMSS">College of Social & Management Science </option>
                                                    <option value="COLAW">College of Law</option>
                                                    <option value="COCCS">College of Computing & Communication Studies</option>
                                                    <option value="COHES">College of Health Sciences</option>
                                                    <option value="COLBS">College of Liberal Studies</option>
                                                    <option value="COEVS">College of Environmental Science</option>
                                                    <option value="COPGS">College of Post Graduate Studies</option>
                                                </select>
                                        </div>
                                        <div className="mb-2">
                                            <label className="block text-black text-base capitalize font-bold mb-2" htmlFor="matric_number">
                                                Select Department
                                            </label>
                                            <select
                                                required
                                                value={dept}
                                                className="border-2 rounded-md w-full
                                                py-3 px-3 text-gray-700
                                                leading-tight
                                                text-sm
                                                focus:outline-none
                                                focus:shadow-outline" 
                                                id="department"
                                                onChange={(e) => setDept(e.target.value)}
                                            >
                                                <option value="">Choose your department</option>
                                                {
                                                    departments.map(dept => (
                                                        <option 
                                                            key={dept.id} 
                                                            value={dept.title} 
                                                            className="capitalize"
                                                        >
                                                            {dept.title}
                                                        </option>
                                                    ))
                                                } 
                                            </select>
                                        </div>   
                                        <div className="w-full">
                                            <button
                                                disabled={loading}
                                                className={
                                                    loading ? `flex flex-row justify-center items-center disabled 
                                                            opacity-30 cursor-not-allowed w-full mt-7 shadow-sm rounded-full bg-blue-900 
                                                        hover:bg-blue-600 text-base text-white font-semibold py-4 focus:outline-none 
                                                        focus:shadow-outline`
                                                    : isAuthSuccess ? `flex flex-row justify-center items-center w-full mt-7 
                                                    shadow-lg rounded-full bg-green-900 hover:bg-green-600 text-base 
                                                text-white font-semibold py-4 focus:outline-none focus:shadow-outline` :`flex flex-row justify-center items-center w-full mt-7 
                                                    shadow-lg rounded-full bg-blue-900 hover:bg-blue-600 text-base 
                                                text-white font-semibold py-4 focus:outline-none focus:shadow-outline`
                                                }
                                                type="submit">
                                                    {
                                                        loading ? "Loading..." : isAuthSuccess ? <FaCheck /> : "Create Account"
                                                    }
                                            </button>
                                        </div>
                                    </form>
                                    <div className="my-6 text-center">
                                        <p className="text-black font-medium text-base">
                                        Already have an account?
                                            <Link href="/">
                                                <a className="pl-2 text-base text-blue-700 hover:text-red">Login here</a>
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const resp = verifyToken(ctx);
    
    if (ctx.req && resp.status === 200 || resp.status === 200) {
        ctx.res.writeHead(200, {
            Location: `${process.env.NEXT_DEV_BASE_URL}/exam`
        });

        ctx.res.end();

        return { props: {
            data: resp.current_user
        }};
    }

    return {
        props: {}
    }
}
