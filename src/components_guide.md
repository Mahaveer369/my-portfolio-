📘 Component Guide
This guide explains what each file in your project does, so you can easily make changes.

📂 Main Files
src/App.jsx
The Brain of the Website.

What's inside:
Data Sections: At the top, you'll find educationData, experienceData, and skillsData. Edit these arrays to change your text.
Structure: It puts all the pieces together (Navbar, Hero, About, Projects, etc.).
Theme: It sets the overall layout and background.
Tech Used: React (useState, useEffect) for managing state and scroll events.
src/components/Navbar.jsx
The Top Navigation Bar.

What's inside:
The Logo ("MAHAVEER TIRUMALASETTY").
The Links (Home, About Me, Experience, etc.).
To change: Edit the navItems array to change link names or add new ones.
Tech Used: standard CSS for glassmorphism, React for scroll detection.
src/components/Hero.jsx
The First Thing People See.

What's inside:
Your main introduction text.
The "Download Resume" button.
To change: Edit the text inside the <h1> and <p> tags.
Tech Used: framer-motion for the text fade-in animation.
src/components/Projects.jsx
Your Project Showcase ("The Garage").

What's inside:
The list of projects.
To change: Look for projectsData inside this file (or passed from App.jsx) to add new projects.
Tech Used: GlassCard component, CSS Grid for layout.
src/components/SpeedBackground.jsx
The Red Neon Tunnel.

What's inside:
The 3D animation code.
To change: You can adjust uColor (color) or speed in the shader code.
Tech Used:
@react-three/fiber (React wrapper for Three.js).
THREE.ShaderMaterial (Custom graphics code).
@react-three/postprocessing (Bloom/Glow effects).
📂 Smaller Components
GlassCard.jsx:
Uses: framer-motion for tilt effects and animations.
Purpose: A reusable box with a glass-like effect.
Timeline.jsx:
Uses: framer-motion for animating items into view.
Purpose: The vertical line showing your history.
Achievements.jsx:
Uses: react-icons for the trophy icons.
Purpose: The section showing your awards.
Modal.jsx:
Uses: framer-motion for the pop-up animation (AnimatePresence).
Purpose: The pop-up window for project details.
CustomCursor.jsx:
Uses: useEffect to track mouse position.
Purpose: The custom mouse cursor effect.
🛠️ How to Edit Content
Go to 
src/App.jsx
.
Scroll to the top.
Find the DATA SECTIONS.
Change the text inside the quotes ' '.
Save the file, and the website updates instantly!