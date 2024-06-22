import React, { useEffect, useState } from 'react'
import { fetchSingleBlog } from '../../services/userServiceHelpers';
import { useParams } from 'react-router-dom';

function ViewBlog() {

  const { id } = useParams();

  const [blog, setBlog] = useState({});
  const options = { year: "numeric", month: "long", day: "numeric" };

  useEffect(() => {
    fetchSingleBlog(id).then((res) => {
      setBlog(res.data);
      console.log(res.data)
    });
  }, []);
  const parseHtmlContent = (htmlContent) => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(htmlContent, "text/html");
    return { __html: parsedHtml.body.innerHTML };
  };


  return (

    <div className="container mx-auto w-2/3  px-4 py-8">

      <h1 className="text-3xl font-bold m-6 ">{blog[0]?.title}</h1>
      <div className="  grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 mx-auto">
        <div className="">
          <img
            src={`https://res.cloudinary.com/dtbd0liga/image/upload/v1683611856/${blog[0]?.bannerImage}`}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="col-span-3 flex flex-col">
                  <p className="text-gray-700 mb-4">
                    {/* {blog[0]?.staffId?.firstName} {blog[0].staffId?.lastName} &nbsp;|{" "} */}
                  </p>
                  <p className="text-gray-700 mb-4">

                    {new Date(blog[0]?.PublishDate).toLocaleString("en-US", options)}
                  </p>
                  <p className="mb-4 mt-2  " dangerouslySetInnerHTML={parseHtmlContent(blog[0]?.content)}></p>
                </div>
      </div>
    </div>
  )
}

export default ViewBlog
