import "./App.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useState } from 'react';
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { UploadPage } from "./pages/Upload";
import { Navbar } from "./components/Navbar";
import { NoPage } from "./pages/NoPage";
import { Routes, Route } from 'react-router-dom';
import { Worker } from '@react-pdf-viewer/core';
import { ViewPdf } from "./pages/ViewPdf";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pdf/:name/:token" element={<ViewPdf />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
