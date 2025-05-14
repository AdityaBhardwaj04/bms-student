import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (email === "admin" && password === "admin") {
            navigate("/dashboard");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="flex flex-col items-center">
                    <div className="bg-blue-600 rounded-full p-3 mb-4">
                        <LockClosedIcon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Student Data Manager
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Login to access your dashboard
                    </p>
                </div>

                <div className="mt-8 bg-white py-8 px-6 shadow rounded-lg">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="admin@school.edu"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="flex justify-between items-center">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="••••••••"
                            />
                            <a
                                href="#"
                                className="text-sm text-blue-600 hover:underline ml-2"
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow"
                    >
                        Log In
                    </button>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Contact administrator
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
