// All site content lives here. Source of truth: ../../content (portfolio_kb.txt, resume.txt).
// Don't add claims, numbers, or projects that aren't in those files.

export const siteUrl = 'https://abdullahrasheed.tech';

export const personal = {
  name: 'Muhammad Abdullah Rasheed',
  shortName: 'Abdullah',
  initials: 'MA',
  title: 'AI Engineer',
  tagline: 'Engineering Useful AI Systems',
  headline: ['Generative AI', 'LLM Applications', 'Agentic AI', 'Python'],
  summary:
    'I build practical AI systems across Generative AI, LLM applications and RAG, agentic AI, machine learning, and computer vision, using Python and API-oriented backend development.',
  location: 'Lahore, Pakistan',
  email: 'abdullahrasheed1022@gmail.com',
  github: 'https://github.com/abdullahrasheed102',
  linkedin: 'https://www.linkedin.com/in/abdullah-rasheed1/',
  resumeUrl: '/resume.pdf',
  photo: '/abdullah.webp',
  openTo: 'AI Engineer opportunities, AI/ML roles, internships, Python/backend work, and interesting AI projects',
};

export type ExpertiseIcon = 'network' | 'database' | 'sparkles' | 'brain' | 'box' | 'server';

export const expertise: { icon: ExpertiseIcon; title: string; description: string }[] = [
  {
    icon: 'network',
    title: 'Agentic AI & Multi-Agent Systems',
    description: 'CrewAI and LangChain workflows that classify descriptions, analyze requirements, and match them against developer skills.',
  },
  {
    icon: 'database',
    title: 'LLM Applications & RAG',
    description: 'LLM-powered applications built with prompt engineering, retrieval-augmented generation, the Gemini API, and Hugging Face.',
  },
  {
    icon: 'sparkles',
    title: 'Generative AI',
    description: 'Pipelines that combine image analysis, LLM text generation, and image-generation models to create new content.',
  },
  {
    icon: 'brain',
    title: 'Machine Learning & NLP',
    description: 'Data preprocessing, model training and evaluation, deep learning, and NLP with Scikit-learn, NumPy, and Pandas.',
  },
  {
    icon: 'box',
    title: 'Computer Vision & 3D Data',
    description: 'Mesh and point-cloud processing, segmentation, storage design, and color-overlay visualization with Three.js.',
  },
  {
    icon: 'server',
    title: 'Python Backend & APIs',
    description: 'Python backend development, Flask API routes, and REST and third-party API integration.',
  },
];

export const experience = [
  {
    role: 'AI Engineer Intern',
    company: 'Deep Cognitive Solutions',
    dates: 'Mar 2026 – Sep 2026',
    project: '3D Data Processing & Visualization Proof of Concept',
    highlights: [
      'Built a proof of concept for 3D mesh and point-cloud processing, segmentation, and visualization.',
      'Developed Python data-processing components with NumPy and Pandas for 3D mesh and point-cloud data.',
      'Designed a storage schema for 3D meshes and point clouds.',
      'Built a minimal Three.js viewer that renders color overlays on processed 3D data.',
    ],
    technologies: ['Python', 'NumPy', 'Pandas', 'Three.js', '3D Segmentation'],
  },
  {
    role: 'AI Engineer Intern',
    company: 'Mindrind (SMC-Private) Limited',
    dates: 'May 2025 – Aug 2025',
    project: 'Multi-Agent Job & Project Matching System',
    highlights: [
      'Developed a multi-agent CrewAI workflow that classifies job and project descriptions, analyzes project requirements, and evaluates job-skill matches.',
      'Integrated CrewAI workflows with Flask REST API routes and a React interface (Axios) so users can submit descriptions and view structured results.',
      'Configured job analysis to compare extracted requirements against developer skills and return matched skills, gaps, a verdict, and follow-up questions.',
      'Added a Serper search tool to support agent-driven skill research.',
    ],
    technologies: ['Python', 'CrewAI', 'Flask', 'React', 'Axios', 'SerperDevTool'],
  },
];

