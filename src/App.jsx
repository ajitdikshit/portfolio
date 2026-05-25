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
import toast, { Toaster } from 'react-hot-toast';


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
// --- Admin Panel Component ---
// --- Admin Panel Component ---
// --- Admin Panel Component ---
const AdminPanel = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]); // NEW: Store projects
  const [authError, setAuthError] = useState('');

  const [newProject, setNewProject] = useState({ title: '', description: '', tags: '', github_url: '', live_demo_url: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchMessages();
        fetchProjects(); // NEW: Fetch projects on login
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (!error) setMessages(data);
  };

  // NEW: Fetch existing projects
  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (!error) setProjects(data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError('Invalid login credentials.');
    else {
      fetchMessages();
      fetchProjects();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const deleteMessage = async (id) => {
    await supabase.from('messages').delete().match({ id });
    fetchMessages();
  };

  // NEW: Delete project with confirmation
  const deleteProject = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project? This cannot be undone.");
    if (confirmDelete) {
      await supabase.from('projects').delete().match({ id });
      fetchProjects(); // Refresh list
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const tagsArray = newProject.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    const { error } = await supabase.from('projects').insert([{
      title: newProject.title,
      description: newProject.description,
      tags: tagsArray,
      github_url: newProject.github_url || null,
      live_demo_url: newProject.live_demo_url || null
    }]);

    if (error) {
      alert("Error adding project: " + error.message);
    } else {
      setNewProject({ title: '', description: '', tags: '', github_url: '', live_demo_url: '' });
      fetchProjects(); // NEW: Instantly update the list after adding
    }
    setIsSubmitting(false);
  };

  if (!session) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f172a' }}>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', background: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }}>
          <h2 style={{ color: 'white', margin: 0 }}>Admin Login</h2>
          {authError && <p style={{ color: '#f87171' }}>{authError}</p>}
          <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '0.8rem', borderRadius: '4px' }} />
          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '0.8rem', borderRadius: '4px' }} />
          <button type="submit" style={{ padding: '0.8rem', background: '#38bdf8', color: '#0f172a', fontWeight: 'bold', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', color: 'white', minHeight: '100vh', background: '#0f172a' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        
        {/* Left Column: Messages Inbox */}
        <div>
          <h3>Inbox ({messages.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '80vh', overflowY: 'auto', paddingRight: '1rem' }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ padding: '1rem', background: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <strong>{msg.name}</strong>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{new Date(msg.created_at).toLocaleDateString()}</span>
                </div>
                <div style={{ marginBottom: '1rem', color: '#38bdf8', fontSize: '0.9rem' }}>{msg.email}</div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>{msg.message}</p>
                <button onClick={() => deleteMessage(msg.id)} style={{ padding: '0.4rem 0.8rem', background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem', fontSize: '0.85rem' }}>Delete Message</button>
              </div>
            ))}
            {messages.length === 0 && <p style={{ color: '#94a3b8' }}>No new messages.</p>}
          </div>
        </div>

        {/* Right Column: Projects Management */}
        <div>
          <h3>Add New Project</h3>
          <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155', marginBottom: '2rem' }}>
            <input type="text" placeholder="Project Title" required value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})} style={{ padding: '0.8rem', borderRadius: '4px', background: '#0f172a', color: 'white', border: '1px solid #334155' }} />
            <textarea placeholder="Description" required rows="3" value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})} style={{ padding: '0.8rem', borderRadius: '4px', background: '#0f172a', color: 'white', border: '1px solid #334155' }} />
            <input type="text" placeholder="Tags (e.g., React, Java, Unity)" required value={newProject.tags} onChange={(e) => setNewProject({...newProject, tags: e.target.value})} style={{ padding: '0.8rem', borderRadius: '4px', background: '#0f172a', color: 'white', border: '1px solid #334155' }} />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input type="url" placeholder="GitHub URL (Optional)" value={newProject.github_url} onChange={(e) => setNewProject({...newProject, github_url: e.target.value})} style={{ flex: 1, padding: '0.8rem', borderRadius: '4px', background: '#0f172a', color: 'white', border: '1px solid #334155' }} />
              <input type="url" placeholder="Live Demo (Optional)" value={newProject.live_demo_url} onChange={(e) => setNewProject({...newProject, live_demo_url: e.target.value})} style={{ flex: 1, padding: '0.8rem', borderRadius: '4px', background: '#0f172a', color: 'white', border: '1px solid #334155' }} />
            </div>
            <button type="submit" disabled={isSubmitting} style={{ padding: '1rem', background: '#4ade80', color: '#0f172a', fontWeight: 'bold', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
              {isSubmitting ? 'Saving...' : 'Publish Project'}
            </button>
          </form>

          {/* Existing Projects List */}
          <h3>Manage Projects ({projects.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '50vh', overflowY: 'auto', paddingRight: '1rem' }}>
            {projects.map(proj => (
              <div key={proj.id} style={{ padding: '1rem', background: '#1e293b', borderRadius: '8px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>{proj.title}</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {proj.tags && proj.tags.map(tag => (
                      <span key={tag} style={{ background: '#334155', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => deleteProject(proj.id)} style={{ padding: '0.4rem 0.8rem', background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem', marginLeft: '1rem' }}>Delete</button>
              </div>
            ))}
          </div>

        </div>
      </div>
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
  // State for our live database projects
  const [dbProjects, setDbProjects] = useState([]);

  // Fetch projects from Supabase when the page loads
  useEffect(() => {
    const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Projects loaded from DB:", data); // THIS IS THE KEY
    setDbProjects(data);
  }
};

    fetchProjects();
  }, []);
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
  const handleSendMessage = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Trigger a loading toast that we can update later
    const toastId = toast.loading('Sending message...');

    const { error } = await supabase
      .from('messages')
      .insert([
        { name: formData.name, email: formData.email, message: formData.message }
      ]);

    if (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong. Please try again.", { id: toastId });
      setFormStatus('idle');
    } else {
      toast.success("Message sent successfully! I'll get back to you soon.", { id: toastId });
      setFormData({ name: '', email: '', message: '' }); // Clear the form
      setFormStatus('idle'); 
    }
  };
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
  if (window.location.pathname === '/admin') {
    return <AdminPanel />;
  }
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
<section id="projects" className="projects-section">
  <h2 className="section-title">Projects</h2>
  
  <div className="projects-grid">
    {dbProjects.map((project) => (
      <div className="project-card" key={project.id}>
        <div className="project-header">
          <h3>{project.title}</h3>
        </div>
        <p className="project-desc">{project.description}</p>
        
        {/* Map the PostgreSQL array of tags into nice CSS badges */}
        {/* Map the PostgreSQL array of tags into nice CSS badges */}
<div className="project-tags">
  {project.tags && project.tags.map((tag, idx) => {
    // Automatically detect if the tag is an award/achievement
    const isAward = tag.toLowerCase().includes('winner') || tag.toLowerCase().includes('prize');
    
    return (
      <span 
        key={idx} 
        className={isAward ? "tag award-badge" : "tag"}
      >
        {isAward ? `🏆 ${tag}` : tag}
      </span>
    );
  })}
</div>

        <div className="project-links">
          {project.live_demo_url && (
            <a href={project.live_demo_url} target="_blank" rel="noopener noreferrer" className="btn-outline">Live Demo</a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub</a>
          )}
        </div>
      </div>
    ))}
  </div>
</section>

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
<section id="contact" className="contact-section" style={{ padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
  <h2 className="section-title">Get In Touch</h2>
  <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Currently open for new opportunities. Send me a message and I'll get back to you!</p>
          <Toaster position="bottom-right" reverseOrder={false} />
  <form onSubmit={handleSendMessage} className="contact-form" /* ... rest of your form setup */ ></form>
  <form onSubmit={handleSendMessage} className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <input 
      type="text" 
      placeholder="Your Name" 
      required 
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: 'white' }}
    />
    <input 
      type="email" 
      placeholder="Your Email" 
      required 
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: 'white' }}
    />
    <textarea 
      placeholder="Your Message" 
      required 
      rows="5"
      value={formData.message}
      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: 'white', resize: 'vertical' }}
    ></textarea>

    <button 
      type="submit" 
      disabled={formStatus === 'submitting'}
      style={{ padding: '1rem', borderRadius: '6px', background: '#38bdf8', color: '#0f172a', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
    >
      {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
    </button>


  </form>
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
      <Analytics />

    </div>
  );
}

export default App;