import React, { useState } from "react";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";
import { addBlog } from "../../services/adminServiceHelpers";
import Spinner from "../../components/Spinner";

const AddBlog = () => {
  const [isLoasing,setIsLoading] = useState(false)

  const [blogData, setBlogData] = useState({
    title: "",
    bannerImg: "",
    content: "",
  });
  const [file, setFile] = useState();
 
console.log(blogData)
  function handleFormData(e) {
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
    setBlogData((values) => ({ ...values, [name]: value }));
  }

  function handleContentChange(value) {
    setBlogData((values) => ({ ...values, content: value }));
  }
 

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    const data = new FormData();
    data.append("file", file);
    data.append("title", blogData.title);
    data.append("content", DOMPurify.sanitize(blogData.content));
    console.log(data)
    addBlog(data)
    .then(res =>{
      console.log(res)
    })
    .catch(err =>{
      console.log(err)
    })
    .finally(() => setIsLoading(false))

  }

  return (
    <>
      <div className="w-2/3 mx-auto">
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
            <label
              htmlFor="bannerImg"
              className="block text-gray-700 font-bold mb-2"
            ></label>
            <input
              type="file"
              id="bannerImg"
              name="bannerImg"
              value={blogData.bannerImg}
              onChange={handleFormData}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-white leading-tight focus:outline-none focus:shadow-outline"
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
            {isLoasing ?<Spinner isUser = {false} /> :null }
            <button className="bg-custom-blue text-white px-2 py-1 rounded-md mt-4 ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
