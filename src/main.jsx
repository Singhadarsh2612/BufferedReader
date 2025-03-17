import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeamsPage from "./components/Team/TeamsPage";
import BufferedReadersPage from "./components/BufferedReadersPage/BufferedReadersPage";
import BytestreamsPage from "./components/ByteStreamPage/BytestreamsPage";
import AboutPage from "./components/AboutPage/AboutPage";
import PDFFlipbook from "./components/Flipbook/PDFFlipbook";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/bytestreams" element={<BytestreamsPage />} />
        <Route path="/buffered-readers" element={<BufferedReadersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pdf-viewer" element={<PDFFlipbook />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
