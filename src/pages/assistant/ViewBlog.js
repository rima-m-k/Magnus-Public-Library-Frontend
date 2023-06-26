import React, { useState, useEffect } from "react";
import { getBlogData } from "../../services/assistantServiceHelpers";
import DataTable from "react-data-table-component";
import Spinner from "../../components/Spinner";

function ViewBlog() {
  const [isLoasing, setIsLoading] = useState(false);

  const [blogData, setBlogData] = useState([]);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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
      name: "title",
      selector: (row) => `${row.title}`,
      wrap: true,

      sortable: true,
      width: "200px",
      style: { fontSize: "16px" },
    },

    {
      name: "bannerImage",
      selector: (row) => row.bannerImage,
      width: "150px",
      style: { fontSize: "15px" },
    },

    {
      name: "content",
      selector: (row) => `${row.content}`,
      wrap: true,

      sortable: true,
      width: "150px",
      style: { fontSize: "16px" },
    },
    {
      name: "viewCount",
      selector: (row) => row.viewCount,
      sortable: true,
      wrap: true,
      width: "200px",
      style: { fontSize: "15px" },
    },
    {
      name: "PublishDate",
      selector: (row) => row.PublishDate,
      width: "700px",
      wrap: true,
      allowOverflow: false,
      style: { fontSize: "14px", padding: "3px" },
    },
    {
        name: "authorType",
        selector: (row) => row.authorType,
        width: "700px",
        wrap: true,
        allowOverflow: false,
        style: { fontSize: "14px", padding: "3px" },
      },

    // {
    //   name:"Actions",
    //   cell: row => (
    //     <button
    //     className="bg-blue-900 p-2 hover:bg-blue-800 text-white rounded"
    //     >Edit</button>
    //   )
    // } problem with layout
  ];
  return (
    <>
      {!isLoasing ? (
        // <h2 className="text-lg font-medium leading-6 text-gray-900">Author List</h2>
        // <div className="mt-4 overflow-x-auto">

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
          // fixedHeaderScrollHeight='450px'
        />
      ) : (
        // </div>
        <Spinner isUser = {false} className="my-auto"/>
      )}
    </>
  );
}

export default ViewBlog;
