import React, { useState, useEffect } from 'react';
import SpeedBackground from './components/SpeedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import GlassCard from './components/GlassCard';
import Modal from './components/Modal';
import Timeline from './components/Timeline';
import CustomCursor from './components/CustomCursor';
import Achievements from './components/Achievements';
import { FaLinkedin, FaGithub, FaEnvelope, FaCode, FaBrain, FaCloud, FaTools, FaUserSecret } from 'react-icons/fa';

// ==========================================
// DATA SECTIONS - EDIT CONTENT HERE
// ==========================================

// 1. EDUCATION DATA
// Add or remove education items here.
const educationData = [
  {
    year: 'Apr 2022 – Jan 2026',
    title: 'B.Tech in AI & ML',
    subtitle: 'Kalasalingam Academy of Research and Education',
    description: 'Specialization in Deep Learning & Gen AI. Core coursework: Transformer Architectures, NLP, Computer Vision, Reinforcement Learning.'
  },
  {
    year: 'Jan 2025 – May 2025',
    title: 'Semester Exchange Program',
    subtitle: 'INTI International University, Malaysia',
    description: 'International exposure focusing on advanced AI research and cross-cultural collaboration.'
  },
  {
    year: '2020 - 2022',
    title: 'Intermediate (MPC)',
    subtitle: 'Narayana Junior College',
    description: 'Foundation in Mathematics, Physics, and Chemistry. Secured top percentile in state-level entrance exams.'
  }
];

// 2. EXPERIENCE DATA
// Add your work experience here.
const experienceData = [
  {
    year: '2024 - Present',
    title: 'GEN AI R&D Intern',
    subtitle: 'Diebold Nixdorf',
    description: 'Designed and implemented robust RAG pipelines using LangChain, resulting in a 40% increase in domain-specific answer accuracy for the internal knowledge base. Led research on agentic workflows for automated customer support, reducing resolution time by 25%.'
  },
  {
    year: '2023 - 2024',
    title: 'Machine Learning Lead',
    subtitle: 'Microsoft Learn Student Club',
    description: 'Mentored 50+ students in ML concepts, organizing workshops on Azure AI services. Facilitated hands-on sessions on deploying models to the cloud, enhancing student engagement by 30%.'
  },
  {
    year: '2023',
    title: 'Research Student',
    subtitle: 'International Research Centre (MCW)',
    description: 'Conducted research on multimodal learning algorithms, contributing to a paper on efficient vision-language models. Optimized data preprocessing pipelines for large-scale image datasets, improving training speed by 15%.'
  }
];

// 3. SKILLS DATA
// Group your skills by category.
const skillsData = [
  {
    category: 'Languages',
    icon: <FaCode />,
    skills: ['Python', 'JavaScript', 'C++', 'SQL']
  },
  {
    category: 'AI & ML Frameworks',
    icon: <FaBrain />,
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV']
  },
  {
    category: 'Gen AI & LLMs',
    icon: <FaBrain />,
    skills: ['LangChain', 'LlamaIndex', 'RAG', 'HuggingFace', 'OpenAI API', 'Gemini API']
  },
  {
    category: 'Web & Cloud',
    icon: <FaCloud />,
    skills: ['React', 'Node.js', 'AWS', 'Azure', 'Flask', 'FastAPI']
  },
  {
    category: 'Tools & DevOps',
    icon: <FaTools />,
    skills: ['Docker', 'Git', 'Linux', 'PostgreSQL', 'MongoDB']
  }
];

