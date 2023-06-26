import React, { useState } from 'react'
import spinner from '../../spinner/Spinner.gif';
import { LibraryCard } from '../../services/userServiceHelpers';
import { useNavigate } from 'react-router-dom';

function LibraryCardApplication() {
 
    const Navigate = useNavigate('')

    const [formData,setFormData] = useState({
        address1:'',
        address2:'',
        city:'',
        state:'',
        pincode:'',
        photo:''
    })
    console.log(formData)
    const [error,setError] =useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [file, setFile] = useState();

    function handleChange (e){
        const name = e.target.name;
        const value = e.target.value;
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
        setFormData((values)=>({...values,[name]:value}));
        setError('')
    }
    console.log(file)
    function handleSubmit (e) {
        e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("address1", formData.address1);
    data.append("address2", formData.address2);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("pincode",formData.pincode)

        LibraryCard(data)
        .then(res => {
            console.log(res)
            Navigate('/profile')

        })
        .catch( err =>{
            console.log(err)
            setError(err.response.data.message)
        })

    }
  return (
    <>

     <div className="max-w-xl mx-auto bg-white rounded-xl mt-5 px-5 shadow-md">
          <div className="container m-auto my-4  ">
            <h1 className="text-center text-3xl font-semibold  py-4  text-custom-blue">
              Library Card Application Form
            </h1>
            <div className=" pb-5">
              <form onSubmit={handleSubmit}>
               

              <div className="mb-4">
                <label
                  htmlFor="address1"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="address1"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address2"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  value={formData.address2}
onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block text-gray-700 font-bold mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                />
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
                  htmlFor="state"
                  className="block text-gray-700 font-bold mb-2"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                />
              </div>
             
              <div className="mb-4">
                <label
                  htmlFor="pincode"
                  className="block text-gray-700 font-bold mb-2"
                >
                  PinCode
                </label>
                <input
                  type="number"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                />
              </div>
  
              <div className="mb-4">
                <label
                  htmlFor="photo"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  value={formData.photo}
                onChange={handleChange}
                  className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                />
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
                    &nbsp; Submit &nbsp;{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      
    </>
  )
}

export default LibraryCardApplication
