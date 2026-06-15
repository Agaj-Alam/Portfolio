import cloudComputingPdf from '../assets/Cloud Computing.pdf';
import discreteMathPdf from '../assets/Discrete Mathematics.pdf';
import dsaPdf from '../assets/DSA.pdf';
import javaPdf from '../assets/Programming in Java.pdf';
import CodingShuttle from "../assets/CodingShuttle.png";

import subharti1 from '../assets/subharti/1.png';
import subharti2 from '../assets/subharti/2.png';
import subharti3 from '../assets/subharti/3.png';
import subharti4 from '../assets/subharti/4.png';
import spotify from '../assets/spotify.png';
import gemini from '../assets/gemini.png';

export const PROJECTS = [
  {
    id: 1,
    title: "AI Powered Subharti University App",
    category: "Mobile App",
    tags: ["React Native", "Java", "Spring Boot", "MySQL"],
    description: "A comprehensive mobile application for Subharti University students featuring fee details, AI assistance, leave management, and dashboard customization.",
    problem:
      "Students lacked a unified platform for accessing university services and managing administrative tasks.",
    solution:
      "A centralized app with an AI assistant, customizable dashboard, and service integration.",
    challenges:
      "Integrating multiple university systems into a single seamless mobile experience.",
    result: "Improved student engagement and streamlined administrative processes.",
    color: "#6ee7b7",
    accent: "#059669",
    images: [subharti1, subharti2, subharti3, subharti4],
    live: "#",
    github: "https://github.com/Agaj-Alam/Ai-Powered-Collage-App",
  },
  {
    id: 2,
    title: "Gemini-Clone",
    category: "Frontend",
    tags: ["React.js", "Gemini API", "Bootstrap"],
    description:
      "A Gemini-inspired AI chatbot interface built using React.js, capable of generating real-time responses using the Gemini API.",
    problem:
      "Understanding how modern AI chat applications work and implementing a responsive, interactive UI for real-time conversations.",
    solution:
      "Developed a chatbot interface that integrates with the Gemini API to fetch and display AI-generated responses dynamically.",
    challenges:
      "Handling API responses efficiently and managing loading states.",
    result:
      "Successfully built a functional AI chatbot clone.",
    color: "#c4b5fd",
    accent: "#7c3aed",
    images: [gemini],
    live: "#",
    github: "https://github.com/Agaj-Alam/React-js/tree/main/gemini-clone",
  },
  {
    id: 3,
    title: "Hospital Management System (Backend)",
    category: "Backend",
    tags: ["Java", "Spring Boot", "MySQL", "REST API"],
    description:
      "A backend system built with Spring Boot to manage hospital operations.",
    problem:
      "Managing hospital data manually is inefficient.",
    solution:
      "Developed REST APIs for doctor availability and appointments.",
    challenges:
      "Handling database relationships and CRUD operations.",
    color: "#fde68a",
    accent: "#d97706",
    live: "#",
    github: "https://github.com/Agaj-Alam/Hospital-Management-System",
  },
  {
    id: 4,
    title: "Spotify Clone",
    category: "Frontend",
    tags: ["React.js", "JavaScript", "CSS", "HTML"],
    description:
      "A Spotify-inspired music player web app.",
    problem:
      "Understanding UI + audio playback.",
    solution:
      "Built responsive UI with playback controls.",
    challenges:
      "Syncing UI with audio state.",
    color: "#86efac",
    accent: "#22c55e",
    images: [spotify],
    live: "#",
    github: "https://github.com/Agaj-Alam/Spotify_clone",
  },
];

export const SKILLS = {
  Frontend: [
    { name: "React.js", icon: "⚛", level: 5 },
    { name: "React Native", icon: "📱", level: 4 },
    { name: "JavaScript", icon: "JS", level: 5 },
    { name: "CSS/Tailwind", icon: "◈", level: 5 },
    { name: "Framer Motion", icon: "✦", level: 4 },
    { name: "Bootstrap", icon: "🅱️", level: 4 },
  ],
  Backend: [
    { name: "Java", icon: "☕", level: 5 },
    { name: "Spring Boot/Restful API", icon: "🍃", level: 5 },
    { name: "MySQL & PostgreSQL", icon: "🗄️", level: 4 },
  ],
  Tools: [
    { name: "VS Code", icon: "💻", level: 5 },
    { name: "IntelliJ IDEA", icon: "🚀", level: 5 },
    { name: "Postman", icon: "📬", level: 5 },
    { name: "Git / GitHub", icon: "🐙", level: 5 },
    { name: "OpenAI API", icon: "◆", level: 5 },
  ],
};

export const ACHIEVEMENTS = [
  {
    year: "2025",
    title: "Spring Boot 0 To 100 Cohort 3.0",
    org: "Coding Shuttle",
    type: "Certification",
    note: "Completed",
    pdf: CodingShuttle
  },
  {
    year: "2023",
    title: "Data Structures and Algorithms",
    org: "NPTEL",
    type: "nptel",
    note: "Certification",
    pdf: dsaPdf
  },
  {
    year: "2024",
    title: "Discrete Mathematics",
    org: "NPTEL",
    type: "nptel",
    note: "Certification",
    pdf: discreteMathPdf
  },
  {
    year: "2024",
    title: "Programming in Java",
    org: "NPTEL",
    type: "nptel",
    note: "Certification",
    pdf: javaPdf
  },
  {
    year: "2025",
    title: "Cloud Computing",
    org: "NPTEL",
    type: "nptel",
    note: "Certification",
    pdf: cloudComputingPdf
  }
];

export const APPROACHES = [
  {
    id: 1,
    title: "Clean & Scalable Backend Design",
    description:
      "I follow layered architecture (Controller → Service → Repository) to build maintainable and scalable backend systems.",
    tag: "Architecture",
    emoji: "⚙",
  },
  {
    id: 2,
    title: "User-Centered UI Development",
    description:
      "I build responsive and modern interfaces using React and Bootstrap, focusing on smooth user experience.",
    tag: "Frontend",
    emoji: "✦",
  },
  {
    id: 3,
    title: "Efficient Data Handling",
    description:
      "I design optimized database schemas and use MySQL effectively for fast and reliable performance.",
    tag: "Database",
    emoji: "◈",
  },
  {
    id: 4,
    title: "Real-World Problem Solving",
    description:
      "I focus on solving practical problems like appointment systems, dashboards, and real user workflows.",
    tag: "Problem Solving",
    emoji: "◆",
  },

];

// ─── HOOKS ───────────────────────────────────────────────────────────────────
