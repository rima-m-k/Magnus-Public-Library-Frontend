import React, { useEffect, useState } from "react";
import { fetchBlog } from "../../services/userServiceHelpers";
import backgroundImage from "../../images/avalonlibrary-4.jpg";
import { Link } from "react-router-dom";
import ViewBlog from "./ViewBlog";
// import ReactPaginate from 'react-paginate';
function Community() {
  const [blogs, setBlogs] = useState([]);
  const [sortBy, setSortBy] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [blogsPerPage, setBlogsPerPage] = useState(5); // Define blogsPerPage



  useEffect(() => {
    fetchBlog().then((res) => {
      setBlogs(res.data);
    });
  }, []);

  const options = { year: "numeric", month: "long", day: "numeric" };

  const parseHtmlContent = (htmlContent) => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(htmlContent, "text/html");
    return { __html: parsedHtml.body.innerHTML };
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const sortedBlogs = blogs
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "asc") {
        return new Date(a.PublishDate) - new Date(b.PublishDate);
      } else {
        return new Date(b.PublishDate) - new Date(a.PublishDate);
      }
    });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedBlogs.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedBlogs.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="image w-full h-auto  relative  bg-black bg-opacity-50">
        <img
          src={backgroundImage}
          alt="Magnus public library"
          className="w-full h-full inset-0 object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-zinc-700 bg-opacity-50 blur-lg"></div>
        <div className="absolute inset-0   w-full mx-auto pt-4 mt-4">
          <div className=" py-4 mt-4 rounded-sm ">
            <h2 className="  text-white  blur-sm text-7xl text-center tracking-wider font-bold  py-4  my-6    ">
              Magnus Community
            </h2>
            <h2 className="text-white text-8xl text-center tracking-wider font-bold  py-4  my-6 w-full    ">
              Magnus Community
            </h2>
          </div>
        </div>
      </div>
      <div className="  w-3/4 mx-auto flex flex-col ">
        <div className="my-4 py-4  font-bold text-3xl">
          Community Blogs
        </div>
        <div className="flex flex-row justify-between my-4">
          <input
            type="text"
            placeholder="Search Blogs"
            className="p-2 rounded-md w-1/4 border-gray-300 border-2 focus:outline-none"
            value={searchTerm}
            onChange={handleSearch}
          />

          <select
            value={sortBy}
            onChange={handleSort}
            className="p-2 rounded-md border-gray-300 border-2 focus:outline-none"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>


        <div className="grid grid-cols-3 gap-5 ">
          {sortedBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage).map((blog) => (
            <div key={blog._id} className=" p-4 border border-gray-400 rounded">
             <Link to={`/communityBlogs/${blog._id}`}  element={<ViewBlog />} >   
              {/* <hr className="my-1 border-gray-700" /> */}
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                  {/* <Link to=`/communityBlogs/${blog._id}` element={<ViewBlog />} > */}
                  <img
                    src={`https://res.cloudinary.com/dtbd0liga/image/upload/v1683611856/${blog.bannerImage}`}
                    className="w-full h-full object-contain"
                  />
                  {/* </Link> */}
                </div>
                <div className="col-span-3 flex flex-col">
                  <p className="text-gray-700 mb-4">
                    {blog.staffId.firstName} {blog.staffId.lastName} &nbsp;|{" "}
                  </p>
                  <p className="text-gray-700 mb-4">

                    {new Date(blog.PublishDate).toLocaleString("en-US", options)}
                  </p>
                  {/* <p className="mb-4 mt-2 truncate md:text-clip" dangerouslySetInnerHTML={parseHtmlContent(blog.content)}></p> */}
                </div>
              </div>

              {/* <hr /> */}
              </Link>
            </div>
          ))}
        </div>


        {sortedBlogs.length > blogsPerPage &&
          <div className="mt-4 flex justify-center">
            <nav>
              <ul className="flex justify-between">
                {/* {renderPageNumbers} */}
              </ul>
            </nav>
          </div>
        }
      </div>

    </>
  )
}
export default Community;