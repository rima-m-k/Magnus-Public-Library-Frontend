import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../pages/assistant/dashboard";
import AddBook from "../pages/assistant/AddBook";
import AddAuthors from '../pages/assistant/AddAuthor';
import AddGenre from '../pages/assistant/AddGenre';
import ErrorPage from '../pages/ErrorPage';
import ViewAuthors from '../pages/assistant/ViewAuthors';
import ViewBooks from '../pages/assistant/ViewBooks';
import ViewGenre from '../pages/assistant/ViewGenre';
import Profile from '../pages/assistant/Profile';
import ViewBlog from '../pages/assistant/ViewBlog';
import AsstNavigationBar from '../components/AsstNavigationBar';


function AssistantRoutes() {const [token, setToken] = useState(null);

  const Navigate = useNavigate();
  
  useEffect(() => {
    const storedToken = localStorage.getItem("AsstData");
    if (storedToken) {
      setToken(storedToken);
    } else {
      Navigate('/admin/staffPortal');
    }
  }, [Navigate]);
  
  return (
    <>
        <AsstNavigationBar />
    <Routes>
      <Route path="/dashboard" element={token?<Dashboard />: <Navigate to ={'/admin/staffPortal'} />}  />
      <Route path="/addAuthor" element={token?<AddAuthors />: <Navigate to ={'admin/staffPortal'} />}  />
      <Route path="/addBook" element={token?<AddBook />: <Navigate to ={'admin/staffPortal'} />}  />
      <Route path="/addGenre" element={token?<AddGenre />: <Navigate to ={'admin/staffPortal'} />} />
      <Route path="/viewAuthors" element={token?<ViewAuthors />: <Navigate to ={'admin/staffPortal'} />}  />
      <Route path="/ViewBooks" element={token?<ViewBooks />: <Navigate to ={'admin/staffPortal'} />}  />
      <Route path="/viewGenres" element={token?<ViewGenre />: <Navigate to ={'admin/staffPortal'} />}  />
      <Route path="/profile" element={token?<Profile />: <Navigate to ={'admin/staffPortal'} />}  />
      <Route path="/viewBlog" element={token?<ViewBlog />: <Navigate to ={'admin/staffPortal'} />}  />


      <Route path="*" element={<ErrorPage />} />
    </Routes>
  
      
    </>
  )
}

export default AssistantRoutes

