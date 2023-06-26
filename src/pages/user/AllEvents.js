import React, { useEffect, useState } from "react";
import ViewEvent from "./ViewEvent";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../services/userServiceHelpers";
const AllEvents = () => {
  const  options = { day: 'numeric', month: 'long', year: 'numeric' };
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("");
  
  const filterEvents = (event) => {
    if (filter === "") {
      return true;
    } else if (filter === "Upcoming" && event.status === "Upcoming") {
      return true;
    } else if (filter === "Now" && event.status === "Now") {
      return true;
    } else if (filter === "Ended" && event.status === "Ended") {
      return true;
    } else if (event.name.toLowerCase().includes(filter.toLowerCase())) {
      return true;
    }else if (event.date.includes(filter)) {
      return true;
    }  else {
      return false;
    }
  };
  
  useEffect(()=>{
    fetchEvents()
    .then(res =>{
      setEvents(res.data)
    })
  },[])

  
const filteredEvents = events.filter(filterEvents);
const sortedFilteredEvents = filteredEvents
    .sort((a, b) => {
      if (a.status === "Now") {
        return -1; // "Now" events should appear first
      } else if (a.status === "Upcoming" && b.status !== "Now") {
        return -1; // "Upcoming" events should appear next
      } else {
        return 1; // All other events appear last
      }
    });
  return (
    <>
    <div className="md:w-11/12 mx-auto py-8">
  <div className="flex items-center justify-between mb-4 flex-wrap">
    <h1 className="text-3xl font-bold">Events</h1>
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search events"
        className="px-4 py-2 mr-4 text-gray-800 bg-gray-100 rounded-md"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <select
        className="px-4 py-2 text-gray-800 bg-gray-100 rounded-md"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="Upcoming">Upcoming</option>
        <option value="Now">Now</option>
        <option value="Ended">Ended</option>
        <option value="">All</option>
        {/* <option value="2023">2023</option> */}
      </select>
    </div>
  </div>
  <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
    {sortedFilteredEvents.map((event) => (
      <div key={event._id} className="flex flex-col overflow-hidden rounded-lg shadow-md">
        <div className="relative aspect-w-3 aspect-h-2">
          <img
            className="object-cover w-full h-full"
            src={`https://res.cloudinary.com/dtbd0liga/image/upload/v1683611856/${event.banner}`}
            alt={event.name}
          />
          <div className="absolute top-2 right-2 px-2 py-1 bg-black">
            <span className="text-yellow-400">{event.status}</span>
          </div>
        </div>
        <div className="px-4 py-3 bg-white">
          <h2 className="text-xl">{event.name}</h2>
          <p className="font-bold">{new Date(event.date).toLocaleDateString('en-US', options)}</p>
          <p className="mt-2 truncate">{event.description}</p>
          <Link to={`/viewEvent/${event._id}`} element={<ViewEvent />}>
            <button className="px-4 py-2 mt-4 font-semibold text-white bg-green-900 rounded-md hover:bg-green-800 focus:bg-green-700">
              MORE INFORMATION
            </button>
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>
        </>
  );
};
export default AllEvents;


