import React, { useEffect, useState } from "react";
import { addEvent, fetchVenue } from "../../services/adminServiceHelpers";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

function AddEvent() {
  const [isLoasing,setIsLoading] = useState(false)

  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    host: "Admin",
    description: "",
    fees: "",
    venue: "",
    photo:""
  });
  const [venueData, setVenueData] = useState()
  const [error, setError] = useState("");
  const [file, setFile] = useState();

  useEffect(() => {
    fetchVenue()
      .then(res => setVenueData(res.data))
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    const data = new FormData();
    data.append("file", file);
    data.append("name", eventData.name);
    data.append("date", eventData.date);
    data.append("startTime", eventData.startTime);
    data.append("endTime", eventData.endTime);
    data.append("host", eventData.host);
    data.append("description", eventData.description);
    data.append("fees", eventData.fees);
    data.append("venue", eventData.venue);
    setError('')
    addEvent(data)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEventData({  name: "", date: "", startTime: "", endTime: "", host: "Admin", description: "", fees: "", venue: "", photo:""})
      })
      .catch((err) => {
        console.log(err, "ss")
        if (err.response.status === 409 || err.response.status === 500) {
          // console.log(err.response.data.message)
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });        }
      })
      .finally(() => setIsLoading(false))

  };
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
    setEventData((values) => ({ ...values, [name]: value }));

  }
  console.log(eventData);
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="text-2xl font-bold mb-6">Add Event</h2>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Event Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={eventData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="venue"
                className="block text-gray-700 font-bold mb-2"
              >
                Venue
              </label>
              <select
                id="venue"
                name="venue"
                className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
                value={eventData.venue}
              >
                <option value="">Select a venue</option>.

                {venueData?.[0]?.venue.map((venue) => (
                  <option key={venue.name} value={venue.name}>{venue.name} ({venue.capacity})</option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="date"
                className="block text-gray-700 font-bold mb-2"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter event name"
                value={eventData.date}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="startTime"
                className="block text-gray-700 font-bold mb-2"
              >
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter event Starting time"
                value={eventData.startTime}
                onChange={handleChange}
              /> 
            </div>
            <div className="mb-6">
              <label
                htmlFor="endTime"
                className="block text-gray-700 font-bold mb-2"
              >
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                step="1800"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter event name"
                value={eventData.endTime}
                onChange={handleChange}
              />
            </div>
            {isLoasing ?<Spinner isUser = {false} /> :null }
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
                value={eventData.photo}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="fees"
                className="block text-gray-700 font-bold mb-2"
              >
                Admission Fee
              </label>
              <input
                type="number"
                id="fees"
                name="fees"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={eventData.fees}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Event Description
              </label>

              <textarea
                className="shadow appearance-none border  w-full py-2 px-3 text-gray-700 rounded-md leading-tight focus:outline-none focus:shadow-outline"
                name="description"
                id="description"
                rows="6"
                value={eventData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            {error ? <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">{error}</div> : null}


            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
