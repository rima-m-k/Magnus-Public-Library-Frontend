import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AddEmployee from "../pages/admin/AddEmployee";
import Dashboard from "../pages/admin/Dashboard";
import ShowGenre from "../pages/admin/ViewGenre";
import ShowBooks from "../pages/admin/ViewBooks";
import ShowAuthors from "../pages/admin/ViewAuthors";
import CheckOut from "../pages/admin/CheckOut";
import ReturnRenew from "../pages/admin/ReturnRenew";
import ViewEmployees from "../pages/admin/ViewEmployees";
import ViewUsers from "../pages/admin/ViewUsers";
import AddEvent from "../pages/admin/AddEvent";
import AddBlog from "../pages/admin/AddBlog";
import Profile from "../pages/admin/Profile";
import ViewEvent from '../pages/admin/ViewEvent';
import ViewBlog from "../pages/admin/ViewBlog";

function SideBar() {
  const [toggleDown, setToggleDown] = useState({
    employee: false,
    catalogue: false,
    users: false,
    ga: false,
    circulation: false,
    event: false,
    profile: false,
    blog: false
  });
  const handleToggle = (key) => {
    setToggleDown((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className="  min-w-fit bg-gray-800 text-white flex overflow-y-auto flex-col items-center px-2  max-h-fit  scrollbar-none scrollbar-track-gray-100 scrollbar-thumb-gray-700 scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">
      <div className="h-16 w-full flex items-center justify-center text-2xl font-bold ">
        <h1 className="text-2xl font-semibold ">Magnus Public Library</h1>
      </div>
      <ul className="flex-grow fixe py-4 ">
        <li className="w-full  ">
          <Link to="/admin/dashboard" element={<Dashboard />}>
            <span className="block px-6 py-2 rounded-lg hover:bg-gray-700">
              Dashboard
            </span>
          </Link>
        </li>
        <li className="w-full ">
          <span
            onClick={() => handleToggle("employee")}
            className="block px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            Employees
          </span>
          <div className=" px-10 ">
            {toggleDown.employee && (
              <>
                <Link to="/admin/addEmployee" element={<AddEmployee />}>
                  <span className="block px-6 py-2 rounded-lg hover:bg-gray-600 ">
                    Add Employee
                  </span>
                </Link>
                <Link to="/admin/viewEmployees" element={<ViewEmployees />}>
                  <span className="block px-6 py-2 rounded-lg hover:bg-gray-600 ">
                    view Employees
                  </span>
                </Link>
              </>
            )}
          </div>
        </li>
        <li className="w-full ">
          <span
            onClick={() => handleToggle("users")}
            className="block px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            Members
          </span>
          <div className=" px-10 ">
            {toggleDown.users && (
              <>
                <Link to="/admin/viewUsers" element={<ViewUsers />}>
                  <span className="block px-6 py-2 rounded-lg hover:bg-gray-600 ">
                    View Members
                  </span>
                </Link>
              </>
            )}
          </div>
        </li>
        <li className="w-full ">
          <span
            onClick={() => handleToggle("catalogue")}
            className="block px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            Catalogue
          </span>
          <div className=" px-10 ">
            {toggleDown.catalogue && (
              <>
                <Link to="/admin/viewBooks" element={<ShowBooks />}>
                  <span className="block px-6 py-2 rounded-lg hover:bg-gray-600 ">
                    Books
                  </span>
                </Link>
                <Link to="/admin/viewGenre" element={<ShowGenre />}>
                  <span className="block px-6 py-2 rounded-lg hover:bg-gray-600 ">
                    Genres
                  </span>
                </Link>
                <Link to="/admin/viewAuthors" element={<ShowAuthors />}>
                  <span className="block px-6 py-2 rounded-lg hover:bg-gray-600 ">
                    Authors
                  </span>
                </Link>
              </>
            )}
          </div>
        </li>

        <li className="w-full ">
          <span
            onClick={() => handleToggle("event")}
            className="block px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            Event
          </span>
          <div className=" px-10 ">
            {toggleDown.event && (
              <>
                <Link to="/admin/addEvent" element={<AddEvent />}>
                  <span className="block px-6 py-2 rounded-lg hover:bg-gray-600 ">
                    Add Event
                  </span>
                </Link>
              
                <Link to="/admin/viewEvent" element={<ViewEvent />}>
                  <span className="block px-6 py-2 rounded-lg hover:bg-gray-600 ">
                    View Event
                  </span>
                </Link>
              </>
            )}
          </div>
        </li>

        <li className="w-full ">
          <span
            onClick={() => handleToggle("blog")}
            className="block px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            Blog
          </span>

          <div className=" px-10 ">
            {toggleDown.blog && (
              <>
               
                <Link to="/admin/addBlog" element={<AddBlog />}>
                  <span className="block px-6 py-2 rounded-lg hover:bg-gray-600 ">
                    Add Blog
                  </span>
                </Link>
                <Link to="/admin/viewBlog" element={<ViewBlog />}>
                  <span className="block px-6 py-2 rounded-lg hover:bg-gray-600 ">
                    View Blog
                  </span>
                </Link>
              </>
            )}
          </div>
        </li>

        <li className="w-full ">
          <span
            onClick={() => handleToggle("profile")}
            className="block px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            Profile
          </span>
          <div className=" px-10 ">
            {toggleDown.profile && (
              <>
                <Link to="/admin/profile" element={<Profile />}>
                  <span className="block px-6 py-2 rounded-lg hover:bg-gray-600 ">
                    Profile
                  </span>
                </Link>

              </>
            )}
          </div>

        </li>
        <li className="w-full">
          <span
            onClick={() => handleToggle("circulation")}
            className="block px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            Circulation Section
          </span>
          <div className=" px-10 ">
            {toggleDown.circulation && (
              <>
                <Link to="/admin/checkout" element={<CheckOut />}>
                  <span className="block px-6 py-2 rounded-lg hover:bg-gray-600 ">
                    Checkout
                  </span>
                </Link>

                <Link to="/admin/returnRenew" element={<ReturnRenew />}>
                  <span className="block px-6 py-2 rounded-lg hover:bg-gray-600 ">
                    Return/Renew
                  </span>
                </Link>

              
              </>
            )}
          </div>
        </li>

      
      </ul>
      <div className="px-6 py-4">
        <span className="block text-gray-400 hover:text-white ">Logout</span>
      </div>
    </div>
  );
}

export default SideBar;
