import Header from '../components/header'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
//import axios from 'axios'

export default function SignIn() {
    const [matric_number, setMatricNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [toggle, setTogglePassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const passwordInput = React.useRef();
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
          setPassword('');
          setMatricNumber('');
          setLoading(false);
          if (typeof window !== 'undefined') {
            router.push('/exam');
            return;
          }
      }, 3000);

        // axios.post('/api/v1/auth/login', {
        //     matric_number, password
        // }).then(res => {
        //     setPassword('');
        //     setMatricNumber('');
        //     setLoading(false);
        //     if (typeof window !== 'undefined') {
        //       router.push('/exam');
        //       return; 
        //     }
        // }).catch(err => {
        //     setLoading(false);
        // });
    }

    const togglePassword = () => {
        setTogglePassword(!toggle);
        if (passwordInput.current.type === "password") {
            passwordInput.current.type = "text"
        } else {
            passwordInput.current.type = "password";
        }
    }

    return (
        <div className="w-full h-full">
            <div className="w-full h-full">
                <Header title="Login Page" />
                <div className="w-full h-full">
                    <div className=" w-full h-full flex flex-row">
                        <div className="lg:block hidden w-1/2 h-full px-20">
                            <div className="h-full w-full flex flex-col justify-center text-left">
                                <h1 className="text-5xl font-extrabold py-5 mb-4">Hello, Bowenite</h1>
                                <h2 className="text-3xl font-extrabold py-3">Instructions</h2>
                                <p className="text-lg font-normal pt-2">
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua?. Ut enim ad minim veniam, quis nostrud
                                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                                  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                                  anim id est laborum.
                                </p>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 h-full">
                            <div className="h-full w-full">
                                <div className="w-full h-full flex flex-col justify-center items-center">
                                    <div className="w-11/12 lg:w-3/5 bg-white rounded-lg shadow-xl border-2 py-4 px-8">
                                        <h2 className="text-2xl lg:text-left font-extrabold py-6">Sign In</h2>
                                        <p className="pb-4 text-base">Enter your matric number and password to start the exam</p>
                                        <form onSubmit={handleLogin} className="py-9">
                                            <div className="mb-4">
                                                <label className="block text-black text-base font-bold mb-2" htmlFor="email">
                                                    Matriculation Number
                                            </label>
                                                <input
                                                    className="border-2 rounded-md w-full
                                                py-5 px-3 text-gray-700
                                                leading-tight text-sm 
                                                focus:outline-none
                                                focus:shadow-outline"
                                                    type="text"
                                                    placeholder="Enter matric number"
                                                    value={matric_number}
                                                    onChange={(e) => {
                                                        e.preventDefault();
                                                        setMatricNumber(e.target.value);
                                                    }}
                                                />
                                            </div>
                                            <div className="mb-1">
                                                <label className="block text-black text-base font-bold mb-2" htmlFor="password">
                                                    Password
                                            </label>
                                                <input
                                                    className="
                                                border-2 rounded-md w-full py-5 px-3
                                                text-gray-700 mb-3 leading-tight text-sm
                                                focus:outline-none focus:shadow-outline"
                                                    type="password"
                                                    placeholder="passw*****"
                                                    value={password}
                                                    ref={passwordInput}
                                                    onChange={(e) => {
                                                        e.preventDefault();
                                                        setPassword(e.target.value);
                                                    }}
                                                />
                                                <span className="float-right -mt-16 cursor-pointer p-3 mr-3 z-10 relative" onClick={togglePassword}>
                                                    {toggle ? <FiEyeOff size="20px" /> : <FiEye size="20px" />}
                                                </span>
                                            </div>
                                            <div className="w-full">
                                                <button
                                                    disabled={loading}
                                                    className={loading ? "flex flex-row justify-center items-center disabled opacity-30 cursor-not-allowed w-full mt-3 bg-blue-900 shadow-lg rounded-full hover:bg-blue-800 text-base text-white font-bold py-6 focus:outline-none focus:shadow-outline"
                                                        : "flex flex-row justify-center items-center w-full mt-3 shadow-lg rounded-full bg-blue-900 hover:bg-blue-800 text-base text-white font-bold py-6 focus:outline-none focus:shadow-outline"}
                                                    
                                                    type="submit"
                                                >
                                                   { loading ? "Loding" : "Login" }
                                                </button>
                                            </div>
                                        </form>
                                        <div className="my-6 text-center">
                                            <p className="text-black font-medium text-base">
                                                Is this your first time here?
                                            </p>
                                            <Link href="/register">
                                                <a className="pl-2 text-base text-blue-700 hover:text-red">Click here to Register</a>
                                            </Link>
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
