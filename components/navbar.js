// import {
//     Text,
//     Menu,
//     MenuButton,
//     MenuList,
//     MenuItem,
//     Avatar,
//     Stack
// } from "@chakra-ui/react";
import Image from 'next/image';
import { useState } from 'react';
import { BiChevronDown, BiPowerOff } from 'react-icons/bi';

function Navbar({ username }) {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <div className="w-full fixed bg-white z-10 py-4 border-b-2 border-gray-100">
            <div className="w-11/12 mx-auto">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center">
                        <Image src="/logo.png" width={50} height={40} />
                        <h1 className="ml-3 font-bold text-base text-blue-900">Bowen University</h1>
                    </div>
                    <div className="relative flex flex-col">
                        <h3
                            onClick={() => setToggleMenu(!toggleMenu)}
                            className="py-2 px-3 rounded-md cursor-pointer hover:bg-gray-100 flex flex-row items-center
                         font-semibold text-base">{username} <BiChevronDown className="ml-2" fontSize="17px" />
                        </h3>
                        <div className={toggleMenu ? "absolute w-full top-12 py-2 border-2 flex flex-col bg-white shadow-lg z-50 rounded-md" : "hidden"}>
                            <ul>
                                <li className="py-2 px-3 hover:bg-purple-100 font-semibold cursor-pointer 
                                items-center flex flex-row">
                                    <BiPowerOff className="mr-1" fontSize="17px" /> Logout</li>
                            </ul>
                        </div>
                        {/* <Avatar className="mr-4" name={username} size="sm" src="https://bit.ly/broken-link" />
                        <Menu>
                            <MenuButton
                                px={4}
                                py={2}
                                transition="all 0.2s"
                                borderRadius="md"
                                borderWidth="1px"
                                className="bg-white px-3 py-2"
                                _hover={{ bg: "gray.100", outline: '#fff' }}
                                _focus={{ boxShadow: "outline" }}
                            >
                                <Stack direction="row">
                                    <Text fontSize="md" className="font-bold">{username}</Text>
                                    <BiChevronDown />
                                </Stack>
                            </MenuButton>
                            <MenuList>
                                <MenuItem
                                    _hover={{ bg: "#fff" }}
                                    _focus={{ boxShadow: "outline" }}
                                >Logout</MenuItem>
                            </MenuList>
                        </Menu>*/}
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Navbar
