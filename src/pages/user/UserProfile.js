import React, { useEffect, useState } from 'react'
import { getUserProfile } from '../../services/userServiceHelpers'
import { Link, useNavigate } from 'react-router-dom';
import LibraryCardApplication from './LibraryCardApplication';
import defaultProfile from "../../images/Default_pfp.png"

function UserProfile() {
  let token = localStorage.getItem("currentUser")
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const Navigate = useNavigate()
  const [UserData, setUserData] = useState([])
  const [seconds, setSeconds] = useState(5);
  useEffect(() => {
    getUserProfile()
      .then((res) => {
        console.log(res)
        setUserData(res.data.user)

      })
      .catch(err => {
        console.log(err)
        // if(err.response.status===440){
        //   // setExpiredSessionMsg(err.response.data.message)
        //   setInterval(() => {
        //     setSeconds(seconds => seconds - 1);
        //   }, 1000)
        //   setTimeout(() => Navigate('/login'), 5000);
        // }
      });
  }, []);

  const src = UserData.profilePhoto
    ? `https://res.cloudinary.com/dtbd0liga/image/upload/v1683611856/${UserData.profilePhoto}`
    : defaultProfile;
  return (
    <>


      {/* <div className="fixed inset-0 z-50 flex justify-center items-center my-5">
          <div className="fixed inset-0 bg-gray-800 opacity-50 my-5"></div>
          <div className="bg-white rounded-lg p-6 z-10 animate-fade-in-down my-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 my-5">{expiredSessionMsg}</h2>
            <p className="text-gray-600 my-5 text-xl">You will be redirected to the login page in 
            <span className='text-blue-500'>  {seconds}   </span>
            seconds...</p>
          </div>
        </div> */}

      {!UserData.cardNumber ?
        <>
          <div className="bg-red-600 py-4 px-6 text-center ">
            <span className='font-bold text-2xl text-slate-200'> GET A LIBRARY CARD NOW</span>

            <Link to='/LibraryCardApplication' className='text-xl px-5 text-blue-500 underline' element={<LibraryCardApplication />} >
              click here to apply
            </Link>
          </div>
        </> : <> {null}
        </>
      }




      <div className="bg-gray-200 h-screen">
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-8 grid md:grid-cols-2 md:gap-6">
              <div className="md:flex-shrink-0 mx-auto">
                <div className="rounded-full overflow-hidden w-56 h-56 shadow-inner shadow-slate-800">
                  <img
                    className="w-full h-full object-cover"
                    src={src}
                    alt="User profile"
                  />
                </div>
              </div>

              <div className="mt-8 md:mt-0">
                <div className="uppercase tracking-wide text-2xl font-semibold  text-indigo-500 ">{UserData.name}</div>

                <div className="mt-6 grid grid-cols-1 gap-6">
                  <div>
                    <p className="text-gray-600 mb-1">Email:</p>
                    <p className="text-gray-900 font-semibold px-2">{UserData.email}   </p>
                  </div>
                  {UserData.cardNumber &&
                    <>
                      <div>
                        <p className="text-gray-600 mb-1">LibraryCard Number:</p>
                        <p className="text-gray-900 font-semibold px-2 ">{UserData.cardNumber}</p>
                      </div>

                      <div>
                        <p className="text-gray-600 mb-1">Card Issued On:</p>
                        <p className="text-gray-900 font-semibold px-2 ">{new Date(UserData?.issuedOn).toLocaleDateString('en-US', options)}</p>
                      </div>

                      <div>
                        <p className="text-gray-600 mb-1">Address:</p>
                        <p className="text-gray-900 font-semibold px-2 ">{UserData?.address[0]?.address1}</p>
                        <p className="text-gray-900 font-semibold px-2 ">{UserData?.address[0]?.address2},{UserData?.address[0]?.city}</p>
                        <p className="text-gray-900 font-semibold px-2 ">{UserData?.address[0]?.state},{" "}{UserData?.address[0]?.pincode}</p>
                        <p className="text-gray-900 font-semibold px-2"></p>
                      </div>
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default UserProfile
//,,,address,,issuedon