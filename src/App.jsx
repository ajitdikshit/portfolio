import { useState } from 'react'
import './App.css'

import BlurText from "./component/BlurText";
import Antigravity from './component/Antigravity';

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

function App() {
  return (
    <div className="app-container">
      
      {/* Background Layer */}
      <div className="antigravity-layer">
        <Antigravity
          count={300}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#5227FF"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>

      {/* Main Foreground Content */}
      <div className="main-content">
        
        <div className="name-blur">
          <BlurText
            text="AJIT DIKSHIT"
            delay={200}
            animateBy="letters"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
          />
        </div>

        <div className="about">
          <h1>About Me</h1>
          <p>
            Since childhood, I've been deeply curious about how games, websites and technology work behind the scenes. 
            That curiosity grew into a passion, and now, as a first-year B.Tech Computer Science (Core) student at VIT Bhopal, 
            I'm actively exploring the world of web development and software engineering.
          </p>
          <p>
            I recently won my very first hackathon in my first year, which strengthened my confidence and love for building impactful digital solutions.
          </p>
          <p>
            My current interests lie in full-stack development and object-oriented programming, and I'm continuously learning new tools, frameworks, and best practices to grow as a developer.
          </p>
          <p>
            I’m always open to collaboration, mentorship, and opportunities that can help me learn and contribute to real-world projects.
          </p>
        </div>

        <div className="projects-container">
          <h1 className="section-title">My Projects</h1>
          
          <div className="cards">
            <div className="project">
              <h2>AVANA</h2>
              <p>
                A PWA comprising gardening tips, advice, and a CNN that detects common plant diseases prevailing in Indian crops. <br /><br />
                Deployed at HuggingFace.
              </p>
              <a href="https://ajitdikshit.github.io/AVANA/" target="_blank" rel="noopener noreferrer" className="btn">
                Experience AVANA
              </a>
            </div>

            <div className="project">
              <h2>TourEast</h2>
              <p>
                An Android app crafted to boost tourism in the eastern parts of India. Comprises many API integrations like NDMA SACHET by the Indian govt. and Opentripmap. <br /><br />
                Also provides live navigation to your destination and nearby hotels for accommodation.
              </p>
              <a href="https://ajitdikshit.github.io/toureastapp/" target="_blank" rel="noopener noreferrer" className="btn">
                Experience TourEast
              </a>
            </div>

            <div className="project">
              <h2>ChoreUs</h2>
              <p>
                A simple household management application made with HTML, CSS, and JavaScript. <br /><br />
                Track your live inventory. ChoreUs AI picks items from the inventory and provides dish suggestions.
              </p>
              <a href="https://ajitdikshit.github.io/ChoreUs/" target="_blank" rel="noopener noreferrer" className="btn">
                Experience ChoreUs
              </a>
            </div>

            <div className="project">
              <h2>ApexRush</h2>
              <p>
                A simple yet fun 2-player Unity arcade racing game. <br /><br />
                Made with C#.
              </p>
              <a href="https://www.linkedin.com/posts/ajit-dikshit-b4b4b8343_apexrushzip-activity-7385675723048488960-7cpi" target="_blank" rel="noopener noreferrer" className="btn">
                Go to Post
              </a>
            </div>
          </div>
        </div>

        <div className="certificates-container">
          <h1 className="section-title">My Certifications</h1>
          <ul className="cert-grid">
            <li className="cert-card">
              <span>NPTEL: Marketing Analytics</span>
              <img src='./src/assets/mkt.png' alt="Marketing Analytics Certificate" />
            </li>
            <li className="cert-card">
              <span>NPTEL: Cloud Computing</span>
              <img src='./src/assets/cld.png' alt="Cloud Computing Certificate" />
            </li>
            <li className="cert-card">
              <span>Core Java</span>
              <img src='./src/assets/java.png' alt="Core Java Certificate" />
            </li>
            <li className="cert-card">
              <span>HackerRank: Problem Solving (Basic)</span>
              <img src='./src/assets/basic.png' alt="Problem Solving Basic Certificate" />
            </li>
            <li className="cert-card">
              <span>HackerRank: Problem Solving (Intermediate)</span>
              <img src='./src/assets/int.png' alt="Problem Solving Intermediate Certificate" />
            </li>
            <li className="cert-card">
              <span>HackerRank: Python Programming</span>
              <img src='./src/assets/pyt.png' alt="Python Programming Certificate" />
            </li>
            <li className="cert-card">
              <span>HackerRank: JavaScript</span>
              <img src='./src/assets/js.png' alt="JavaScript Certificate" />
            </li>
            <li className="cert-card">
              <span>Udemy: PHP and MySQL</span>
              <img src='./src/assets/php.png' alt="PHP and MySQL Certificate" />
            </li>
            <li className="cert-card">
              <span>Udemy: HTML CSS JS</span>
              <img src='./src/assets/html.png' alt="HTML CSS JS Certificate" />
            </li>
          </ul>
        </div>
        <div className="education-container">
          <h1 className="section-title">Education</h1>
          <div className="education-list">
            
            <div className="education-card">
              <div className="edu-logo">
                {/* Replace with actual path to VIT logo */}
                <img src="./src/assets/vit-logo.png" alt="VIT Bhopal Logo" />
              </div>
              <div className="edu-details">
                <h2>VIT Bhopal University</h2>
                <p className="degree">Bachelor's degree, Computer Science</p>
                <p className="date">Sep 2024 – 2028</p>
                <div className="skills">
                  <span>Engineering, Object-Oriented Programming (OOP) JAVA and C++ and +3 skills</span>
                </div>
              </div>
            </div>

            <div className="education-card">
              <div className="edu-logo">
                {/* Replace with actual path to St Dominic Savio logo */}
                <img src="./src/assets/isc.png" alt="St Dominic Savio College Logo" />
              </div>
              <div className="edu-details">
                <h2>St Dominic Savio College</h2>
                <p className="degree">Secondary Education, PCM</p>
                <p className="date">Apr 2007 – Apr 2024</p>
                <p className="grade">Grade: 10th-92%; 12th-90%</p>
                <div className="skills">
                  <span>Java, Core Java and +4 skills</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="contact">
          <h1>
            Contact Me:
          </h1>
          <a className='anchor' href='https://www.linkedin.com/in/ajit-dikshit-b4b4b8343/'><img className='linkedin' src='./src/assets/lnkd.png'></img>Connect on LinkedIn</a>
        </div>
      </div>
    </div>
  )
}

export default App