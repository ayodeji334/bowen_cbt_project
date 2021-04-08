import Header from '../components/header'
import Link from 'next/link'
import * as React from 'react'
//import axios from 'axios';

export default function SignUp() {
    const [matric_number, setMatricNumber] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [firstname, setFirstName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [college, setCollege] = React.useState('');
    const [dept, setDept] = React.useState('');
    const [departments, setDepartments] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        let subscribe = true;

        const getCollegeDepts = async () => {
            if (college !== '') {
                let college_id;

                switch (college.toString()) {
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

                // await axios.post('/api/v1/programmes', { college_id })
                // .then(res => {
                //     console.log(res);
                //     if (subscribe) {
                //         setDepartments(res.data.result);
                //     }
                // })
                // .catch(err => console.log(err.response));
            }else {
                setDepartments([]);
            }
        }

        getCollegeDepts();

        return () => subscribe = false;
    }, [college]);

    const handleCreateAccount = (e) => {
        e.preventDefault();
         setLoading(true);
        // // axios.post('/api/v1/auth/register', {
        // //     surname, firstname, matric_number, email, college, dept
        // // }).then(res => {
        // //     setEmail('');
        // //     setFirstName('');
        // //     setSurname('');
        // //     setMatricNumber('');
        // //     setCollege('');
        // //     setDept("");
        // //     setLoading(false);
        // // }).catch(err => {
        // //     setLoading(false);
        // //     if (err.response.data.status === 401) {
        // //     } else {
        // //         console.log(err);
        // //     }
        // // });
    }

    return (
       <div className="w-full h-full">
            <div className="w-full h-full">
                <Header title="Create a New Account" />
                <div className="w-full h-full">
                    <div className="w-full h-full flex flex-row">
                        <div className="hidden lg:block lg:w-1/2 h-full px-20">
                            <div className="h-full w-full flex flex-col justify-center text-left">
                                <h1 className="text-5xl font-extrabold py-5 mb-4">Hello, Bowenite</h1>
                                <h2 className="text-3xl font-extrabold py-3">Instructions</h2>
                                <p className="text-xl font-normal pt-3">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                                    anim id est laborum.
                                </p>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 h-full">
                            <div className="h-full w-full">
                                <div className="w-full h-full flex flex-col items-center overflow-y-scroll overflow-x-hidden py-16">
                                    <div className="w-11/12 lg:w-9/12 bg-white rounded-lg shadow-xl border-2 py-5 px-7 lg:px-10">
                                        <h2 className="text-2xl font-extrabold pt-6 pb-2">Create Account </h2>
                                        <p className="pb-4 text-base">Get started by creating a new account.</p> 
                                        <form onSubmit={handleCreateAccount} className="py-9">
                                            <div className="mb-2">
                                                <label className="block text-black text-base font-bold mb-2" htmlFor="email">
                                                Firstname
                                                </label>
                                                <input
                                                    required
                                                    className="border-2 rounded-md w-full
                                                    py-5 px-3 text-gray-700
                                                    leading-tight
                                                    text-sm
                                                    focus:outline-none
                                                    focus:shadow-outline"
                                                    type="text"
                                                    placeholder="Enter your name"
                                                    value={firstname}
                                                    onChange={(e) => {
                                                        e.preventDefault();
                                                        setFirstName(e.target.value);
                                                    }}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-black text-base font-bold mb-2" htmlFor="surname">
                                                Surname
                                                </label>
                                                <input
                                                    className="border-2 rounded-md w-full
                                                    py-5 px-3 text-gray-700
                                                    leading-tight
                                                    text-sm
                                                    focus:outline-none
                                                    focus:shadow-outline"
                                                    type="text"
                                                    placeholder="Enter your surname"
                                                    value={surname}
                                                    required
                                                    onChange={(e) => {
                                                        e.preventDefault();
                                                        setSurname(e.target.value);
                                                    }}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-black text-base font-bold mb-2" htmlFor="email">
                                                Email
                                                </label>
                                                <input
                                                    required
                                                    className="border-2 rounded-md w-full
                                                    py-5 px-3 text-gray-700
                                                    leading-tight
                                                    text-sm
                                                    focus:outline-none
                                                    focus:shadow-outline"
                                                    type="email"
                                                    placeholder="Enter your email here"
                                                    value={email}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                    }}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <label className="block text-black text-base font-bold mb-2" htmlFor="matric_number">
                                                Matric Number
                                                </label>
                                                <input
                                                    required
                                                    className="border-2 rounded-md w-full
                                                    py-5 px-3 text-gray-700
                                                    leading-tight
                                                    text-sm
                                                    focus:outline-none
                                                    focus:shadow-outline"
                                                    type="text"
                                                    placeholder="Enter your Matric Number"
                                                    value={matric_number}
                                                    onChange={(e) => {
                                                        e.preventDefault();
                                                        setMatricNumber(e.target.value);
                                                    }}
                                                />
                                            </div>  
                                            <div className="mb-2">
                                                <label className="block text-black text-base font-bold mb-2" htmlFor="matric_number">
                                                Select College
                                                </label>
                                                <select
                                                    required
                                                    className="border-2 rounded-md w-full
                                                    py-5 px-3 text-gray-700
                                                    leading-tight
                                                    text-sm
                                                    focus:outline-none
                                                    focus:shadow-outline" name="college" value={college} onChange={(e) => {
                                                        setCollege(e.target.value);
                                                    }}>
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
                                                <label className="block text-black text-base font-bold mb-2" htmlFor="matric_number">
                                                Select Department
                                                </label>
                                                <select
                                                    required
                                                    className="border-2 rounded-md w-full
                                                    py-5 px-3 text-gray-700
                                                    leading-tight
                                                    text-sm
                                                    focus:outline-none
                                                    focus:shadow-outline" name="dept" value={dept} onChange={(e) => {
                                                        e.preventDefault();
                                                        setDept(e.target.value);
                                                    }}>
                                                        <option value="">Choose your department</option>
                                                        {
                                                        departments.map(dept => (
                                                            <option key={dept.id} value={dept.programme} className="capitalize">{dept.programme}</option>
                                                            ))
                                                    } 
                                                </select>
                                            </div>   
                                            <div className="w-full">
                                                <button
                                                    disabled={loading}
                                                    className={loading ? "flex flex-row justify-center items-center disabled opacity-30 cursor-not-allowed w-full mt-7 shadow-sm rounded-full bg-red-700 hover:bg-red-600 text-base text-white font-bold py-6 focus:outline-none focus:shadow-outline"
                                                : "flex flex-row justify-center items-center w-full mt-7 shadow-lg rounded-full bg-red-700 hover:bg-red-600 text-base text-white font-bold py-6 focus:outline-none focus:shadow-outline"}
                                                        type="submit">
                                                        {
                                                            loading ? <Spinner className="mr-4" size="md" color="#fff" /> : null
                                                        }
                                                    Create Account
                                                </button>
                                            </div>
                                        </form>
                                        <div className="my-6 text-center">
                                            <p className="text-black font-medium text-base">
                                            Already have an account?
                                                <Link href="/">
                                                    <a className="pl-2 text-base text-blue-700 hover:text-red">Click here to Login</a>
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
        </div>
    )
}
