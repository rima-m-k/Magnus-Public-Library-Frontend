import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OTPverification, userSignup } from "../../services/userServiceHelpers";
import {
  checkEmail,
  checkPassword,
  checkName,
  checkConfirmPswd,
  isNumber,
} from "../../validation/FormValidation";
import Spinner from "../../components/Spinner";

const Signup = () => {
  const Navigate = useNavigate();
  //---------------------------------------------------------state declarations-------------------------------------------------------------
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    otp: "",
  });
  console.log(userData.otp,"ll")
  const [showOTP, setShowOTP] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpasswordError, setcPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");

  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setUserData((values) => ({ ...values, [name]: value }));
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (nameError || emailError || passwordError || cpasswordError) {
      setError("Form contains invalid details . Try again later");
    } else {
      setIsLoading(true);
      userSignup(userData)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setShowOTP(true);
          }
        })
        .catch((err) => {
          //err.response.status===500
          console.log(err);
          if (err.response.status === 401) setError(err.response.data.message);
          else if (err.response.status === 500)
            setError(err.response.data.message);
          else setError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function verifyOTP(e) {
    e.preventDefault();
    console.log(userData);
    OTPverification(userData)
      .then((res) => {
        console.log(res);
        localStorage.setItem("currentUser", JSON.stringify(res.data.token));
        localStorage.setItem("userName", JSON.stringify(res.data.userName));

        Navigate("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) setError(err.response.data.message);

      });
  }

  return (
    <>
      <div className="min-h-screen">
        <h1 className="text-center  font-bold mb-6 text-slate-800  border-x-gray-500 text-3xl   m-5 pt-5 ">
          SIGNUP
        </h1>
        <div className="flex flex-col items-center   min-h-screen ">
          <div className="w-full max-w-md">
            {!showOTP ? (
              <form
                className="shadow-neutral-500 shadow-2xl rounded px-8 pb-8 my-4"
                onSubmit={handleSubmit}
              >
                <div className="my-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-4 pt-4"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={userData.fullname}
                    onChange={handleChange}
                    onKeyUp={(e) => setNameError(checkName(e.target.value))}
                    className="w-full px-3 py-2 text-gray-900  rounded-md border-2"
                  />
                  {nameError && (
                    <span className="text-red-600"> {nameError}</span>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={userData.email}
                    onChange={handleChange}
                    onKeyUp={(e) => setEmailError(checkEmail(e.target.value))}
                    className="w-full px-3 py-2 text-gray-900 border-2 rounded-md"
                  />
                  {emailError && (
                    <span className="text-red-600"> {emailError}</span>
                  )}
                </div>
                {isLoading && <Spinner />}

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={userData.password}
                    onChange={handleChange}
                    onKeyUp={(e) =>
                      setPasswordError(
                        checkPassword(e.target.value, userData.email)
                      )
                    }
                    className="w-full px-3 py-2 text-gray-900 border-2 rounded-md"
                  />

                  {passwordError && (
                    <span className="text-red-600"> {passwordError}</span>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="cpassword"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    required
                    value={userData.cpassword}
                    onChange={handleChange}
                    onKeyUp={(e) =>
                      setcPasswordError(
                        checkConfirmPswd(e.target.value, userData.password)
                      )
                    }
                    className="w-full px-3 py-2 text-gray-900 border-2 rounded-md"
                  />
                  {cpasswordError && (
                    <div className="text-red-500">{cpasswordError}</div>
                  )}
                </div>

                {error ? (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
                    {error}
                  </div>
                ) : null}
                <button
                  type="submit"
                  className="bg-custom-green text-white rounded-md px-4 py-2 m-3 hover:bg-custom-olive"
                >
                  &nbsp; Register &nbsp;
                </button>
              </form>
            ) : (
              <form
                className="shadow-neutral-500 shadow-2xl rounded px-8 pb-8 my-4"
                onSubmit={verifyOTP}
              >
                <div className="my-4">
                  <label
                    htmlFor="otp"
                    className="block text-gray-700 font-bold mb-4 pt-4"
                  >
                    OTP
                  </label>
                  <input
                    type="number"
                    id="otp"
                    name="otp"
                    value={userData.otp}
                    onChange={handleChange}
                    onKeyUp={e=> setOtpError(isNumber(e.target.value))}
                    className="w-full px-3 py-2 text-gray-900  rounded-md border-2"
                  />
                  {otpError && <span className="text-red-600"> {otpError}</span>}
                </div>
                {error ? (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
                    {error}
                  </div>
                ) : null}
                <button
                  type="submit"
                  className="bg-custom-green text-white rounded-md px-4 py-2 m-3 hover:bg-custom-olive"
                >
                  &nbsp; Verify &nbsp;
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
