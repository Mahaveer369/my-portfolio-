import React from 'react';
import GlassCard from './GlassCard';
import { FaArrowRight } from 'react-icons/fa';

const projectsData = [
    {
        id: 1,
        title: "MAVIS",
        subtitle: "Multi-Agent Video Intelligent System",
        description: "Developed a video intelligence system using a multi-agent architecture and the ReAct framework for dynamic task execution. Built a full RAG pipeline utilizing Whisper for transcription, HuggingFace for embeddings, and a FAISS vector database for retrieval. Integrated Google Gemini LLM for agentic reasoning.",
        githubLink: "https://github.com/Mahaveer369/MultiAgent-Video-Intellligent-System-MAVIS.git"
    },
    {
        id: 2,
        title: "Gen AI Voice Assistant",
        subtitle: "Real Estate Agent",
        description: "Real-time PropTech AI Voice Assistant. Developed a high-performance voice-activated AI concierge using Python, Gradio, and LangChain. Integrated OpenAI Whisper for speech-to-text and Google Gemini for context-aware responses, utilizing FAISS for efficient RAG-based document retrieval.",
        githubLink: "https://github.com/Mahaveer369/GEN-AI-BASED-VOICE-ASSISTANT-.git"
    }
];

const Projects = ({ onOpenModal }) => {
    return (
        <section id="projects" style={{ maxWidth: '1000px', margin: '80px auto', padding: '20px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#fff', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', letterSpacing: '2px', fontStyle: 'italic' }}>
                THE <span style={{ color: '#FF2800' }}>GARAGE</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                {projectsData.map((project) => (
                    <a
                        key={project.id}
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
                    >
                        <GlassCard
                            className="project-card"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                border: '1px solid rgba(255, 40, 0, 0.3)',
                                boxShadow: '0 0 20px rgba(255, 40, 0, 0.1)',
                                background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease'
                            }}
                        >
                            <h3 style={{ color: '#FF2800', marginBottom: '10px', fontSize: '1.5rem' }}>{project.title}</h3>
                            <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '15px', fontWeight: '600' }}>{project.subtitle}</p>
                            <p style={{ fontSize: '0.95rem', color: '#d0d0d0', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                                {project.description}
                            </p>
                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '5px', color: '#fff', fontSize: '0.9rem', fontWeight: '600' }}>
                                View on GitHub <FaArrowRight style={{ color: '#FF2800' }} />
                            </div>
                        </GlassCard>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Projects;
