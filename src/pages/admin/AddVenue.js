import React, { useState } from "react";
import { addVenue } from "../../services/adminServiceHelpers";
import Spinner from "../../components/Spinner";

function AddVenue() {
  const [isLoasing,setIsLoading] = useState(false)

  const [venueData, setVenueData] = useState({
    name: "",
    capacity:""
  });
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('')
    setIsLoading(true)
    addVenue(venueData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err,"ss")
        if(err.response.status === 409 || err.response.status === 500){
          console.log(err.response.data.message)
          setError(err.response.data.message)
        }
      })
      .finally(() => setIsLoading(false))

  };
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setVenueData((values) => ({ ...values, [name]: value }));
   
  }
  console.log(venueData);
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="text-2xl font-bold mb-6">Add Venue</h2>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Venue Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={venueData.name}
                onChange={handleChange}
              />
            </div>
            
            {isLoasing ?<Spinner  isUser = {false}/> :null }
          
            <div className="mb-6">
              <label
                htmlFor="capacity"
                className="block text-gray-700 font-bold mb-2"
              >
                Max Number of People
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={venueData.capacity}
                onChange={handleChange}
              />
            </div>
            
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add 
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddVenue;
