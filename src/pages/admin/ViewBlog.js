import React, { useState, useEffect } from "react";
import { getBlogData } from "../../services/adminServiceHelpers";
import DataTable from "react-data-table-component";
import Spinner from "../../components/Spinner";
import ReactQuill from "react-quill";

import 'tailwindcss/tailwind.css';

function ViewBlog() {
  const [isLoasing, setIsLoading] = useState(false);
  const [modal, toggleModal] = useState(false);
  const [deleteModal, toggleDeleteModal] = useState(false);

  const [blogData, setBlogData] = useState([]);
  const [error, setError] = useState("");
  const [singleBlog, setSingleBlog] = useState("");

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const parseHtmlContent = (htmlContent) => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(htmlContent, "text/html");
    return { __html: parsedHtml.body.innerHTML };
  };

  const options = { year: "numeric", month: "long", day: "numeric" };
  function Edit(id) {
    toggleModal(true);
    document.body.style.overflow = "hidden";
    console.log(id);
    const blog = blogData.filter((blog) => blog._id === id);
    setSingleBlog(blog);
  }
  function Delete(ID) {
    document.body.style.overflow = "hidden";

    console.log(ID);
    toggleDeleteModal(true);
  }

  function handleFormData(e) {
    const name = e.target.name;
    const value = e.target.value;

  }
  function handleContentChange(value) {
    // setBlogData((values) => ({ ...values, content: value }));
  }
  function handleSubmit(e) {

  }
  useEffect(() => {
    setIsLoading(true);
    getBlogData()
      .then((res) => {
        console.log(res);
        setBlogData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response);
      })
      .finally(() => setIsLoading(false));
  }, []);
  useEffect(() => {
    const result = blogData.filter((blog) =>
      blog.AuthorName.toLowerCase().match(search.toLowerCase())
    );
    setFilteredData(result);
  }, [search]);
  //title:String,
  //   bannerImage : String,
  //   content :String,
  //   viewCount:Number,
  //   PublishDate:Date,
  //   authorType: 
  const columns = [


    {
      name: "bannerImage",
      selector: (row) => (
        <img
          src={`https://res.cloudinary.com/dtbd0liga/image/upload/v1683611856/${row.bannerImage}`}
          className="w-full h-full object-contain"
        />
      ),
      width: "140px",
      style: {
        fontSize: "15px",
        padding: '10px'
      },
    },
    {
      name: "title",
      selector: (row) => `${row.title}`,
      wrap: true,

      sortable: true,
      width: "200px",
      style: { fontSize: "16px" },
    },

    // {
    //   name: "viewCount",
    //   selector: (row) => row.viewCount,
    //   sortable: true,
    //   wrap: true,
    //   width: "200px",
    //   style: { fontSize: "15px" },
    // },
    {
      name: "PublishDate",
      selector: (row) => `${new Date(row.PublishDate).toLocaleString("en-US", options)}`,
      width: "150px",
      wrap: true,
      allowOverflow: false,
      style: { fontSize: "14px", padding: "3px" },
    },
    {
      name: "Author",
      selector: (row) => row.authorType,
      width: "110px",
      wrap: false,
      allowOverflow: false,
      style: {
        fontSize: "14px", padding: "3px",
        // background: '#cdcdcd'
      },
    },
    {
      name: "Content",
      cell: (row) => (
        <p className="mb-4 mt-2 truncate max-w-sm" dangerouslySetInnerHTML={parseHtmlContent(row.content)}></p>
      ),
      wrap: true,
      sortable: true,
      style: { fontSize: "16px" },
    },

    {
      name: "Actions",
      style: {
        fontSize: '14px',
      },
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
        // <div className="mt-4 overflow-x-auto">
        // <div className="max-w-screen-2xl">
        <DataTable
          title="Blog"
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
          fixedHeaderScrollHeight='500px'
        />
        // </div>
      ) : (
        // </div >
        <Spinner isUser={false} className="my-auto" />
      )
      }

      {modal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto pt-8 mt-4 rounded-sm">
          <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
          <div className="bg-white rounded-lg p-6 z-10 md:w-2/4 mx-auto max-h-screen overflow-y-auto">
            {singleBlog.map((blogData) => (


              <form className="flex flex-col flex-wrap" onSubmit={handleSubmit}>
                <div className="mb-6">
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
                    value={blogData.title}
                    onChange={handleFormData}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-6">
                  {/* 
           */}

                  <img
                    className=" mx-auto mb-4 max-w-xs -auto"
                    src={`https://res.cloudinary.com/dtbd0liga/image/upload/v1683611856/${blogData.bannerImage}`}
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
                    value={blogData.bannerImg}
                    onChange={handleFormData}
                    className=" appearance-none  rounded w-full py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="content"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Content
                  </label>

                  <ReactQuill
                    className=" bg-white"
                    theme="snow"
                    value={blogData.content}
                    onChange={handleContentChange}
                  />
                  {isLoasing ? <Spinner isUser={false} /> : null}
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

export default ViewBlog;
