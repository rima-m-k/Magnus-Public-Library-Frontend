import React, { useEffect, useState } from 'react'
import { getadminProfile } from '../../services/adminServiceHelpers';
import Spinner from "../../components/Spinner";
import defaultProfile from "../../images/Default_pfp.png"
import { FiEdit } from 'react-icons/fi';

function Profile() {
  const [isLoasing,setIsLoading] = useState(false)

const [staffData,setStaffData ] = useState([])
  const options={ day: 'numeric' ,  month: 'long' , year: 'numeric' };
  useEffect(() => {
    getadminProfile()
      .then((res) => { 
        console.log(res)
        setStaffData(res.data)

      })
      .catch( err =>{
          console.log(err)
          
      });
    }, []);
    console.log(staffData)
  return (

    <div className="bg-gray-200">
      {staffData?
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <div className="bg-white shadow rounded-lg">
  <div className="grid grid-cols-1 md:grid-cols-2 items-center px-6 py-8">
  <div className="relative h-48 w-48">
  <img className="h-full w-full rounded-full" src={defaultProfile} alt="User profile" />
  <div className="absolute top-1 right-5">
    <FiEdit size={25} color='black'/>
  </div>
</div>

    <div className="mt-8 md:mt-0 md:ml-6">
      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{staffData.firstName} {staffData.lastName}</div>
      {/* <h1 className="text-2xl font-semibold text-gray-900">Profile Information</h1> */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
        <div>
          <p className="text-gray-600 mb-1">Email:</p>
          <p className="text-gray-900 font-semibold">{staffData.email}</p>
        </div>
        
        <div>
            <p className="text-gray-600 mb-1">Designation : </p>
          <p className="text-gray-900 font-semibold">{staffData?.designationID?.designation}</p>
        </div>
        <div>
          <p className="text-gray-600 mb-1">Designation ID : </p>
          <p className="text-gray-900 font-semibold">{staffData?.designationID?.designationId}</p>
        </div>
       
      </div>
    </div>
  </div>
</div>

    </div>
    :<div>unable to display profile</div>}
  </div>
  )
}

export default Profile