function App() {
  const [modalData, setModalData] = useState({ isOpen: false, title: '', content: '' });
  const [isNavigating, setIsNavigating] = useState(false);

  // Trigger transition on mount and scroll
  useEffect(() => {
    // Trigger on initial load
    setIsNavigating(true);
    const initialTimeout = setTimeout(() => setIsNavigating(false), 2000);

    let scrollTimeout;
    const handleScroll = () => {
      if (!isNavigating) {
        setIsNavigating(true);
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsNavigating(false), 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(initialTimeout);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const openModal = (project) => {
    setModalData({
      isOpen: true,
      title: project.title,
      content: project.description
    });
  };

  const closeModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <CustomCursor />
      <SpeedBackground />
      <Navbar />

      <div className="content-container" style={{ position: 'relative', zIndex: 10 }}>

        {/* Hero Section */}
        <section id="home" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Hero />
        </section>

        {/* About Section - Driver Profile */}
        <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 20px' }}>
          <GlassCard style={{ maxWidth: '1000px', width: '100%', border: '1px solid rgba(255, 40, 0, 0.3)', boxShadow: '0 0 30px rgba(255, 40, 0, 0.1)', background: 'linear-gradient(135deg, rgba(20, 0, 0, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '2px solid #FF2800', paddingBottom: '15px' }}>
                <FaUserSecret style={{ fontSize: '2.5rem', color: '#FF2800' }} />
                <div>
                  <h2 style={{ fontSize: '3rem', marginBottom: '0', color: '#fff', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', letterSpacing: '2px', fontStyle: 'italic' }}>
                    ABOUT <span style={{ color: '#FF2800' }}>ME</span>
                  </h2>
                  <div style={{ fontSize: '0.9rem', color: '#aaa', letterSpacing: '3px' }}>AI ENGINEER & INNOVATOR</div>
                </div>
              </div>

              <h3 style={{ fontSize: '1.8rem', color: '#fff', fontWeight: '600' }}>
                "DRIVING <span style={{ color: '#FF2800' }}>INNOVATION</span> WITH AI"
              </h3>

              <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#e0e0e0' }}>
                I specialize in building <strong style={{ color: '#FF2800' }}>Agentic AI</strong> systems and <strong style={{ color: '#FF2800' }}>High-Performance Applications</strong>.
                My focus is on creating intelligent, scalable solutions that deliver real-world impact with speed and precision.
              </p>

              <div style={{ marginTop: '30px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontStyle: 'italic' }}>TECHNICAL SKILLS</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                  {skillsData.map((category) => (
                    <div key={category.category} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '5px', borderLeft: '3px solid #FF2800' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', color: '#FF2800' }}>
                        {category.icon}
                        <h4 style={{ margin: 0, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{category.category}</h4>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {category.skills.map(skill => (
                          <span key={skill} style={{
                            padding: '6px 12px',
                            background: 'rgba(0, 0, 0, 0.5)',
                            border: '1px solid rgba(255, 40, 0, 0.3)',
                            borderRadius: '2px',
                            fontSize: '0.85rem',
                            color: '#fff'
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Experience Section - Track Record */}
        <section id="experience" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 20px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '3rem', color: '#fff', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', letterSpacing: '2px', fontStyle: 'italic' }}>
            TRACK <span style={{ color: '#FF2800' }}>RECORD</span>
          </h2>
          <div style={{ width: '100%', maxWidth: '1000px', background: 'rgba(10, 10, 10, 0.8)', padding: '40px', borderRadius: '20px', border: '1px solid #333', boxShadow: '0 0 30px rgba(0,0,0,0.5)' }}>
            <Timeline items={experienceData} />
          </div>
        </section>

        {/* Achievements Section - Trophy Cabinet */}
        <section id="achievements" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 20px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '3rem', color: '#fff', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', letterSpacing: '2px', fontStyle: 'italic' }}>
            TROPHY <span style={{ color: '#FF2800' }}>CABINET</span>
          </h2>
          <Achievements />
        </section>

        {/* Education Section - Pit Stops */}
        <section id="education" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 20px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '3rem', color: '#fff', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', letterSpacing: '2px', fontStyle: 'italic' }}>
            PIT <span style={{ color: '#FF2800' }}>STOPS</span>
          </h2>
          <div style={{ width: '100%', maxWidth: '1000px', background: 'rgba(20, 20, 20, 0.8)', padding: '40px', borderRadius: '20px', border: '1px solid rgba(255, 40, 0, 0.2)' }}>
            <Timeline items={educationData} />
          </div>
        </section>

        {/* Projects Section - The Garage */}
        <section id="projects" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 20px' }}>
          <Projects onOpenModal={openModal} />
        </section>

        {/* Contact Section - Finish Line */}
        <section id="contact" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <GlassCard style={{ maxWidth: '600px', width: '100%', border: '2px solid #FF2800', boxShadow: '0 0 30px rgba(255, 40, 0, 0.2)', background: 'linear-gradient(135deg, rgba(20, 0, 0, 0.9) 0%, rgba(40, 0, 0, 0.9) 100%)' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: '#fff', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', fontStyle: 'italic' }}>FINISH LINE</h2>
              <p style={{ color: '#FF2800', letterSpacing: '2px', marginBottom: '30px' }}>READY TO RACE?</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <a href="mailto:mahaveer96399@gmail.com" style={{ color: '#fff', fontSize: '1.3rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', padding: '15px', background: 'rgba(255, 40, 0, 0.1)', borderRadius: '50px', border: '1px solid #FF2800', transition: 'all 0.3s ease' }}>
                <FaEnvelope style={{ color: '#FF2800' }} /> mahaveer96399@gmail.com
              </a>
              <div style={{ display: 'flex', gap: '20px', fontSize: '2rem', marginTop: '10px', justifyContent: 'center' }}>
                <a href="https://linkedin.com/in/mahaveer-tirumalasetty" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', opacity: 0.8, transition: 'all 0.3s ease' }}><FaLinkedin /></a>
                <a href="https://github.com/Mahaveer36" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', opacity: 0.8, transition: 'all 0.3s ease' }}><FaGithub /></a>
              </div>
            </div>
          </GlassCard>
        </section>

      </div>

      <Modal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        title={modalData.title}
        content={modalData.content}
      />
    </div>
  );
}

export default App;
