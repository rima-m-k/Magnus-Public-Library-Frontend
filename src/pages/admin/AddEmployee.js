import React, { useState, useEffect } from "react";
import { addEmployee, fetchStaffID } from "../../services/adminServiceHelpers";
import Spinner from "../../components/Spinner";

function AddEmployee() {
  const [isLoasing,setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    designation: '',
    newDesignation:'',
    newDesignationID:''
  })
  const [staffID, setStafFID] = useState({})
  const [error,setError] = useState('')
  useEffect(() => {
    fetchStaffID()
      .then(res => setStafFID(res.data))
  }, [])
  function handleFormData(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    addEmployee(formData)
    .then( res =>{
       console.log(res)
       setFormData({
      firstName: '',
      lastName: '',
      email: '',
      designation: '',
      newDesignation:'',
      newDesignationID:''
      });})
    .catch(error => {
      console.log(error.response.data.message)
      setError(error.response.data.message)
    })
    .finally(() => setIsLoading(false))

  }
  console.log(formData)
  let keys = Object.keys(staffID);
//problem with layout
  return (
    <>
     
   
      
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-gray-700 font-bold mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormData}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-gray-700 font-bold mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormData}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            {isLoasing ?<Spinner isUser = {false}/> :null }
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
                value={formData.email.toLowerCase()}
                onChange={handleFormData}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="designation"
                className="block text-gray-700 font-bold mb-2"
              >
                Designation
              </label>
              <div className="mb-4">

                <select 
                name="designation" 
                id="designation " 
                value={formData.designation}
                onChange={handleFormData}
                className="shadow  border rounded  w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"> 
                <option>options</option>
                  {keys.map(key => (
                    <option key={key} value={staffID[key]._id}  > 
                      {staffID[key].designation} 
                    </option> 
                      ))} 
                    <option value={'addDesignation'}>Add new designation</option>
                </select> 
              </div>
            </div>
            <div className="mb-3">
           
            {formData.designation==='addDesignation' ? 
            <>
            <label htmlFor="newDesignation" className="block text-gray-700 font-bold mb-2" >
                Designation Name
              </label>
              <input type='text' 
              name="newDesignation" 
              value={formData.newDesignation}
              onChange={handleFormData}
             
              className="shadow  border rounded  w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

<label htmlFor="newDesignationID" className="block text-gray-700 font-bold mb-2" >
                Designation ID
              </label>
              <input type='text' 
              name="newDesignationID" 
              value={formData.newDesignationID.toUpperCase()}
              onChange={handleFormData}
              className="shadow  border rounded  w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />


              </>:null}
            </div>



          {error ? <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">{error}</div> : null}
            <div className="flex items-center justify-between">

              <button
                type="submit"
                className="bg-custom-blue  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div >
   
      
    

 
    </>

  )
}

export default AddEmployee;
