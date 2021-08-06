import axios from 'axios';
import Image from 'next/image';
import router from 'next/router';
import React from 'react';
import { BiChevronDown, BiPowerOff } from 'react-icons/bi';

function Navbar({ username }) {
    const [toggleMenu, setToggleMenu] = React.useState(false);

    const handleLogOut = (e) => {
        axios.post("/api/v1/auth/logout").then(res => {
            router.push("/");

        }).catch(err => {
            alert(err.response.data.message);
        });
    };

    return (
        <div className="w-full fixed bg-white z-10 py-4 border-b-2 border-gray-100">
            <div className="w-11/12 mx-auto">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center">
                        <Image src="/logo.png" width={40} height={30} />
                        <h1 className="ml-3 font-bold text-sm text-blue-900">Bowen University</h1>
                    </div>
                    <div className="relative flex flex-col">
                        <h3
                            onClick={() => setToggleMenu(!toggleMenu)}
                            className="py-2 px-3 rounded-md cursor-pointer hover:bg-gray-100 flex flex-row items-center
                            font-semibold text-sm capitalize">
                                {username} <BiChevronDown className="ml-2" fontSize="17px" />
                        </h3>
                        <div className={toggleMenu ? "absolute w-full top-14 py-2 border-2 flex flex-col bg-white shadow-lg z-50 rounded-md" : "hidden"}>
                            <ul>
                                <li 
                                    className="py-2 px-3 hover:bg-purple-100 font-semibold cursor-pointer 
                                    items-center flex flex-row"
                                    onClick={handleLogOut}>
                                    <BiPowerOff className="mr-1" fontSize="17px" /> Logout
                                </li>
                            </ul>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Navbar
