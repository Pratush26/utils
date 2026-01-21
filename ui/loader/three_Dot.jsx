export default function Loader() {
    return (
        <div className="flex gap-4">
            <span className="w-3 h-3 rounded-full bg-blue-600 animate-ping"></span>
            <span className="w-3 h-3 rounded-full bg-blue-600 animate-ping" style={{ animationDelay: "200ms" }} ></span>
            <span className="w-3 h-3 rounded-full bg-blue-600 animate-ping" style={{ animationDelay: "400ms" }} ></span>
        </div>
    )
}