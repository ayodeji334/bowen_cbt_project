export default function AlertContainer({ children}) {
    return (
        <div className="fixed top-0 left-0 w-full h-full alert-container bg-black flex justify-center items-center">
            <div className="bg-white rounded-xl mx-auto py-5 px-5">
                {children}
            </div>
        </div>
    )
}