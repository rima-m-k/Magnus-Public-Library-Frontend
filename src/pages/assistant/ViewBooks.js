import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { deltetBook, getBook } from "../../services/assistantServiceHelpers";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ViewBooks() {
  const Navigate = useNavigate();
  const [modal, toggleModal] = useState(false);
  const [deleteModal, toggleDeleteModal] = useState(false);

  const [singleBook, setSingleBook] = useState({});
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  function Edit(ID) {
    toggleModal(true);
    document.body.style.overflow = "hidden";
    console.log(ID);
    const book = books.filter((book) => book._id === ID);
    setSingleBook(book);
    console.log("ss", singleBook[0]);
  }

  function Delete(ID) {
    document.body.style.overflow = "hidden";

    console.log(ID);
    toggleDeleteModal(true);
  }
  useEffect(() => {
    getBook()
      .then((res) => {
        setBooks(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(error);
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
          Navigate("/admin/staffPortal");
        }
      });
  });
  useEffect(() => {
    const result = books.filter((book) =>
      book.title.toLowerCase().match(search.toLowerCase())
    );
    setFilteredData(result);
  }, [search, books]);

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <img
          className="w-16 m-1"
          src={`https://res.cloudinary.com/dtbd0liga/image/upload/v1683611856/${row.image}`}
          alt="User profile"
        />
      ),
      sortable: false,
      width: "100px",
      wrap: true,
      style: { fontSize: "15px" ,
      backgroundColor: '#fbfbfb'
    },
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      width: "200px",
      wrap: true,
      style: { fontSize: "15px",
      backgroundColor: '#fbfbfb'
    },
    },
    {
      name: "CallNumber",
      selector: (row) => row.callNumber,
      sortable: true,
      width: "200px",
      wrap: true,
      style: { fontSize: "15px" ,
      backgroundColor: '#fbfbfb'
    },
    },

    {
      name: "Author",
      selector: (row) => row.author.AuthorName,
      width: "150px",
      style: { fontSize: "15px",
      backgroundColor: '#fbfbfb',
    },
    },

    {
      name: "Genre",
      selector: (row) => row.genre.genreName,
      width: "150px",
      style: { fontSize: "15px" ,
      backgroundColor: '#fbfbfb'
    },
    },
    {
      name: "Publish data",
      width: "200px",
      wrap: true,
      allowOverflow: false,
      style: { fontSize: "15px",
      backgroundColor: '#fbfbfb'
    },
      selector: (row) => `${row.publisher} ${"\n"} (${row.publicationDate})`,
    },


    {
      name: "On Hold/Copy",
      selector: (row) => `/ ${row.copy}`,
      width: "150px",
      right: true,
      style: { fontSize: "15px" ,
      backgroundColor: '#fbfbfb'
    },
    },

    {
      name: "Actions",
      style :{
        backgroundColor: '#fbfbfb'

      },
      cell: (row) => (
        <>
          <button
            className="bg-blue-900 p-2 hover:bg-blue-800 text-white rounded mr-1"
            onClick={() => Edit(row._id)}
          >
            {" "}
            Edit
          </button>
          <button className="bg-blue-900 p-2 hover:bg-blue-800 text-white rounded mr-1">
            Reviews
          </button>
          <button
            onClick={() => Delete(row._id)}
            className="bg-red-700 p-2 hover:bg-red-800 text-white rounded mr-1"
          >
            Delete
          </button>
        </>
      ),
    },
  ];


  return (
    <>
          <div className="m-4 p-4 border border-gray-500  ">

      <DataTable
        title="Book Catalogue"
        columns={columns}
        data={filteredData}
        pagination
        fixedHeader
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
            {singleBook.map((book) => (
              <div key={book._id} className="modal-content">
                <h2 className="text-2xl font-bold my-4">{book.title}</h2>

                <img
                  className=" mx-auto mb-4 max-w-xs -auto"
                  src={`https://res.cloudinary.com/dtbd0liga/image/upload/v1683611856/${book.image}`}
                  alt="book_cover"
                />

                <form
                // onSubmit={handleSubmit}
                >
                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={book.title}
                      // onChange={handleChange}
                      // onKeyUp={(event) => {
                      // setTitleError(checkName(event.target.value));
                      // }}
                      className="w-full px-3 py-2 text-gray-900 border border-black rounded-md"
                    />
                    {/* {titleError ? (
                  <span className="text-red-600"> {titleError}</span>
                ) : null} */}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="author"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Author
                    </label>
                    <input
                      id="author"
                      name="author"
                      required
                      value={book.author.AuthorName}
                      disabled
                      // onChange={handleChange}
                      // onKeyUp={(event) => {
                      // setTitleError(checkName(event.target.value));
                      // }}
                      className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="callBackNum"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Call Number
                    </label>
                    <input
                      id="callBackNum"
                      name="callBackNum"
                      required
                      value={book.callNumber}
                      disabled
                      className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="genre"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Genre
                    </label>
                    <input
                      id="genre"
                      name="genre"
                      required
                      value={book.genre.gn}
                      disabled
                      className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="genre"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Publisher
                    </label>
                    <input
                      id="genre"
                      name="genre"
                      required
                      value={book.publisher}
                      className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="genre"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Publish Date
                    </label>
                    <input
                      id="genre"
                      name="genre"
                      required
                      value={book.publicationDate}
                      className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="copy"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Copy
                    </label>
                    <input
                      id="copy"
                      name="copy"
                      required
                      value={book.copy}
                      className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="synopsis"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Synopsis
                    </label>
                    <textarea
                      id="synopsis"
                      name="synopsis"
                      required
                      rows="6"
                      className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
                    >
                      {book.synopsis}
                    </textarea>
                  </div>
                </form>
              </div>
            ))}
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
                    deltetBook();
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

export default ViewBooks;
