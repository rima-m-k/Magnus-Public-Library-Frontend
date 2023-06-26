import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { staffLogin } from "../../services/adminServiceHelpers";
import { checkEmail, checkPassword } from "../../validation/FormValidation";
import Spinner from "../../components/Spinner";

function StaffLogin() {
  const [isLoasing,setIsLoading] = useState(false)

  let [formData, setFormData] = useState({
    email: "",
    password: "",
  }); 
 const [emailError,setEmailError] = useState('')
 const [passwordError,setPasswordError] = useState('')
  let [error, setError] = useState("");

  const Navigate = useNavigate();

  function handleFormData(e) {   
    const name = e.target.name;
    const value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value })); 
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    staffLogin(formData)
    .then((res) => {
      if(res.data.designationID==="LBN01"){ 
        localStorage.setItem("AdminData", JSON.stringify(res.data.token));
        Navigate("/admin/dashboard")
      }else if(res.data.designationID==="ASI01"){
      localStorage.setItem("AsstData", JSON.stringify(res.data.token));
      Navigate("/asst/dashboard")
      }

    })
      .catch((err) => {
        console.log(err)
        if (err.code === 'ECONNABORTED') {
          setError("server took too long to respond");
        }

        if (err.response !== undefined) {
          console.log(err.response)
          setError(err.response.data.message);
          setFormData({
            email: "",
            password: "",
            designationID: "",
          });
        }

      })
      .finally(() => setIsLoading(false))
  }

  return (
    <>
      <nav className="flex flex-wrap items-center justify-between p-6 bg-custom-blue">
        <div className="flex-shrink-0 text-white ">
          <span className="font-bold text-3xl">M</span>
          <span className="font-normal text-2xl">agnus</span>
          <br />
          <span className="font-bold text-3xl">P</span>
          <span className="font-normal text-2xl">ublic</span>
          <br />
          <span className="font-bold text-3xl">L</span>
          <span className="font-normal text-2xl">ibrary</span>
        </div>
      </nav>

      {/* login part */}
      <div className="flex flex-col justify-center items-center w-1/4  mx-auto mt-5 ">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded container shadow-md"
        >
          <h2 className="text-2xl mb-4 font-bold">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              email
            </label>
            <input
              type="email"
              name="email" 
              id="eamil"
              value={formData.email}
              onChange={handleFormData}
              required
              onKeyUp={ e => setEmailError(checkEmail(e.target.value))}
              className="border-gray-400 bg-gray-100 border-b-2 block w-full rounded py-2 px-3 mx-1"
            />
                          {emailError && <span className="text-red-600"> {emailError}</span>}

          </div>
          {isLoasing ?<Spinner isUser = {false} /> :null }
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            {/* <Link to="/asst/dashboard" className="text-white pb-5" element={<Dashboard />}>dash</Link> */}

            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleFormData}
              required
              // onClick={e => setPasswordError(checkPassword(e.target.value))}
              className="border-gray-400 bg-gray-100 border-b-2 block w-full rounded py-2 px-3 mb-1"
            />
                          {passwordError && <span className="text-red-600"> {passwordError}</span>}

          </div>
         
          {error ? <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">{error}</div> : null}
          <button
            type="submit"
            className="bg-custom-blue  text-white py-2 px-4 "
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default StaffLogin;
