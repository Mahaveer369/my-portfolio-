import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import { FaTrophy, FaMedal, FaUserTie } from 'react-icons/fa';

const achievementsData = [
    {
        id: 1,
        title: 'AI Forgue Genius Top 7',
        subtitle: 'National Level Competition',
        icon: <FaTrophy />,
        description: 'Secured top 7 position in a national level AI hackathon, showcasing advanced problem-solving skills in generative AI.',
        date: '2024'
    },
    {
        id: 2,
        title: 'Intel GENAI 24 Hackathon',
        subtitle: 'Winner/Runner-Up',
        icon: <FaMedal />,
        description: 'Developed an innovative multimodal RAG solution using Intel OpenVINO toolkit, recognized for technical excellence.',
        date: '2024'
    },
    {
        id: 3,
        title: 'IEEE Robotics Competition',
        subtitle: 'Finalist',
        icon: <FaMedal />,
        description: 'Designed autonomous navigation algorithms for mobile robots, demonstrating proficiency in robotics and control systems.',
        date: '2023'
    },
    {
        id: 4,
        title: 'GEN AI R&D Intern',
        subtitle: 'Diebold Nixdorf',
        icon: <FaUserTie />,
        description: 'Led research initiatives on agentic workflows and large language model optimization for enterprise banking solutions.',
        date: '2024 - Present'
    },
    {
        id: 5,
        title: 'Machine Learning Lead',
        subtitle: 'Microsoft Learn Student Club',
        icon: <FaUserTie />,
        description: 'Mentored 50+ students in ML concepts and organized workshops on Azure AI services.',
        date: '2023 - 2024'
    }
];

const Achievements = () => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', width: '100%', maxWidth: '1200px' }}>
            {achievementsData.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                >
                    <GlassCard style={{ height: '100%', border: '1px solid rgba(0, 255, 255, 0.1)', background: 'rgba(10, 10, 10, 0.6)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                            <div style={{
                                padding: '12px',
                                background: 'rgba(0, 255, 255, 0.1)',
                                borderRadius: '12px',
                                color: '#00FFFF',
                                fontSize: '1.5rem'
                            }}>
                                {item.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>{item.title}</h3>
                                <span style={{ fontSize: '0.9rem', color: '#00FFFF' }}>{item.subtitle}</span>
                            </div>
                        </div>
                        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '15px' }}>
                            {item.description}
                        </p>
                        <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                            {item.date}
                        </div>
                    </GlassCard>
                </motion.div>
            ))}
        </div>
    );
};

export default Achievements;
