import React, { useState, useEffect } from 'react';
import './App.css';
import profilePic from './portfolio.jpg';
import hackathonMain from './hackathon2.jpg';
import hackathonCert from './hackathon.jpg';

import emailIcon from './email.png';
import linkedinIcon from './linkedin.png';
import githubIcon from './github.png';

// --- Certificate Data Array ---
const certificatesData = [
  { id: 1, title: 'Core Java', img: 'https://github.com/ajitdikshit/portfolio/blob/main/src/assets/java.png?raw=true', desc: 'Mastered object-oriented programming concepts, multithreading, and standard libraries.' },
  { id: 2, title: 'NPTEL: Cloud Computing', img: 'https://github.com/ajitdikshit/portfolio/blob/main/src/assets/cld.png?raw=true', desc: 'Gained a solid understanding of cloud architectures, virtualization, and deployment.' },
  { id: 3, title: 'NPTEL: Marketing Analytics', img: 'https://github.com/ajitdikshit/portfolio/blob/main/src/assets/mkt.png?raw=true', desc: 'Learned how to apply data analytics techniques to optimize business and market strategies.' },
  { id: 4, title: 'HackerRank: Python (Basic)', img: 'https://github.com/ajitdikshit/portfolio/blob/main/src/assets/pyt.png?raw=true', desc: 'Developed proficiency in Python syntax, data structures, and foundational scripting.' },
  { id: 5, title: 'HackerRank: JavaScript', img: 'https://github.com/ajitdikshit/portfolio/blob/main/src/assets/js.png?raw=true', desc: 'Grasped core JS concepts like DOM manipulation and asynchronous programming.' },
  { id: 6, title: 'Problem Solving (Basic)', img: 'https://github.com/ajitdikshit/portfolio/blob/main/src/assets/basic.png?raw=true', desc: 'Developed algorithmic thinking by solving standard data and logic challenges.' },
  { id: 7, title: 'Problem Solving (Intermediate)', img: 'https://github.com/ajitdikshit/portfolio/blob/main/src/assets/int.png?raw=true', desc: 'Enhanced my logic skills by tackling complex data structures and optimization problems.' },
  { id: 8, title: 'Udemy: PHP and MySQL', img: 'https://github.com/ajitdikshit/portfolio/blob/main/src/assets/php.png?raw=true', desc: 'Learned backend web development by creating dynamic pages and integrating databases.' },
  { id: 9, title: 'Udemy: HTML, CSS, JS', img: 'https://github.com/ajitdikshit/portfolio/blob/main/src/assets/html.png?raw=true', desc: 'Built a strong foundation in frontend web design and responsive user interfaces.' }
];

