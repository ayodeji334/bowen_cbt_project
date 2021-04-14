import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-white text-center">
            <h1 className="text-7xl font-extrabold">404</h1>
            <h2 className="text-4xl font-extrabold py-4">Oooops..</h2>
            <p className="text-lg font-medium py-2">The page you are looking for cannot be found</p>
            <p className="text-lg font-medium py-2">Go back to the <Link href="/" ><a className="text-blue-600 pl-2">Homepage</a></Link></p>
        </div>
    )
};
