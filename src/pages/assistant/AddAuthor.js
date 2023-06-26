import React, { useState } from "react";
import { addAuthor } from "../../services/assistantServiceHelpers";
import { checkName, checkCode, checkDate,checkNationality ,checkTextarea} from "../../validation/FormValidation";
import { toast } from "react-toastify";
import spinner from "../../spinner/Spinner.gif";
import { useNavigate } from "react-router-dom";

function AddAuthor() {
  const Navigate = useNavigate()
  //////////////////////////////////////////////////declaring states/////////////////////////////////////////////////////////////
  const [authorData, setAuthorData] = useState({
    AuthorName: "",
    AuthorCode: "",
    Biography: "",
    Nationality: "",
    DOB: "",
    DOD: "",
  });
  const [nameError, setNameError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [dateError, setDateError] = useState("");
  const [natError, setNatError] = useState(""); 
  const [bioError, setBioError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  ////////////////////////////////////////////////handle submit function/////////////////////////////////////////////////////////////////
  const handleSubmitAuthorForm = (e) => {
    e.preventDefault();
    if (nameError === null && codeError === null && dateError === null && natError === null && bioError === null) {
      setIsLoading(true);
      addAuthor(authorData)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            toast.success("Added to Database", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setAuthorData({
              AuthorName: "",
              AuthorCode: "",
              Biography: "",
              Nationality: "",
              DOB: "",
              DOD: "",
            });
            setError("");
          }
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data.message);
          if(err.response.data.error==="Blocked By Admin"){
            toast.error("Blocked By Admin", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            Navigate('/admin/staffPortal')
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setError(
        "Form contains invalid details . Try again after correcting them "
      );
    }
  };
  ////////////////////////////////////////////////function handle change///////////////////////////////////////////////////////
  const handleChangeAuthorForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAuthorData((values) => ({ ...values, [name]: value }));
  };
  return (
    <>
      {" "}
      <div className="max-w-xl mx-auto bg-white rounded-xl mt-5 px-5 shadow-md">
        <div className="container m-auto my-4  ">
          <h1 className="text-center text-3xl font-semibold  py-4  text-custom-blue">
            ADD AUTHOR
          </h1>
          <div className=" pb-5">
            <form onSubmit={handleSubmitAuthorForm}>
              <div className="mb-4">
                <label
                  htmlFor="AuthorName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Author Name
                </label>
                <input
                  required
                  type="text"
                  id="AuthorName"
                  name="AuthorName"
                  title="Full Name of the author."
                  value={authorData.AuthorName}
                  onChange={handleChangeAuthorForm}
                  onKeyUp={(event) => {
                    setNameError(checkName(event.target.value));
                  }}
                  className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                />

                {nameError ? (
                  <span className="text-red-600"> {nameError}</span>
                ) : null}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="AuthorCode"
                  className="block text-gray-700 font-bold mb-2"
                >
                  AuthorCode
                </label>
                <input
                  required
                  type="text"
                  id="AuthorCode"
                  name="AuthorCode"
                  title="3 Letter code to identify the author "
                  value={authorData.AuthorCode.toUpperCase()}
                  onChange={handleChangeAuthorForm}
                  onKeyUp={(event) => {
                    setCodeError(checkCode(event.target.value,3));
                  }}
                  className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                />
                {codeError ? (
                  <span className="text-red-600"> {codeError}</span>
                ) : null}
              </div>

              <div className="flex flex-row    mx-auto bg-white">
                <div className="w-1/2">
                  <div className="mb-4 px-3">
                    <label
                      htmlFor="DOB"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Birth Date
                    </label>
                    <input
                      required
                      type="date"
                      id="DOB"
                      name="DOB"
                      title="Date of birth of Author"
                      value={authorData.DOB}
                      onChange={handleChangeAuthorForm}
                      onKeyUp={(event) =>  setDateError(checkDate(event.target.value)) }
                      className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                    />
                    {dateError ? (
                      <span className="text-red-600"> {codeError}</span>
                    ) : null}
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="mb-4 px-3">
                    <label
                      htmlFor="DOD"
                      title=" Date of death. Omit this field if author is still alive"
                      className="block text-gray-700 font-bold mb-2  "
                    >
                      Death Date
                    </label>

                    <input
                      type="date"
                      id="DOD"
                      name="DOD"
                      value={authorData.DOD}
                      onChange={handleChangeAuthorForm}
                      title=" Date of death. Omit this field if author is still alive"
                      className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                    />
                  </div>
                </div>
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

              <div className="mb-4">
                <label
                  htmlFor="Nationality"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Nationality
                </label>
                <input
                  required
                  type="text"
                  id="Nationality"
                  name="Nationality"
                  title="This field is required"
                  value={authorData.Nationality}
                  onChange={handleChangeAuthorForm}
                  onKeyUp={event => setNatError(checkNationality(event.target.value))}
                  className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                />
                 {natError ? (
                      <span className="text-red-600"> {natError}</span>
                    ) : null}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="Biography"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Biography
                </label>
                <textarea
                  required
                  id="Biography"
                  name="Biography"
                  rows="6"
                  title="This field is required"
                  value={authorData.Biography}
                  onChange={handleChangeAuthorForm}
                  onKeyUp={event => setBioError(checkTextarea(event.target.value))}
                  className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                />
                 {bioError ? (
                      <span className="text-red-600"> {bioError}</span>
                    ) : null}
              </div>

              {error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
                  {error}
                </div>
              ) : null}
              <div>
                <button
                  type="submit"
                  className="bg-custom-blue hover:bg-gray-900  text-white rounded-md px-4 py-2 m-3 "
                >
                  {" "}
                  &nbsp; Add Author &nbsp;{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddAuthor
