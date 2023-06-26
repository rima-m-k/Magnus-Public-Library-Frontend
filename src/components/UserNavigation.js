import React, { useState } from "react";
import { Link } from "react-router-dom";
import Signup from "../pages/user/Signup";
import Login from "../pages/user/Login";
import LandingPage from "../pages/user/LandingPage";
import AllBooks from "../pages/user/AllBooks";
import UserProfile from "../pages/user/UserProfile";
import AllEvents from "../pages/user/AllEvents";
import Community from "../pages/user/Community";

function NavMenu({ token, userName }) {
  const [toggleUser, setToggleUser] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <nav className="flex items-center justify-between p-6 bg-custom-green">
        <div className="flex-shrink-0 text-white">
          <Link to="/" element={<LandingPage />}>
            <span className="font-bold text-3xl">M</span>
            <span className="font-normal text-2xl">agnus</span>
            <br />
            <span className="font-bold text-3xl">P</span>
            <span className="font-normal text-2xl">ublic</span>
            <br />
            <span className="font-bold text-3xl">L</span>
            <span className="font-normal text-2xl">ibrary</span>
          </Link>
        </div>
        <div className="block md:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-white-500 border-white-600 hover:text-white hover:border-white"
            onClick={toggleMenu}
          >
            <svg
              className="h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0zm0 6h20v2H0zm0 6h20v2H0z" />
            </svg>
          </button>
        </div>
        <div
          className={`md:flex md:items-center md:w-auto ${
            showMenu ? "" : "hidden"
          }`}
          id="menu"
        >
          <nav>
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="text-white p-5 m-2"
                  element={<Login />}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white p-5 m-2"
                  element={<Signup />}
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <span
                  onClick={() => setToggleUser((prev) => !prev)}
                  className="text-white p-2 m-3 absolute right-0 top-0 border rounded-xl"
                >
                  {JSON.parse(userName)}
                </span>
                <div className="px-10">
                  {toggleUser && (
                    <div className="absolute z-50 right-0 mt-2 py-2 bg-green-50 rounded-xl shadow-xl">
                      <Link to="/profile" element={<UserProfile />}>
                        <span className="block px-6 py-2 hover:bg-slate-300">
                          Profile
                        </span>
                      </Link>
                      {/* <Link to="/admin/viewGenre"  element={<ShowGenre  />}> */}
                     
                      <span className="block px-6 py-2 hover:bg-slate-300">
                        Reading History
                      </span>
                      {/* </Link> */}
                      {/* <Link to="/admin/viewAuthors"  element={<ShowAuthors/>}> */}
                      <span className="block px-6 py-2 hover:bg-slate-300">
                        Settings
                      </span>
                      {/* </Link> */}
                      {/* <Link to="/admin/viewBooks"  element={<ShowBooks/>}> */}
                      <span className="block px-6 py-2 hover:bg-slate-300">
                        Logout
                      </span>
                      {/* </Link> */}
                    </div>
                  )}
                </div>
              </>
            )}
            <hr className="border-t border-white-300 m-3 w-full" />

            <ul className="flex flex-col md:flex-row items-center justify-around font-medium text-xl text-white">
              <li>
                <Link
                  to="/bookList"
                  element={<AllBooks />}
                  className="block m-3 px-4 md:inline-block md:mt-0 hover:text-white"
                >
                  Borrow
                </Link>
              </li>
              <li>
                <Link
                  to="/allEvents"
                  element={<AllEvents />}
                  className="block m-2 px-4 md:inline-block md:mt-0 hover:text-white"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  element={<Community />}
                  className="block m-2 px-4 md:inline-block md:mt-0 hover:text-white"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  className="block m-2 px-4 md:inline-block md:mt-0 hover:text-white"
                  to="#"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="block m-2 px-4 md:inline-block md:mt-0 hover:text-white"
                  to="#"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </nav>
    </>
  );
}

export default NavMenu;
