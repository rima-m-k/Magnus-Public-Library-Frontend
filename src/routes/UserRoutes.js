import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import LandingPage from "../pages/user/LandingPage";
import Login from "../pages/user/Login";
import Signup from "../pages/user/Signup";
import ViewBook from "../pages/user/ViewBook";
import AllBooks from "../pages/user/AllBooks";
import UserProfile from "../pages/user/UserProfile";
import LibraryCardApplication from "../pages/user/LibraryCardApplication";
import AllEvents from "../pages/user/AllEvents";
import ViewEvent from "../pages/user/ViewEvent";
import UserNavigation from '../components/UserNavigation'
import BookEvent from "../pages/user/BookEvent";
import Community from "../pages/user/Community";
import ViewBlog from "../pages/user/ViewBlog";
import PaymentSuccess from "../pages/user/PaymentSuccess";

function UserRoutes() {
  const Navigate = useNavigate()
  const [token, setToken] = useState(null);
const [userName,setUserName] = useState('')
  useEffect(() => {
    setToken(localStorage.getItem("currentUser"));
    setUserName(localStorage.getItem("userName"));
  }, [token]);
  return (
    <>
    <UserNavigation token={token} userName ={ userName} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/books/:id" element={<ViewBook /> }  />
        <Route path="/bookList" element={<AllBooks />} />
        <Route path="/profile" element= {token?<UserProfile /> : <Navigate to ={'/login'} />}/>
        <Route path="/LibraryCardApplication" element= {token?<LibraryCardApplication /> : <Navigate to ={'/login'} />}/>
        <Route path="/allEvents" element={<AllEvents />} />
        <Route path="/viewEvent/:id" element={<ViewEvent />} />
        <Route path="/bookEvent/:id" element={token?<BookEvent /> : <Navigate to ={'/login'} />}  />
        <Route path="/community" element={<Community />} />
        <Route path="/communityBlogs/:id" element={<ViewBlog />} />
        <Route path="/payment" element={token?<PaymentSuccess /> : <Navigate to ={'/login'} />}  />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
export default UserRoutes;