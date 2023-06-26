import React, { useState } from 'react'
import { checkName,checkCode,checkTextarea } from '../../validation/FormValidation';
import { addGenre } from '../../services/assistantServiceHelpers';
import spinner from "../../spinner/Spinner.gif";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddGenre() {
  const Navigate = useNavigate()
const [genreData,setGenreData]= useState({
    genreCode:'',
    genreName : '',
    description : '',
})
const [nameError, setNameError] = useState('');
const [codeError,setCodeError] = useState('');
const [descError,setDescError] = useState('');
const[error,setError] = useState('')
const [isLoading,setIsloading] = useState(false);
const handleChangeAddGenre = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setGenreData((values) => ({ ...values, [name]: value }));

}
const handleSubmitGenre = (e) =>{
    e.preventDefault();

if (nameError ===null  && codeError === null  && descError=== null) {
setIsloading(true)
addGenre(genreData)
.then( res => {
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
setGenreData({
  genreCode:'',
  genreName : '',
  description : '',
});
setError("");
}
})
.catch(err =>{
console.log(err);
setError(err.response.data.message)
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
.finally(()=>{
setIsloading(false)
})
}
else setError(
"Form contains invalid details . Try again after correcting them "
)
}

return (
<>
  
  <div className="max-w-xl mx-auto bg-white rounded-xl mt-5 px-5 shadow-md">
    <div className="container m-auto my-4  ">
      <h1 className="text-center text-3xl font-semibold  py-4  text-custom-blue">
        ADD GENRE
      </h1>
      <div className=" pb-5">
         <form onSubmit={handleSubmitGenre}>

      <div className="mb-4">
        <label
          htmlFor="genreName"
          className="block text-gray-700 font-bold mb-2"
        >
          Genre Name
        </label>
        <input
          type="text"
          id="genreName"
          name="genreName"
          value={genreData.genreName}
          onChange={handleChangeAddGenre}
          onKeyUp={(event) => setNameError(checkName(event.target.value))}
          className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
        />

        {nameError ? (
          <span className="text-red-600"> {nameError}</span>
        ) : null}
      </div>
      <div className="mb-4">
        <label
          htmlFor="genreCode"
          className="block text-gray-700 font-bold mb-2"
        >
          Genre Code
        </label>
        <input
          type="text"
          id="genreCode"
          name="genreCode"
          value={genreData.genreCode.toUpperCase()}
          onChange={handleChangeAddGenre}
          onKeyUp={event => setCodeError(checkCode(event.target.value,2))}
          className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
        />
         {codeError ? (
          <span className="text-red-600"> {codeError}</span>
        ) : null}
      </div>
       {/* /////////////////////////////////////  spinner   //////////////////////////////////////////////// */}
       {isLoading && (
            <div className="relative">
              {" "}
              <div className="absolute  inset-0  flex justify-center items-center z-50">
                <div className=" rounded-full h-20 w-20  ">
                  <img src={spinner} className="w-50 h-auto" alt='loading'/>
                </div>
              </div>{" "}
            </div>
          )}
          {/* /////////////////////////////////////  spinner end   //////////////////////////////////////////////// */}

     
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description
        </label>
        <textarea
          className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
          name="description"
          id="description"
          rows="6"
          value={genreData.description}
          onChange={handleChangeAddGenre}
          onKeyUp={event => setDescError(checkTextarea(event.target.value))}
        ></textarea>
        {descError ? (
          <span className="text-red-600"> {descError}</span>
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
          className="bg-custom-blue text-white rounded-md px-4 py-2 m-3 "
        >
          {" "}
          &nbsp; Add Genre &nbsp;{" "}
        </button>
      </div>
    </form>
  </div>
</div>
</div>
</>
)
}

export default AddGenre
