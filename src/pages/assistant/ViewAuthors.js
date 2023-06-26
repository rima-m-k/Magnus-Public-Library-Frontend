
import React, { useEffect, useState } from 'react'
import { getAuthorData } from '../../services/assistantServiceHelpers';
import DataTable from 'react-data-table-component';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { checkName, checkCode, checkDate, checkNationality, checkTextarea } from '../../validation/FormValidation';
import Spinner from '../../components/Spinner';

function ViewAuthors() {
  const Navigate = useNavigate()

  const [authorData, setAuthorData] = useState([]);
  const [error, setError] = useState("");
  const [modal, toggleModal] = useState(false);
  const [deleteModal, toggleDeleteModal] = useState(false);
  const [singleAuthor, setSingleAuthor] = useState({});


  const [search, setSearch] = useState("")
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    getAuthorData()
      .then((res) => {
        console.log(res);
        setAuthorData(res.data);
        setFilteredData(res.data)
      })
      .catch((err) => {
        console.log(err);
        setError(err.response);
        if (err.response.data.error === "Blocked By Admin") {
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
      });
  }, []);




  console.log(error)
  useEffect(() => {
    const result = authorData.filter(author => author.AuthorName.toLowerCase().match(search.toLowerCase()))
    setFilteredData(result)
  }, [search])
  // 
  const [editAuthorData, setEditAuthorData] = useState({
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

  function handleSubmitAuthorForm(e) {
    e.preventDefault();
 
  }

  const handleChangeAuthorForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditAuthorData((values) => ({ ...values, [name]: value }));
  };

  function Edit(id) {
    toggleModal(true);
    document.body.style.overflow = "hidden";
    console.log(id);
    const author = authorData.filter((author) => author._id === id);
    setSingleAuthor(author);
    console.log("ss", singleAuthor[0]);
  }
  function Delete(ID) {
    document.body.style.overflow = "hidden";

    console.log(ID);
    toggleDeleteModal(true);
  }
  const columns = [
    {
      name: "Name",
      selector: (row) => `${row.AuthorName}`,
      wrap: true,

      sortable: true,
      width: '150px',
      style: {
        fontSize: '16px',
        backgroundColor: '#fbfbfb'
        // border: '1px solid #ccc',
      },
    },

    {
      name: "Code",
      selector: (row) => row.AuthorCode,
      width: '100px',
      style: {
        fontSize: '15px',
        backgroundColor: '#fbfbfb'
      }

    },

    {
      name: "Birth/Death",
      selector: (row) => `${row.DateOfBirth} - ${row.DateOfDeath}`,
      wrap: true,

      sortable: true,
      width: '150px',
      style: {
        fontSize: '16px',
        backgroundColor: '#fbfbfb'
      }
    },
    {
      name: "Nationality",
      selector: (row) => row.Nationality,
      sortable: true,
      wrap: true,
      width: '150px',
      style: {
        fontSize: '15px',
        backgroundColor: '#fbfbfb'
      }


    },
    {
      name: "Biography",
      selector: (row) => row.Biography,
      width: '600px',
      wrap: true,
      allowOverflow: false,
      style: {
        fontSize: '14px',
        padding: '3px',
        backgroundColor: '#fbfbfb'
      }


    },
    {
      name: "Actions",
      style: {
        fontSize: '14px',
        backgroundColor: '#fbfbfb'
      },
      cell: row => (
        <>

          <button
            className="bg-blue-900 p-2 m-1 hover:bg-blue-800 text-white rounded"
            onClick={() => Edit(row._id)}
          >Edit</button>

          <button
            className="bg-red-700 p-2 hover:bg-red-800 text-white rounded"
            onClick={() => Delete(row._id)}
          >Delete</button>
        </>
      )
    }
  ];
  return (
    <>

      <div className="m-4 p-4 border border-gray-500  ">

        <DataTable
          title="Author Catalogue"
          columns={columns}
          data={filteredData}
          pagination
          fixedHeader
          highlightOnHover
          striped
          subHeader
          responsive
          theme='default'

          subHeaderComponent={
            <input
              type="search"
              placeholder="Search Here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-blue-800 bg-  gray-100 border-b-2 block w-25 rounded py-2 px-3 mb-1"
            />
          }
          actions={
            <button className="px-2 bg-blue-900 text-white rounded-md hover:bg-blue-800">
              EXPORT
            </button>
          }

        />



      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto pt-8 mt-4 rounded-sm">
          <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-10 md:w-2/4 mx-auto max-h-screen overflow-y-auto">
            {singleAuthor.map((author) => (



              <form
                onSubmit={handleSubmitAuthorForm}
                key={author._id}
              >
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
                    value={author.AuthorName}
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
                    value={author.AuthorCode.toUpperCase()}
                    onChange={handleChangeAuthorForm}
                    onKeyUp={(event) => {
                      setCodeError(checkCode(event.target.value, 3));
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
                        value={author.DateOfBirth
                        }
                        onChange={handleChangeAuthorForm}
                        onKeyUp={(event) => setDateError(checkDate(event.target.value))}
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
                        value={author.DateOfDeath                        }
                        onChange={handleChangeAuthorForm}
                        title=" Date of death. Omit this field if author is still alive"
                        className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                {/* /////////////////////////////////////  spinner   //////////////////////////////////////////////// */}
                {isLoading && (
                  <Spinner isUser={false} className="my-auto" />
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
                    value={author.Nationality}
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
                    value={author.Biography}
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
                <div className="flex justify-end">
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
            ))}

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

export default ViewAuthors
