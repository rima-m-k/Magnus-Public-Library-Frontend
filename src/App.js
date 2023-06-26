import "./App.css";
// import {  Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import AssistantRoutes from "./routes/AssistantRoutes";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/asst/*" element={<AssistantRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
