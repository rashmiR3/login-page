import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import ForgotPassword from "./components/forgetpassword";
import StudentsList from "./components/tabledata";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tabledata" element={<StudentsList/>}/>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
