import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";
import AddEmployee from "../pages/admin/AddEmployee";
import Dashboard from "../pages/admin/Dashboard";
import StaffLogin from "../pages/admin/StaffLogin";
import ErrorPage from '../pages/ErrorPage';
import ShowGenre from '../pages/admin/ViewGenre';
import ShowBooks from '../pages/admin/ViewBooks';
import ShowAuthors from '../pages/admin/ViewAuthors';
import ReturnRenew from '../pages/admin/ReturnRenew';
import CheckOut from '../pages/admin/CheckOut';
import ViewEmployees from '../pages/admin/ViewEmployees';
import ViewUsers from '../pages/admin/ViewUsers';
import AddEvent from '../pages/admin/AddEvent';
import Layout from '../components/Layout';
import Profile from '../pages/admin/Profile';
import AddBlog from '../pages/admin/AddBlog';
import AddVenue from '../pages/admin/AddVenue';
import ViewBlog from '../pages/admin/ViewBlog';
import ViewEvent from '../pages/admin/ViewEvent';

function AdminRoutes() {
  const [token, setToken] = useState(null);

const Navigate = useNavigate();

useEffect(() => {
  const storedToken = localStorage.getItem("AdminData");
  if (storedToken) {
    setToken(storedToken);
  } else {
    Navigate('/admin/staffPortal');
  }
}, [Navigate]);

  return (
    <Routes>
      <Route path="/staffPortal" element={<StaffLogin />} />
      <Route path="/viewGenre" element={token?<Layout><ShowGenre /></Layout> : <Navigate to ={'/staffPortal'} />}/>
      <Route path="/dashboard" element={token?<Layout><Dashboard /></Layout> : <Navigate to ={'/staffPortal'} />} />
      <Route path="/addEmployee" element={token?<Layout><AddEmployee /></Layout> : <Navigate to ={'/staffPortal'} />}  />
      <Route path="/viewAuthors" element={token?<Layout><ShowAuthors /></Layout> : <Navigate to ={'/staffPortal'} />}  />
      <Route path="/viewBooks" element={token?<Layout><ShowBooks /></Layout> : <Navigate to ={'/staffPortal'} />}  />
      <Route path="/returnRenew" element={token?<Layout><ReturnRenew /></Layout> : <Navigate to ={'/staffPortal'} />} />
      <Route path="/checkout" element={token?<Layout><CheckOut /></Layout> : <Navigate to ={'/staffPortal'} />}  />
      <Route path="/viewEmployees" element={token?<Layout><ViewEmployees /></Layout> : <Navigate to ={'/staffPortal'} />} />
      <Route path="/viewUsers" element={token?<Layout><ViewUsers /></Layout> : <Navigate to ={'/staffPortal'} />}  />
      <Route path="/addEvent" element={token?<Layout><AddEvent /></Layout> : <Navigate to ={'/staffPortal'} />}  />
      <Route path="/addVenue" element={token?<Layout><AddVenue /></Layout> : <Navigate to ={'/staffPortal'} />}  />
      <Route path="/profile" element={token?<Layout><Profile /></Layout> : <Navigate to ={'/staffPortal'} />} />
      <Route path="/addBlog" element={token?<Layout><AddBlog /></Layout> : <Navigate to ={'/staffPortal'} />}  />
      <Route path="/viewBlog" element={token?<Layout><ViewBlog /></Layout> : <Navigate to ={'/staffPortal'} />}  />
      <Route path="/viewEvent" element={token?<Layout><ViewEvent /></Layout> : <Navigate to ={'/staffPortal'} />}  />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
export default AdminRoutes
