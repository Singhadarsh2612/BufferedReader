import React, { useState, useEffect } from 'react';

import './TeamsPage.css';

import Navbar from '../Navbar/Navbar.jsx';
import teamMembers from "../../StaticData/peopleData.json";


const TeamsPage = () => {
  const [activeSection, setActiveSection] = useState('admin');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Make navbar sticky when scrolling down
      setIsSticky(window.scrollY > 115);

      // Detect which section is in view
      const sections = ['admin', 'writers', 'designers', 'developers'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  // Function to capitalize the first letter of each word
  const capitalizeFirstLetter = (name) => {
    return name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  

  return (
    <div className="teams-container">
      {/* Navbar - Same as HomePage */}
      <Navbar/>

      {/* Team Header */}
      <div className="team-header">
        <h1>OUR TEAM</h1>
        <div className="team-nav">
          <div
            className={`team-nav-item ${activeSection === 'admin' ? 'active' : ''}`}
            onClick={() => scrollToSection('admin')}
          >
            ADMIN
          </div>
          <div
            className={`team-nav-item ${activeSection === 'writers' ? 'active' : ''}`}
            onClick={() => scrollToSection('writers')}
          >
            WRITERS
          </div>
          <div
            className={`team-nav-item ${activeSection === 'designers' ? 'active' : ''}`}
            onClick={() => scrollToSection('designers')}
          >
            DESIGNERS
          </div>
          <div
            className={`team-nav-item ${activeSection === 'developers' ? 'active' : ''}`}
            onClick={() => scrollToSection('developers')}
          >
            DEVELOPERS
          </div>
        </div>
      </div>

      {/* Team Sections with Pink Backgrounds */}
      <div className="team-sections">
        <section id="admin" className="team-section pink-bg">
          <div className="section-header admin-header">
            <h2>ADMIN</h2>
          </div>
          <div className="team-members">
            {teamMembers.admin.map((member, index) => (
              <div key={index} className="member-container">
                <div className="photo-container">
                  <img
                    src={member.photo}
                    alt={`${member.name} photo`}
                    className="member-photo"
                  />
                </div>
                <div className="member-info">
                  <h3>{capitalizeFirstLetter(member.name)}</h3>
                  <div className='lily'>
                  <a href={member.linkedin} className="linkedin-link"><img className="LI" src="LI.png"/></a>
                  <a href={member.email} className="linkedin-link"><img className="LI1" src="Mail.png"/></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="writers" className="team-section pink-bg">
          <div className="section-header writers-header">
            <h2>WRITERS</h2>
          </div>
          <div className="team-members">
            {teamMembers.writers.map((member, index) => (
              <div key={index} className="member-container">
                <div className="photo-container">
                  <img
                    src={member.photo}
                    alt={`${member.name} photo`}
                    className="member-photo"
                  />
                </div>
                <div className="member-info">
                  <h3>{capitalizeFirstLetter(member.name)}</h3>
                  <div className='lily'>
                  <a href={member.linkedin} className="linkedin-link"><img className="LI" src="/LI.png"/></a>
                  <a href={member.email} className="linkedin-link"><img className="LI1" src="/Mail.png"/></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="designers" className="team-section pink-bg">
          <div className="section-header designers-header">
            <h2>DESIGNERS</h2>
          </div>
          <div className="team-members">
            {teamMembers.designers.map((member, index) => (
              <div key={index} className="member-container">
                <div className="photo-container">
                  <img
                    src={member.photo}
                    alt={`${member.name} photo`}
                    className="member-photo"
                  />
                </div>
                <div className="member-info">
                  <h3>{capitalizeFirstLetter(member.name)}</h3>
                  <div className='lily'>
                  <a href={member.linkedin} className="linkedin-link"><img className="LI" src="LI.png"/></a>
                  <a href={member.email} className="linkedin-link"><img className="LI1" src="Mail.png"/></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="developers" className="team-section pink-bg">
          <div className="section-header developers-header">
            <h2>DEVELOPERS</h2>
          </div>
          <div className="team-members">
            {teamMembers.developers.map((member, index) => (
              <div key={index} className="member-container">
                <div className="photo-container">
                  <img
                    src={member.photo}
                    alt={`${member.name} photo`}
                    className="member-photo"
                  />
                </div>
                <div className="member-info">
                  <h3>{capitalizeFirstLetter(member.name)}</h3>
                  <div className='lily'>
                  <a href={member.linkedin} className="linkedin-link"><img className="LI" src="LI.png"/></a>
                  <a href={member.email} className="linkedin-link"><img className="LI1" src="Mail.png"/></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>CSE Society: IIT ISM<br /> Dhanbad</p>
      </footer>
    </div>
  );
};

export default TeamsPage;
