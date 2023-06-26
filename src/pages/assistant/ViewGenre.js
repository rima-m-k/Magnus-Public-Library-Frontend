


import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getGenre } from "../../services/assistantServiceHelpers";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { checkCode, checkName, checkTextarea } from "../../validation/FormValidation";
import Spinner from "../../components/Spinner";

function ViewGenre() {
  const Navigate = useNavigate()

  const [deleteModal, toggleDeleteModal] = useState(false);
  const [modal, toggleModal] = useState(false);

  const [genres, setGenres] = useState([]);
  const [error, setError] = useState("");
  const [search,setSearch] = useState("")
  const [filteredData,setFilteredData] = useState([])

  const [singleGenre, setSingleGenre] = useState({});
  const[editGenreData,setEditGenreData]=useState({})
  const [nameError, setNameError] = useState('');
const [codeError,setCodeError] = useState('');
const [descError,setDescError] = useState('');
const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    getGenre()
      .then((res) => {
        console.log(res);
        setGenres(res.data);
        setFilteredData(res.data)
      })
      .catch((err) => {
        console.log(err);
        setError(err.response);
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
      });
  }, []);
  useEffect(() => {
const result = genres.filter(genre => genre.genreName.toLowerCase().match(search.toLowerCase()))
setFilteredData(result)

  },[search])

  function handleSubmitGenre(e) {
    e.preventDefault();

  }

  const handleChangeAddGenre = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEditGenreData((values) => ({ ...values, [name]: value }));
  };


  function Edit(id){
    toggleModal(true);
    document.body.style.overflow = "hidden";
    console.log(id);
    const genre = genres.filter((genre) => genre._id === id);
    setSingleGenre(genre);
    console.log("ss", singleGenre[0]);
  }
  function Delete(ID) {
    document.body.style.overflow = "hidden";
  
    console.log(ID);
    toggleDeleteModal(true);
  }

  const columns = [
    {
      name: "Genre",
      selector: (row) => row.genreName,
      sortable: true,
      width:'200px',
     style:{  fontSize:'15px',
     backgroundColor: '#fbfbfb'
    }


    },
    
    {
      name: "Code",
      selector: (row) => row.genreCode,
      width:'150px',
      style:{ fontWeight:'bold' , fontSize:'16px',
      backgroundColor: '#fbfbfb'
    }

      
    },
    {
      name: "Description",
      selector: (row) => row.description,
      width:'800px',
     wrap:true,
     allowOverflow:false,
     style:{  fontSize:'14px' ,
     padding:'3px',
     backgroundColor: '#fbfbfb'
    }

      
    },
    {
    name:"Actions",
    style:{  fontSize:'14px' , 
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
            title="Genre Catalogue"
            columns={columns}
            data={filteredData}
            pagination
            fixedHeader
            theme="solarized"
            highlightOnHover
            subHeader
            responsive
            actions={
              <button className="px-2 bg-blue-900 text-white rounded-md hover:bg-blue-800">
                EXPORT
              </button>
            }
            subHeaderComponent={
              <input
                type="search"
                placeholder="Search Here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-blue-800 bg-  gray-100 border-b-2 block w-25 rounded py-2 px-3 mb-1"
                />
              }
             
          />
          </div>

          
{modal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto pt-8 mt-4 rounded-sm">
          <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-10 md:w-2/4 mx-auto max-h-screen overflow-y-auto">
             {singleGenre.map((genres) => (
              <form onSubmit={handleSubmitGenre}
              key={genres._id}>

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
                  value={genres.genreName}
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
                  value={genres.genreCode.toUpperCase()}
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
                  <Spinner isUser={false} className="my-auto" />
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
                  value={genres.description}
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

export default ViewGenre;
