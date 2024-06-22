import React, { useState } from "react";
import imgs from "../images/background.jpg";
import libraryImage from "../images/library.jpg";
import { searchItem } from "../services/userServiceHelpers";
import { MdKeyboardArrowRight } from "react-icons/md";

function BackgroundBanner() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchItem(searchTerm)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="bg-gray-300">
        <div className="image w-full h-auto relative bg-black bg-opacity-100">
          <img
            src={imgs}
            alt="Magnus public library"
            className="w-full h-full inset-0 object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-zinc-700 bg-opacity-50 blur-lg"></div>

          <div className="absolute inset-0 w-2/3 mx-auto pt-4 mt-4">
            <div className="bg-gray-300 bg-opacity-50 py-4 mt-4 rounded-sm">
              <h2 className="text-black text-4xl text-center tracking-wider font-bold py-4 px-10 my-6 w-full h-full">
                Welcome to Magnus Public Library
              </h2>
              <div className="pb-4 mb-8 mx-4 px-4">
                {/* <form className="flex px-5" onSubmit={handleSearch}>
                  <input
                    type="text"
                    name="searchTerm"
                    id="searchTerm"
                    value={searchTerm}
                    onChange={handleChange}
                    className="w-full h-full rounded-l-lg p-4"
                    placeholder="Search books, articles & more"
                  />

                  <button className="bg-custom-olive rounded-r-lg px-5 text-white">
                    SEARCH
                  </button>
                </form> */}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 border-slate-900 w-2/3 mx-auto relative bottom-40 md:hidden">
          <div className="flex flex-col">
            <h1 className="tracking-wider text-black text-3xl font-bold py-3 m-4 my-3">
              Visit Our Library
            </h1>
            <div className="flex">
              <span className="rounded-full bg-green-700 h-4 w-4 mx-4"></span>
              <h2 className="uppercase font-bold mb-4">open now</h2>
            </div>

            <div className="my-4">
              <h2 className="m-4 inline">Hours Today:</h2>
              <span className="font-semibold mt-2">9 AM to 8 PM</span>
            </div>

            <h2 className="inline-flex mb-4 mx-4">
              See full library details
              <MdKeyboardArrowRight className="mt-2 ml-2" />
            </h2>
          </div>
        </div>
        <div className="bg-slate-100 border-slate-900 w-2/3 mx-auto relative bottom-40 hidden md:block">
          <div className="flex flex-wrap flex-row justify-end">
            <div className="w-1/2 flex flex-col">
              <h1 className="tracking-wider text-black text-3xl font-bold py-3 m-4 my-3">
                Visit Our Library
              </h1>
              <div className="flex">
                <span className="rounded-full bg-green-700 h-4 w-4 mx-4"></span>
                <h2 className="uppercase font-bold mb-4">open now</h2>
              </div>

              <div className="my-4">
                <h2 className="m-4 inline">Hours Today:</h2>
                <span className="font-semibold mt-2">9 AM to 8 PM</span>
              </div>

              <h2 className="inline-flex mb-4 mx-4">
                See full library details
                <MdKeyboardArrowRight className="mt-2 ml-2" />
              </h2>
            </div>
            <div className="w-1/2">
              <img
                src={libraryImage}
                alt="Magnus public library"
                className="max-h-fit"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BackgroundBanner;
