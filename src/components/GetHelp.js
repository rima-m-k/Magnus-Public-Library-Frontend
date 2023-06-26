import React, { useState } from "react";

const GetHelp = () => {

    const [FormData,SetFormData] = useState({
        name:'',
        phone:'',
        email:'',
        password:'',
        cpassword:'',
        photo:'',
        address1:'',
        address2:'',
        city:'',
        state:'',
        country:'',
        pincode:'',
    })



  return (
    <div className="flex flex-col md:flex-row w-3/4">
      <div className="md:w-1/2 px-4">
        {/* Left column content */}
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full px-3 py-2 text-gray-900 bg-gray-100 rounded-md"
              rows="5"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </div>
      <div className="md:w-1/2 px-4">
        {/* Right column content */}
        <div className="bg-gray-200 rounded-md p-4">
          <h2 className="text-gray-700 font-bold mb-4">Contact Information</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor.
          </p>
          <p className="text-gray-600 mt-4">
            Phone: <a href="tel:555-555-5555">555-555-5555</a>
          </p>
          <p className="text-gray-600">
            Email: <a href="mailto:info@example.com">info@example.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetHelp;
