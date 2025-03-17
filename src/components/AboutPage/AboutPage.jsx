import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

import cksir from "/professor/ck_sir.jpg";
import sbsir from "/professor/sb_sir.jpg";
import pbsir from "/professor/pb_coFIC.jpg";
import Navbar from '../Navbar/Navbar.jsx';
const AboutPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  
    // Handle screen resize
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 900);
        if (window.innerWidth > 900) {
          setIsMenuOpen(false);
        }
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    // Toggle menu
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    // Close menu when a link is clicked
    const closeMenu = () => {
      setIsMenuOpen(false);
    };
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 115);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="buffered-readers-container">
      {/* Navbar */}
      <Navbar/>

      {/* About Content */}
      <div className="introduction">
        <div className="heading">Our Aim ?</div>
        <div className="content">
          Buffered Reader transcends the realm of a mere magazine, serving as a catalyst for intellectual curiosity and creativity within the CSE Society. We bridge the gap between theory and real-world application with insights into cutting-edge technological advancements. Our meticulously curated content ignites innovation, cultivates collaboration, and empowers readers with indispensable knowledge for both academic and professional triumphs. Ultimately, Buffered Reader cultivates a strong sense of community and champions lifelong learning in the ever-evolving world of Computer Science and Engineering.
        </div>
      </div>
      <div className="alleditions">
  <section className="section-container">
    <div className="content-container">
      <div className="profile-card">
        <img
          alt="testimonial"
          className="profile-image"
          src={cksir}
        />
        <h2 className="profile-name">Prof. Chiranjeev Kumar</h2>
        <p className="profile-title">
          Head: Department Of Computer Science and Engineering
        </p>

        <span className="separator"></span>

        <p className="profile-description">
          As the Head of the Computer Science and Engineering Department, I am
          excited to introduce our CSE Society's digital platform, a vibrant
          space where the intellectual and creative endeavors of our students
          come together. This website, featuring the digital archives of{" "}
          <i>Buffered Reader</i>, our department's magazine, represents our
          dedication to nurturing a culture of innovation and
          knowledge-sharing. By preserving and making accessible the wealth of
          ideas captured in past editions, we aim to inspire our current and
          future students to explore the frontiers of technology and
          creativity. This platform will stand as both a celebration of our
          achievements and a beacon for the limitless possibilities that lie
          ahead.
        </p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="quote-icon"
          viewBox="0 0 975.036 975.036"
        >
          <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
        </svg>
      </div>
    </div>
  </section>
</div>


<hr />
<div className="alleditions">
  <section>
    <div className="container">
      <div className="text-center">
        <div className="image-container">
          <div className="image-wrapper">
            <img src={sbsir} alt="Prof. Soumen Bag" />
            <h2>Prof. Soumen Bag</h2>
          </div>
          <div className="image-wrapper">
            <img src={pbsir} alt="Dr. Pranav Bisht" />
            <h2>Dr. Pranav Bisht</h2>
          </div>
        </div>

        <p className="subtitle">
          Faculty Incharge & Co-Faculty Incharge: Buffered Reader
        </p>

        <span className="divider"></span>

        <p>
          As the faculty in charge and co-faculty in charge of Buffered Reader,
          it brings us immense pride to witness the launch of our digital
          platform, a project that embodies the spirit of collaboration and
          innovation that defines our community. The Buffered Reader magazine
          has always been a cornerstone of our society, showcasing the
          creativity, technical prowess, and diverse perspectives of our
          students. By transitioning to a digital format, we are not only
          preserving this rich tradition but also expanding its reach, enabling
          our content to inspire and engage a broader audience. This platform
          will serve as a living archive of our students' journey through the
          ever-evolving field of computer science, and we are confident that it
          will continue to motivate and challenge our community to strive for
          excellence.
        </p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="quote-icon"
          viewBox="0 0 975.036 975.036"
        >
          <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
        </svg>
      </div>
    </div>
  </section>
</div>

      {/* Footer */}
      <footer className="footer">
        <p>CSE Society: IIT ISM<br />Dhanbad</p>
      </footer>
    </div>
  );
};

export default AboutPage;
