import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';
import { Analytics } from "@vercel/analytics/react"
// --- Assets ---
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

const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // 1. Fetch Stats (Keep your existing stats logic here...)
      
      // 2. Fetch Projects from Supabase
      const { data, error } = await supabase.from('projects').select('*');
      if (error) console.error("Error fetching projects:", error);
      else setProjects(data);
    };
    
    fetchData();
  }, []);
  return (
    <span className="typewriter-container">
      {displayedText}
      <span className="cursor">|</span>
    </span>
  );
};
// --- AI Chatbot Component ---
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Ajit's AI assistant. Ask me anything about his skills, projects, or experience!", isUser: false }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { text: userMsg, isUser: true }]);
    setInput("");
    setIsLoading(true);

    try {
      // Calling our secure Vercel Serverless Function
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      
      setMessages((prev) => [
        ...prev,
        { text: data.reply || "Sorry, I encountered an error.", isUser: false },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Connection error. Please try again.", isUser: false },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>Ajit's AI Assistant</h4>
            <button onClick={() => setIsOpen(false)} className="close-chat">×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.isUser ? "user-bubble" : "ai-bubble"}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && <div className="chat-bubble ai-bubble typing">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask me something..." 
            />
            <button type="submit" disabled={isLoading || !input.trim()}>➔</button>
          </form>
        </div>
      )}
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          Ask AI
        </button>
      )}
    </div>
  );
};
// --- Main App Component ---
function App() {
  // ==========================================
  // USERNAMES FOR LIVE STATS:
  // ==========================================
  const GITHUB_USERNAME = "ajitdikshit"; 
  const LEETCODE_USERNAME = "Ajit_Dikshit";

  // UI States
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [zoomedCert, setZoomedCert] = useState(null);

  // Live Stats States
  const [githubStats, setGithubStats] = useState({ repos: 0, followers: 0 });
  const [leetcodeStats, setLeetcodeStats] = useState({ solved: 0, easy: 0, medium: 0, hard: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  // Scroll & Mouse Tracking Effect
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

  // Live Stats Fetching Effect
 // Live Stats Fetching Effect
  // Live Stats Fetching Effect
  useEffect(() => {
    const fetchLiveStats = async () => {
      try {
        // 1. Fetch GitHub Stats
        if (GITHUB_USERNAME && GITHUB_USERNAME !== "YOUR_GITHUB_USERNAME") {
          const githubRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
          if (githubRes.ok) {
            const githubData = await githubRes.json();
            setGithubStats({
              repos: githubData.public_repos || 0,
              followers: githubData.followers || 0
            });
          }
        }
        
        // 2. Fetch LeetCode Stats (Updated with /solved endpoint)
        if (LEETCODE_USERNAME && LEETCODE_USERNAME !== "YOUR_LEETCODE_USERNAME") {
          const leetcodeRes = await fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`);
          if (leetcodeRes.ok) {
            const leetcodeData = await leetcodeRes.json();
            setLeetcodeStats({
              solved: leetcodeData.solvedProblem || 0, // Note the updated key here!
              easy: leetcodeData.easySolved || 0,
              medium: leetcodeData.mediumSolved || 0,
              hard: leetcodeData.hardSolved || 0
            });
          }
        }
      } catch (error) {
        console.error("Live stats API error:", error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchLiveStats();
  }, []);
  // Contact Form States
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'

  // Handle Form Input Changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    // PASTE YOUR GOOGLE SCRIPT WEB APP URL HERE:
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxrx_YxfBOc5krilzQ0tBn6W0mvzmna6rAqWm3x48I_G3ND8tL7Ws4DhauCDZZg9FxL/exec"; 

    try {
      // We use text/plain to bypass complex CORS preflight requirements
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', 
        },
      });
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Clear form
      setTimeout(() => setFormStatus('idle'), 5000); // Reset button after 5s
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };
  return (
    <div className="app-container">
      
      {/* Background Glow */}
      <div 
        className="cursor-blur"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)' 
        }}
      />

      {/* Navigation */}
      <nav className="navbar">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#stats">Stats</a>
        <a href="#achievements">Achievements</a>
        <a href="#projects">Projects</a>
        <a href="#certifications">Certifications</a>
        <a href="#education">Education</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* Hero Section */}
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

      {/* About Section */}
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
            <span className="learning-label">🚀 Currently exploring:</span> Spring Boot and Java Full-Stack Development
          </p>
        </div>
      </section>

      {/* Live Stats Dashboard */}
      <section id="stats" className="section stats-section">
        <h2 className="section-title">Live Coding Stats</h2>
        <div className="stats-dashboard">
          
          {/* GitHub Stats */}
          <div className="stat-group">
            <h3 className="stat-group-title">
              <img src={githubIcon} alt="GitHub" className="stat-icon-img" /> GitHub Activity
            </h3>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">{statsLoading ? '...' : githubStats.repos}</span>
                <span className="stat-label">Public Repos</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{statsLoading ? '...' : githubStats.followers}</span>
                <span className="stat-label">Followers</span>
              </div>
            </div>
          </div>

          {/* LeetCode Stats */}
          <div className="stat-group">
            <h3 className="stat-group-title">LeetCode Progress</h3>
            <div className="stats-grid leetcode-grid">
              <div className="stat-card highlight-stat">
                <span className="stat-number">{statsLoading ? '...' : leetcodeStats.solved}</span>
                <span className="stat-label">Total Solved</span>
              </div>
              <div className="stat-card easy-stat">
                <span className="stat-number">{statsLoading ? '...' : leetcodeStats.easy}</span>
                <span className="stat-label">Easy</span>
              </div>
              <div className="stat-card medium-stat">
                <span className="stat-number">{statsLoading ? '...' : leetcodeStats.medium}</span>
                <span className="stat-label">Medium</span>
              </div>
              <div className="stat-card hard-stat">
                <span className="stat-number">{statsLoading ? '...' : leetcodeStats.hard}</span>
                <span className="stat-label">Hard</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section">
        <h2 className="section-title">Technical Expertise</h2>
        <div className="descriptive-skills-grid">
          
          <div className="skill-description-card">
            <h3>Enterprise Backend Development</h3>
            <p className="skill-desc">
              Designing robust, database-driven applications and management systems using the MVC architecture. Experienced in connecting front-end interfaces to relational databases.
            </p>
            <div className="skill-tags">
              <span>Java</span><span>J2EE</span><span>JDBC</span><span>MySQL</span><span>Servlets</span><span>EJB</span>
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
            <h3>Systems Scripting & Automation</h3>
            <p className="skill-desc">
              Writing automated Bash scripts for system analysis, package inspection, and disk auditing to optimize Linux environments and open-source workflows.
            </p>
            <div className="skill-tags">
              <span>Bash</span><span>Linux System Administration</span><span>Python</span>
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

      {/* Achievements Section */}
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

      {/* Projects Section */}
      <div className="projects-grid">
  {projects.map((project) => (
    <div className="project-card" key={project.id}>
      <div className="project-header">
        <h3>{project.title}</h3>
      </div>
      <p className="project-desc">{project.description}</p>
      <div className="project-links">
        <a href={project.live_demo_url} target="_blank" rel="noopener noreferrer" className="btn-outline">Live Demo</a>
        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub Repo</a>
      </div>
    </div>
  ))}
</div>

      {/* Certifications Section */}
      <section id="certifications" className="section cert-section">
        
        {zoomedCert && (
          <div 
            className="zoom-overlay" 
            onClick={() => setZoomedCert(null)}
            title="Click to zoom out"
          ></div>
        )}

        <h2 className="section-title">My Certifications</h2>
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

      {/* Education Section */}
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

      {/* Contact Section */}
      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-layout">
          
          <div className="contact-info-column">
            <p className="contact-subtitle">
              I am currently looking for new opportunities and open to collaborating on interesting projects. Whether you have a question or just want to say hi, my inbox is always open!
            </p>
            <div className="contact-links-vertical">
              <a href="mailto:your.email@example.com" className="contact-link-card">
                <img src={emailIcon} alt="Email" className="contact-custom-icon" />
                <div>
                  <span className="link-title">Email</span>
                  <span className="link-detail">Send me a direct email</span>
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

          <div className="contact-form-column">
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" required rows="5" value={formData.message} onChange={handleInputChange} placeholder="Hi Ajit, I'd like to talk about..."></textarea>
              </div>
              
              <button type="submit" className="btn-primary submit-btn" disabled={formStatus === 'submitting'}>
                {formStatus === 'idle' && 'Send Message'}
                {formStatus === 'submitting' && 'Sending...'}
                {formStatus === 'success' && 'Message Sent! ✓'}
                {formStatus === 'error' && 'Error. Try Again.'}
              </button>
            </form>
          </div>

        </div>
      </section>
      
      {/* Footer */}
      <footer>
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Ajit Dikshit. Designed & Built with React.</p>
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
     {/* Render the Chatbot here so it floats on top of everything! */}
      <Chatbot />

    </div>
  );
}

export default App;