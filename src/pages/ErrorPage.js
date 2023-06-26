import React from "react";
import { Link } from "react-router-dom";
import LandingPage from "./user/LandingPage";

const ErrorPage = () => {
    return (
        <div className="h-screen  flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-4">We can't seem to find the resource you're looking for.</h1>
            <p className="text-lg text-gray-700 mb-4">
                Please check that the Web site address is spelled correctly.
                Or go to our home page, and use the menus to navigate to a specific section.
            </p>
            <button className="bg-custom-green text-white font-bold py-2 px-4 rounded">
                <Link to="/" element={<LandingPage />}>
                    Go Home
                </Link>
            </button>
        </div >
    );
};

export default ErrorPage;
