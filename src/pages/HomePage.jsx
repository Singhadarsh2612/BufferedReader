import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar.jsx';
import './HomePage.css';
import logoImage2 from '/logo.png';


const BUFFERED_READERS_FOLDER_ID = "1inj0AM4qnEjLr88-7_SGGvQpuTv804rH";

const HomePage = () => {
  const navigate = useNavigate();
  const [latestPdf, setLatestPdf] = useState(null);
  const [isLoadingMagazine, setIsLoadingMagazine] = useState(false);

  useEffect(() => {
    async function fetchLatestPdf() {
      try {
        const url = `http://localhost:3001/pdfs?folderId=${BUFFERED_READERS_FOLDER_ID}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch PDFs`);

        const data = await response.json();
        if (data.files.length > 0) {
          setLatestPdf(data.files[0]); // Get the latest uploaded file
        }
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    }

    fetchLatestPdf();
  }, []);
  
  return (
    <div className="home-container">
      <Navbar />
      
      {/* Journal Header */}
      <div className="journal-header">
        <div className="journal-title-container">
          <div className="journal-logo">
            <img src={logoImage2} alt="Journal Logo" />
          </div>
          <div className="journal-title">
            <p>Computer Science and Engineering Society's</p>
            <h1>TECH JOURNAL</h1>
          </div>
        </div>
      </div>

      {/* Latest Section */}
      <section className="latest-section">
        <div className="latest-left">
          <div className="latest-content">
            <h2>LATEST...</h2>
            <div className="latest-text">
              <h3>CSES Tech Insights</h3>
              <p>Past & Present</p>
            </div>
          </div>
        </div>
        <div className="latest-right">
          <div className="monsoon-card">
            <div className="monsoon-text">
            <center><h3>{latestPdf ? latestPdf.name : " "}</h3></center>
              <center><button
                className="read-btn11"
                onClick={() => {
                  if (!latestPdf) return alert("No PDF available.");
                  setIsLoadingMagazine(true);
                  navigate("/pdf-viewer", {
                    state: { pdfUrl: latestPdf.id }, // Pass only the file ID
                  });
                }}
              >
                {isLoadingMagazine ? "Loading..." : "READ"}
              </button></center>
            </div>
            <div className="monsoon-image">
            {latestPdf ? (
    <img
      src={`http://localhost:3001/thumbnail?fileId=${latestPdf.id}&nocache=${Date.now()}`}
      alt="Buffered Reader"
    />
  ) : (
    null
  )}
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="purpose-section">
        <div className="purpose-left">
          <div className="section-title">
            <h2>PURPOSE</h2>
          </div>
        </div>
        <div className="purpose-right">
          <h3>What we Aim?</h3>
          <p>
          The aim of the CSE Society is to create a dynamic and supportive environment that nurtures the technical and creative abilities of students in the field of computer science and engineering. We aim to bridge the gap between theoretical knowledge and practical application by organizing a variety of events, workshops, and collaborative projects.
          </p>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="events-section">
        <div className="events-left">
          <div className="section-title">
            <h2>UPCOMING EVENTS</h2>
          </div>
        </div>
        <div className="events-right">
          <h3>Udbhav-2024</h3>
          <p>
          Join us as we celebrate the essence of creativity, innovation, and community at Udbhav 2024. Let’s make this event a spectacular success, and a memorable chapter in the history of our CSE Department!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>CSE Society: IIT ISM<br />Dhanbad</p>
      </footer>
    </div>
  );
};

export default HomePage;