// --- Custom Typewriter Component ---
const TypewriterText = ({ text, speed = 120 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className="typewriter-container">
      {displayedText}
      <span className="cursor">|</span>
    </span>
  );
};

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [zoomedCert, setZoomedCert] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="app-container">
      
      <div 
        className="cursor-blur"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)' 
        }}
      />

      <nav className="navbar">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#achievements">Achievements</a>
        <a href="#projects">Projects</a>
        <a href="#certifications">Certifications</a>
        <a href="#education">Education</a>
        <a href="#contact">Contact</a>
      </nav>

      <section id="home" className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h4>Hello, I'm</h4>
            <h1><TypewriterText text="Ajit Dikshit" speed={150} /></h1>
            <h3>Software Developer & Computer Science Student</h3>
            <p>Building impactful digital solutions through clean code and modern architecture.</p>
            <div className="hero-actions">
              <a href="#projects" className="btn-primary">View My Work</a>
              <a href="#contact" className="btn-secondary">Contact Me</a>
              <a href="/resume.pdf" download="Ajit_Dikshit_Resume.pdf" className="btn-secondary">Download Resume</a>
            </div>
          </div>
          
          <div 
            className="hero-image-container"
            style={{
              transform: `translateY(${scrollY * 0.25}px) translateX(${scrollY * 0.15}px)`,
              opacity: 1 - scrollY / 500,
              willChange: 'transform, opacity'
            }}
          >
            <img src={profilePic} alt="Ajit Dikshit" className="hero-image" />
          </div>
        </div>
      </section>

      <section id="about" className="section about-section">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <p>
            As a B.Tech Computer Science student at VIT Bhopal, I am driven by a deep curiosity for software engineering and application development. What began as a childhood fascination with the inner workings of technology has evolved into a dedicated pursuit of full-stack development, object-oriented programming, and high-precision game logic.
          </p>
          <p>
            I am continuously expanding my technical repertoire with modern tools, frameworks, and data analytics. I actively seek opportunities to build impactful digital solutions and thrive in environments that challenge me to apply clean code principles, collaborate effectively, and embrace continuous learning.
          </p>
          <p className="currently-learning">
            <span className="learning-label">Currently exploring:</span> Spring Boot and Java Full-Stack Development
          </p>
        </div>
      </section>

      {/* --- DESCRIPTIVE SKILLS SECTION --- */}
      <section id="skills" className="section skills-section">
        <h2 className="section-title">Technical Expertise</h2>
        <div className="descriptive-skills-grid">
          
          <div className="skill-description-card">
            <h3>Enterprise Backend Development</h3>
            <p className="skill-desc">
              Designing robust, database-driven applications and management systems using the MVC architecture. Experienced in connecting front-end interfaces to relational databases.
            </p>
            <div className="skill-tags">
              <span>Java</span><span>JDBC</span><span>MySQL</span><span>EJB</span>
            </div>
          </div>

          <div className="skill-description-card">
            <h3>Game Development & Physics</h3>
            <p className="skill-desc">
              Engineering high-precision game logic and custom physics mechanics, including raycast-based car controllers and multiplayer synchronization logic.
            </p>
            <div className="skill-tags">
              <span>C#</span><span>Unity</span><span>Object-Oriented Programming</span>
            </div>
          </div>

          <div className="skill-description-card">
            <h3>Web Development</h3>
            <p className="skill-desc">
              Making responsive websites with react and integrating databases.
            </p>
            <div className="skill-tags">
              <span>HTML/CSS</span><span>Javascript</span><span>Firebase</span><span>MySQL Database</span><span>JQuery</span>
            </div>
          </div>

          <div className="skill-description-card">
            <h3>Data Analytics & Modeling</h3>
            <p className="skill-desc">
              Applying statistical methodologies—from standard distributions to ANOVA and regression modeling—to extract meaningful insights from datasets.
            </p>
            <div className="skill-tags">
              <span>Data Analytics</span><span>Statistics</span><span>Python</span>
            </div>
          </div>

        </div>
      </section>

      <section id="achievements" className="section achievements-section">
        <h2 className="section-title">Achievements</h2>
        <div className="achievement-card">
          <div className="achievement-info">
            <h3>2nd Prize - SolVIT Hackathon 2025</h3>
            <p className="achievement-date">VIT Bhopal University</p>
            <p className="achievement-desc">
              Secured the 2nd position overall at the university-level SolVIT Hackathon with our project, <strong>ChoreUs</strong>. 
              This experience challenged me to rapidly prototype a digital household management solution under intense time constraints, 
              collaborate seamlessly with my team, and pitch a viable technical product to a panel of expert judges.
            </p>
          </div>
          <div className="achievement-gallery">
            <img src={hackathonMain} alt="Winning Team on Stage" className="gallery-main" />
            <img src={hackathonCert} alt="2nd Prize Certificate" className="gallery-secondary" />
          </div>
        </div>
      </section>

      <section id="projects" className="section projects-section">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          
          <div className="project-card highlight-card-grade">
            <div className="project-header">
              <h3>AVANA</h3>
              <span className="grade-badge">S Grade Project</span>
            </div>
            <p className="project-desc">A PWA comprising gardening tips, advice, and a CNN that detects common plant diseases prevailing in Indian crops.</p>
            <div className="project-links">
              <a href="https://ajitdikshit.github.io/AVANA/" target="_blank" rel="noopener noreferrer" className="btn-outline">Live Demo</a>
              <a href="https://github.com/ajitdikshit/AVANA" target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub Repo</a>
            </div>
          </div>

          <div className="project-card">
            <div className="project-header">
              <h3>TourEast</h3>
            </div>
            <p className="project-desc">An Android app crafted to boost tourism in eastern India. Features API integrations like NDMA SACHET and provides live navigation.</p>
            <div className="project-links">
              <a href="https://ajitdikshit.github.io/toureastapp/" target="_blank" rel="noopener noreferrer" className="btn-outline">Live Demo</a>
              <a href="https://github.com/ajitdikshit/toureastapp" target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub Repo</a>
            </div>
          </div>
          
          <div className="project-card highlight-card-award">
            <div className="project-header">
              <h3>ChoreUs</h3>
              <span className="award-badge">🏆 2nd Prize Winner</span>
            </div>
            <p className="project-desc">A household management application built during the SolVIT Hackathon. Tracks live inventory while ChoreUs AI provides dish suggestions based on available items.</p>
            <div className="project-links">
              <a href="https://ajitdikshit.github.io/ChoreUs/" target="_blank" rel="noopener noreferrer" className="btn-outline">Live Demo</a>
              <a href="https://github.com/ajitdikshit/ChoreUs" target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub Repo</a>
            </div>
          </div>

          <div className="project-card">
            <div className="project-header">
              <h3>ApexRush</h3>
            </div>
            <p className="project-desc">A responsive 2-player Unity arcade racing game developed with C#, focusing on custom raycast-based car controllers and precise physics.</p>
            <div className="project-links">
              <a href="https://www.linkedin.com/posts/ajit-dikshit-b4b4b8343_apexrushzip-activity-7385675723048488960-7cpi" target="_blank" rel="noopener noreferrer" className="btn-outline">Watch Demo</a>
              <a href="https://github.com/ajitdikshit/ApexRush" target="_blank" rel="noopener noreferrer" className="btn-secondary">Download<br></br>Password: testuser</a>
            </div>
          </div>
          
        </div>
      </section>

      <section id="certifications" className="section cert-section">
        <h2 className="section-title">My Certifications</h2>
        
        {/* --- NEW: Background Overlay for Zooming --- */}
        {zoomedCert && (
          <div 
            className="zoom-overlay" 
            onClick={() => setZoomedCert(null)}
            title="Click to zoom out"
          ></div>
        )}

        <div className="cert-grid">
          
          {certificatesData.map((cert) => (
            <div className="cert-card" key={cert.id}>
              <img 
                src={cert.img} 
                alt={cert.title} 
                className={`cert-icon ${zoomedCert === cert.id ? 'zoomed' : ''}`} 
                onClick={() => setZoomedCert(zoomedCert === cert.id ? null : cert.id)}
                title="Click to toggle zoom"
              />
              <div className="cert-details">
                <h4>{cert.title}</h4>
                <p>{cert.desc}</p>
              </div>
            </div>
          ))}

        </div>
      </section>

      <section id="education" className="section edu-section">
        <h2 className="section-title">Education</h2>
        <div className="timeline">
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>VIT Bhopal University</h3>
              <h4 className="degree">B.Tech, Computer Science (Core)</h4>
              <span className="date">Sep 2024 – 2028</span>
              <p className="edu-desc">
                Currently pursuing my undergraduate degree, focusing on core computer science principles, object-oriented programming, and software engineering.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h3>St. Dominic Savio College</h3>
              <h4 className="degree">Secondary Education, PCM</h4>
              <span className="date">Apr 2007 – Apr 2024</span>
              <p className="grade">10th Grade: 92% | 12th Grade: 90%</p>
            </div>
          </div>

        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="contact-dashboard">
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-subtitle">
            I am currently looking for new opportunities and open to collaborating on interesting projects. Whether you have a question or just want to say hi, my inbox is always open!
          </p>
          
          <div className="contact-links-grid">
            <a href="mailto:your.email@example.com" className="contact-link-card">
              <img src={emailIcon} alt="Email" className="contact-custom-icon" />
              <div>
                <span className="link-title">Email</span>
                <span className="link-detail">Send me a message</span>
              </div>
            </a>
            
            <a href="https://www.linkedin.com/in/ajit-dikshit-b4b4b8343/" target="_blank" rel="noopener noreferrer" className="contact-link-card">
              <img src={linkedinIcon} alt="LinkedIn" className="contact-custom-icon" />
              <div>
                <span className="link-title">LinkedIn</span>
                <span className="link-detail">Let's connect</span>
              </div>
            </a>
            
            <a href="https://github.com/ajitdikshit" target="_blank" rel="noopener noreferrer" className="contact-link-card">
              <img src={githubIcon} alt="GitHub" className="contact-custom-icon" />
              <div>
                <span className="link-title">GitHub</span>
                <span className="link-detail">View my code</span>
              </div>
            </a>
          </div>
        </div>
      </section>
      
      <footer>
        <div className="footer-content">
          <p>Ajit Dikshit: Software Developer & Computer Science Student</p>
          <div className="footer-socials">
            <a href="mailto:your.email@example.com" aria-label="Email">
              <img src={emailIcon} alt="Email" className="footer-custom-icon" />
            </a>
            <a href="https://www.linkedin.com/in/ajit-dikshit-b4b4b8343/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src={linkedinIcon} alt="LinkedIn" className="footer-custom-icon" />
            </a>
            <a href="https://github.com/ajitdikshit" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src={githubIcon} alt="GitHub" className="footer-custom-icon" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;