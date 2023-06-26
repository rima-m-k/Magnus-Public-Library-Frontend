import React, { useState, useEffect } from "react";
import { getEventData } from "../../services/adminServiceHelpers";
import DataTable from "react-data-table-component";
import Spinner from "../../components/Spinner";

function ShowAuthors() {
  const [isLoasing, setIsLoading] = useState(false);
  const [modal, toggleModal] = useState(false);
  const [deleteModal, toggleDeleteModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);


  const [eventData, setEventData] = useState([]);
  const [singleEvent, setSingleEvent] = useState([]);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const options = { year: "numeric", month: "long", day: "numeric" };

  useEffect(() => {
    setIsLoading(true);
    getEventData()
      .then((res) => {
        console.log(res);
        setEventData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response);
      })
      .finally(() => setIsLoading(false));
  }, []);
  useEffect(() => {
    const result = eventData.filter((event) =>
      event.name.toLowerCase().match(search.toLowerCase())
    );
    setFilteredData(result);
  }, [search]);
  //
  function handleSubmit(e) {

  }
  function handleChange(e) {
    setSelectedFile(e.target.files[0]);

  }

  function Edit(id) {
    toggleModal(true);
    document.body.style.overflow = "hidden";
    console.log(id);
    const event = eventData.filter((event) => event._id === id);
    setSingleEvent(event);
  }
  function Delete(ID) {
    document.body.style.overflow = "hidden";

    console.log(ID);
    toggleDeleteModal(true);
  }

  const columns = [
    {
      name: "Banner",
      selector: (row) => (
        <>
          <div className="absolute top-2 left-2 px-1  bg-black">
            <span className="text-yellow-400 text-xs">{row.status}</span>
          </div>
          <img
            src={`https://res.cloudinary.com/dtbd0liga/image/upload/v1683611856/${row.banner}`}
            className="w-full h-full object-contain"
          />
        </>
      ),
      width: "140px",
      style: {
        fontSize: "15px",
        padding: '10px'
      },
    },
    {
      name: "Name",
      selector: (row) => `${row.name}`,
      wrap: true,

      sortable: true,
      width: "200px",
      style: { fontSize: "16px", padding: '2px', },
    },

    {
      name: "Date",
      selector: (row) => `${new Date(row.date).toLocaleString("en-US", options)}`,
      width: "125px",
      style: { fontSize: "15px", },
    },

    {
      name: "Time",
      selector: (row) => `${row.startTime} - ${row.endTime}`,
      wrap: true,

      sortable: true,
      width: "125px",
      style: { fontSize: "16px" },
    },
    {
      name: "fees",
      selector: (row) => row.fees,
      sortable: true,
      wrap: true,
      width: "90px",
      style: { fontSize: "15px" },
    },
    {
      name: "seat ",
      selector: (row) => `${row.availableSeat}/${row.totalSeat}`,
      sortable: true,
      wrap: true,
      width: "80px",
      style: { fontSize: "15px" },
    },
    {
      name: "Desctiption",
      cell: (row) => <p className="truncate">{row.description}</p>,
      width: "290px",
      wrap: true,
      allowOverflow: false,
      style: { fontSize: "14px", padding: "3px" },
    },
    {
      name: "Actions",
      cell: row => (
        <>
          <button
            className="bg-blue-900 p-2 m-1 hover:bg-blue-800 text-white rounded min-w-fit"
            onClick={() => Edit(row._id)}
          >Edit</button>

          <button
            className="bg-red-700 p-2 hover:bg-red-800 text-white rounded min-w-fit"
            onClick={() => Delete(row._id)}
          >Delete</button>

          <button
            onClick={() => Delete(row._id)}
            className="bg-green-700 p-2 hover:bg-green-800 text-white rounded ml-1 min-w-fit"
          >
            Restore
          </button>
        </>
      )
    }
  ];
  return (
    <>
      {!isLoasing ? (
        // <h2 className="text-lg font-medium leading-6 text-gray-900">Author List</h2>
        <div className="mt-4 max-w-full">

          <DataTable
            title="Event"
            columns={columns}
            data={filteredData}
            pagination
            fixedHeader
            theme="solarized"
            highlightOnHover
            actions={
              <button className="px-2 bg-blue-900 text-white rounded-md hover:bg-blue-800">
                EXPORT
              </button>
            }
            subHeader
            subHeaderComponent={
              <input
                type="search"
                placeholder="Search Here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-blue-800 bg-  gray-100 border-b-2 block w-25 rounded py-2 px-3 mb-1"
              />
            }
            responsive
            // expandableRows
            // expandableRowsComponent={ExpandedComponent}
            // subHeaderAlign="left"
            // striped
            // dense
            // selectableRows
            // selectableRowsHighlight
            // noContextMenu ={true}
            // noTableHead={true}
            fixedHeaderScrollHeight='450px'
          />
        </div>
      ) : (
        // </div>
        <Spinner isUser={false} className="my-auto" />
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto pt-8 mt-4 rounded-sm">
          <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-10 md:w-2/4 mx-auto max-h-screen overflow-y-auto">
            {
              singleEvent.map((event) => (

                <form
                  onSubmit={handleSubmit}
                  className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
                  key={event._id}
                >
                  <div className="mb-6">

                  <img
                    className=" mx-auto mb-4 max-w-xs -auto"
                    src={`https://res.cloudinary.com/dtbd0liga/image/upload/v1683611856/${event.banner}`}
                    alt="book_cover"
                  />
                  <label
                    htmlFor="bannerImg"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Edit Image
                  </label>
                  <input
                    type="file"
                    id="bannerImg"
                    name="bannerImg"
                    // value={event.banner}
                    onChange={handleChange}
                    className=" appearance-none  rounded w-full py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                  />
                  </div>
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
                      value={event.name}
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
                    // value={eventData.venue}
                    >
                      <option value="">Select a venue</option>.

                      {/* {venueData?.[0]?.venue.map((venue) => (
                  <option key={venue.name} value={venue.name}>{venue.name} ({venue.capacity})</option>
                ))} */}
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
                      value={event.date}
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
                      value={event.startTime}
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
                      value={event.endTime}
                      onChange={handleChange}
                    />
                  </div>
                  {isLoasing ? <Spinner isUser={false} /> : null}
                 

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
                      value={event.fees}
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
                      value={event.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  {error ? <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">{error}</div> : null}


                  <div className="flex justify-end my-3">
                    <button
                      className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => {
                        toggleModal(false);
                        document.body.style.overflow = "auto";
                      }}
                    >
                      save
                    </button>

                    <button
                      className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => {
                        toggleModal(false);
                        document.body.style.overflow = "auto";
                      }}
                    >
                      Cancel
                    </button>
                  </div>

                </form>

              ))
            }

          </div>
        </div>
      )}

      {deleteModal && (
        <>
          <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto  pt-8 mt-4 rounded-sm">
            <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
            <div className="bg-white rounded-lg p-6 z-10  md:w-1/4 mx-auto">
              <h2 className="block text-gray-900 font-bold mb-2 ">
                Confirm Delete
              </h2>
              <hr />
              Are you sure you want to delete
              <div className="flex justify-end mt-3">
                <button
                  className="ml-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => {
                    toggleDeleteModal(false);
                    document.body.style.overflow = "auto";
                  }}
                >
                  Cancel
                </button>
                <button
                  className="ml-4 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => {
                    // deltetBook();
                    toggleDeleteModal(false);
                    document.body.style.overflow = "auto";
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}

    </>
  );
}

export default ShowAuthors;
