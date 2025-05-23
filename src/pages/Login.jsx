import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from "firebase/auth";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { auth } from "../firebase"; // Make sure auth is exported from firebase.js

// Only these emails will be allowed access
const ALLOWED_EMAILS = ["pbrightminds@gmail.com","krrina70@gmail.com"];

export default function Login() {
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const userEmail = result.user.email;

            if (ALLOWED_EMAILS.includes(userEmail)) {
                navigate("/dashboard");
            } else {
                alert("Access Denied: You are not authorized.");
                await auth.signOut();
            }
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && ALLOWED_EMAILS.includes(user.email)) {
                navigate("/landing-page");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

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
                        Login using your school admin Google account
                    </p>
                </div>

                <div className="mt-8 bg-white py-8 px-6 shadow rounded-lg">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow"
                    >
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
}