export const projects: {
  title: string;
  category: string;
  summary: string;
  stack: string[];
  result: string;
  github?: string;
  gradient: [string, string];
}[] = [
  {
    title: 'NOVA AI Virtual Assistant',
    category: 'Voice assistant · Final-year project',
    summary:
      'A PyQt5 desktop voice assistant with microphone speech recognition, spoken replies, and phrase-based command routing for web search, weather, media playback, and system actions.',
    stack: ['Python', 'PyQt5', 'SpeechRecognition', 'pyttsx3', 'googletrans', 'mtranslate'],
    result: 'Runs voice-triggered desktop and information commands, with translation helpers via googletrans and mtranslate.',
    github: 'https://github.com/abdullahrasheed102/Nova-AI-FYP',
    gradient: ['var(--neon-cyan)', 'var(--neon-blue)'],
  },
  {
    title: 'Job & Project Matching System',
    category: 'Agentic AI · Internship project',
    summary:
      'A React interface and Flask API that call CrewAI workflows to classify job or project descriptions, analyze project requests, and evaluate job requirements against developer skills.',
    stack: ['Python', 'Flask', 'CrewAI', 'React', 'Axios', 'SerperDevTool'],
    result: 'The API returns a description type, a project analysis, or job skill matches, gaps, a verdict, and follow-up questions.',
    github: 'https://github.com/abdullahrasheed102/Job-Project-Matching-System',
    gradient: ['var(--neon-blue)', 'var(--neon-purple)'],
  },
  {
    title: '3D Data Processing & Visualization',
    category: '3D data · Internship proof of concept',
    summary:
      'Python processing components, a storage schema for meshes and point clouds, and a minimal Three.js viewer for inspecting processed 3D data.',
    stack: ['Python', 'NumPy', 'Pandas', 'Three.js', 'Mesh & Point-Cloud Data'],
    result: 'The proof of concept displays color overlays on processed 3D data.',
    gradient: ['var(--neon-purple)', 'var(--neon-cyan)'],
  },
  {
    title: 'AI Instagram Post Generator',
    category: 'Generative AI',
    summary:
      'A LangChain agent that extracts public Instagram post metadata, analyzes the image with BLIP, asks Gemini for a caption, hashtags, and an image prompt, then generates an image with FLUX.1-dev.',
    stack: ['Python', 'LangChain', 'Google Gemini', 'Hugging Face Inference API', 'Hugging Face Transformers', 'Selenium', 'BeautifulSoup', 'Pillow', 'Tavily', 'instagrapi'],
    result: 'Saves the generated image locally and includes terminal approval and Instagram photo-upload tools in the workflow.',
    github: 'https://github.com/abdullahrasheed102/post-generator',
    gradient: ['var(--neon-cyan)', 'var(--neon-purple)'],
  },
];

export const techStack: Record<string, string[]> = {
  'Generative AI & Agents': ['LLMs', 'RAG', 'Prompt Engineering', 'AI Agents', 'Multi-Agent Systems', 'LangChain', 'CrewAI', 'Gemini API', 'Hugging Face'],
  'Programming & Backend': ['Python', 'Python Backend Development', 'Flask', 'REST API Integration', 'Third-Party API Integration'],
  'Machine Learning': ['Machine Learning', 'Deep Learning', 'NLP', 'Scikit-learn', 'Model Training & Evaluation'],
  'Data & Computer Vision': ['NumPy', 'Pandas', 'Data Preprocessing', 'Computer Vision', 'Segmentation'],
  '3D Data & Visualization': ['Mesh Data', 'Point-Cloud Data', 'Three.js', 'Color-Overlay Visualization', 'Matplotlib'],
  'Tools': ['Git', 'GitHub', 'Jupyter Notebook'],
};

export type MetricIcon = 'briefcase' | 'folder' | 'award' | 'graduation';

export const metrics: { icon: MetricIcon; value: string; label: string; description: string }[] = [
  { icon: 'briefcase', value: '2', label: 'AI Engineering Internships', description: 'Deep Cognitive Solutions and Mindrind' },
  { icon: 'folder', value: '4', label: 'Featured Projects', description: 'Agentic AI, generative AI, 3D data, and voice' },
  { icon: 'award', value: '4', label: 'Certifications', description: 'Python, data analysis, and AI (Udemy & Coursera)' },
  { icon: 'graduation', value: '3.18', label: 'CGPA out of 4.0', description: 'BS Artificial Intelligence' },
];

export const education = [
  {
    degree: 'BS Artificial Intelligence',
    institution: 'The Islamia University of Bahawalpur, Pakistan',
    dates: '2021 – 2025',
    result: 'CGPA 3.18 / 4.0',
    details: 'Relevant coursework: Machine Learning, Deep Learning, Statistics and Probability.',
  },
  {
    degree: 'Intermediate',
    institution: 'Punjab Group of Colleges, Jahanian Campus',
    dates: '2018 – 2020',
    result: '862 / 1100',
  },
];

export const certifications = [
  { name: 'Python: Master Programming and Development with 15 Projects', issuer: 'Udemy' },
  { name: 'Python for Data Analysis: Pandas and NumPy', issuer: 'Coursera' },
  { name: 'Data Visualization and Storytelling in Python', issuer: 'Coursera' },
  { name: 'AI For Everyone', issuer: 'Coursera' },
];

export const about = [
  "I'm a BS Artificial Intelligence graduate from The Islamia University of Bahawalpur, with hands-on experience from two AI engineering internships and applied projects across generative AI, LLM applications, RAG, AI agents, machine learning, computer vision, and 3D data.",
  'My focus is building practical AI-powered systems: applications that connect models, data, APIs, and useful workflows, built with Python and API-oriented backend development.',
  "I'm continuing to grow as an early-career AI engineer, and I'm open to AI Engineer opportunities, AI/ML roles, internships, Python/backend work, and interesting AI projects.",
];

export const navLinks = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];
