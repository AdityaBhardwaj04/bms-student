// src/pages/LandingPage.jsx
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">
                Welcome to the School Portal
            </h1>
            <p className="text-gray-600">Please choose an option to proceed:</p>
            <div className="flex space-x-4">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                >
                    🎓 School
                </button>
                <button
                    onClick={() => navigate("/summer-camp")}
                    className="px-6 py-3 bg-green-600 text-white rounded shadow hover:bg-green-700"
                >
                    🏕️ Summer Camp
                </button>
            </div>
        </div>
    );
}
