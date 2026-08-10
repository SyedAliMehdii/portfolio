// ===== TYPING TEXT DATA =====
const typingTexts = [
  "AI/ML Engineer",
  "Generative AI Engineer",
  "Agentic AI Developer"
];

// ===== EXPERIENCE DATA =====
const experienceData = [
  {
    role: "AI/ML Engineer",
    company: "Tech Solutions",
    duration: "2025 - Present",
    description: "Developing scalable generative AI systems, RAG architectures, and custom AI agents to automate business workflows."
  },
  {
    role: "Data Science Intern",
    company: "AI Labs",
    duration: "2024 - 2025",
    description: "Collaborated on fine-tuning open-source LLMs and analyzing datasets for predictive modeling in the healthcare domain."
  }
];

// ===== SKILLS DATA =====
const skillsData = [
  { name: "Python", level: 90 },
  { name: "RAG / LLMs", level: 85 },
  { name: "LangChain", level: 85 },
  { name: "LangGraph", level: 75 },
  { name: "CrewAI", level: 80 },
  { name: "n8n", level: 80 },
  { name: "FastAPI", level: 70 },
  { name: "Microsoft Azure AI", level: 75 },
  { name: "Git & Docker", level: 80 },
  { name: "Python", level: 90 },
  { name: "RAG / LLMs", level: 85 },
  { name: "LangChain", level: 85 }
];

// ===== PROJECTS DATA =====
// Note: Latest projects at the top
const projectsData = [
  {
    id: 4,
    title: "AI-Powered Customer Support Agent",
    description: "An automated customer support agent that utilizes a memory-augmented RAG pipeline to resolve user queries based on company documentation.",
    category: "agentic-ai",
    tags: ["LangGraph", "OpenAI", "Vector DB"],
    image: "https://placehold.co/600x400/111640/7aa8f6?text=Project+Preview",
    github: "https://github.com/syedalimehdii",
    demo: "https://example.com",
    date: "2026-08-05"
  },
  {
    id: 3,
    title: "Medical Document Analyzer",
    description: "A machine learning pipeline designed to automatically extract key medical entities and summarize patient histories from raw text.",
    category: "ml",
    tags: ["NLP", "Transformers", "spaCy"],
    image: "https://placehold.co/600x400/111640/7aa8f6?text=Project+Preview",
    github: "https://github.com/syedalimehdii",
    demo: "https://example.com",
    date: "2026-08-03"
  },
  {
    id: 2,
    title: "GitHub Bug-Fixing Agent Pipeline",
    description: "Multi-agent pipeline using CrewAI and Gemini for automated GitHub issue analysis and bug fixing via MCP. Deployed on Streamlit.",
    category: "agentic-ai",
    tags: ["CrewAI", "Gemini", "GitHub MCP", "Streamlit"],
    image: "https://placehold.co/600x400/111640/7aa8f6?text=Project+Preview",
    github: "https://github.com/syedalimehdii",
    demo: "https://example.com",
    date: "2026-08-01"
  },
  {
    id: 1,
    title: "Enterprise RAG Knowledge Base",
    description: "Production RAG system built with LangChain, Azure AI Search, and FastAPI for context-aware Q&A over enterprise documents.",
    category: "gen-ai",
    tags: ["RAG", "LangChain", "Azure AI", "FastAPI"],
    image: "https://placehold.co/600x400/111640/7aa8f6?text=Project+Preview",
    github: "https://github.com/syedalimehdii",
    demo: "https://example.com",
    date: "2026-07-15"
  }
];

// ===== CERTIFICATES DATA =====
const certificatesData = [
  { title: "Azure AI Engineer Associate", issuer: "Microsoft", date: "2025", link: "#" },
  { title: "Generative AI with Large Language Models", issuer: "DeepLearning.AI", date: "2024", link: "#" },
  { title: "Machine Learning Specialization", issuer: "Stanford Online", date: "2024", link: "#" },
  { title: "Azure AI Engineer Associate", issuer: "Microsoft", date: "2025", link: "#" },
  { title: "Generative AI with Large Language Models", issuer: "DeepLearning.AI", date: "2024", link: "#" },
  { title: "Machine Learning Specialization", issuer: "Stanford Online", date: "2024", link: "#" },
  { title: "Azure AI Engineer Associate", issuer: "Microsoft", date: "2025", link: "#" },
  { title: "Generative AI with Large Language Models", issuer: "DeepLearning.AI", date: "2024", link: "#" },
  { title: "Machine Learning Specialization", issuer: "Stanford Online", date: "2024", link: "#" }
];

// ===== ABOUT INFO DATA =====
const aboutInfoData = [
  { title: "6+ months Experience", subtitle: "AI Engineer Associate" },
  { title: "Education", subtitle: "BSCS, Virtual University" }
];

// ===== ABOUT STATS DATA =====
const aboutStatsData = [
  { number: "10+", label: "Certifications" },
  { number: "2+", label: "Internships" },
  { number: "1+", label: "Projects" },
  { number: "5+", label: "Courses" }
];
