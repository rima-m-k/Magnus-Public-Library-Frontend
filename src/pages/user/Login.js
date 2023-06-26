import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../services/userServiceHelpers";
import { checkEmail, isEmpty } from '../../validation/FormValidation';
import spinner from "../../spinner/UserSpinner.gif";

function Login() {
  const Navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const name = e.target.name; 
    const value = e.target.value;
    setUserInfo((values) => ({ ...values, [name]: value }));
    setError('')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError || passwordError) {
      setError("Form contains invalid details . Try again later")
    } else {
      setIsLoading(true);
      userLogin(userInfo)
        .then((res) => {
          console.log(res)
         
          localStorage.setItem("currentUser", JSON.stringify(res.data.token));
          localStorage.setItem("userName", JSON.stringify(res.data.userName));

          Navigate("/") 
        })
        .catch((err) => {


          console.log(err);
          setError(err.response?.data?.message);
        })
        .finally(() => {
          setIsLoading(false);
          setUserInfo({
            email: '',
            password: ''
          })
        });
    }





  };

  return (
    <>
      <div className="flex flex-col items-center  min-h-screen bg-slate-50">
        <h2 className="text-3xl font-bold mb-6 text-slate-800  border-x-gray-500 my-4 py-4 ">LOGIN</h2>
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 shadow-lg shadow-slate-400 rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                onKeyUp={e => setEmailError(checkEmail(e.target.value))}
                className=" bg-zinc-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {emailError && <span className="text-red-600"> {emailError}</span>}
            </div>
            {/* /////////////////////////////////////  spinner   //////////////////////////////////////////////// */}
            {isLoading && (
              <div className="relative">
                {" "}
                <div className="absolute  inset-0  flex justify-center items-center z-50">
                  <div className=" rounded-full h-20 w-20  ">
                    <img src={spinner} className="w-50 h-auto" alt="loading" />
                  </div>
                </div>{" "}
              </div>
            )}
            {/* /////////////////////////////////////  spinner end   //////////////////////////////////////////////// */}

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={userInfo.password}
                onChange={handleChange}
                onKeyUp={e => setPasswordError(isEmpty(e.target.value))}
                className="bg-zinc-50 shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {passwordError && <span className="text-red-600"> {passwordError}</span>}
            </div>

            {error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
                {error}
              </div>
            ) : null}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-custom-green hover:bg-custom-olive text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
            <div>
              <Link
                to="/signup"
                className="inline-block align-baseline font-bold text-sm text-custom-green hover:text-custom-olive"
              >
                Create an Account
              </Link><span>|</span>
              <Link
                to="/"
                className="inline-block align-baseline font-bold text-sm text-custom-green hover:text-custom-olive"
              >
                Forgot Password
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
