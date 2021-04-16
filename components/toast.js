export default function Toast({ status, title, description}) {
    return (
        <div className="position top-40 right-10">
            <div className={status === "success" ? "bg-green-700 py-4 px-3 rounded-lg" : "py-4 px-3 rounded-lg bg-red-700"}>
                <h2 className="text-white py-2 text-base font-semibold">{title}</h2>
                <p className="text-white py-2 text-base font-semibold">{description}</p>
            </div>
        </div>
    )
}