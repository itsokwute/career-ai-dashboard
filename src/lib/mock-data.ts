export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  source: "LinkedIn" | "Indeed" | "Glassdoor";
  status: "New" | "Applied" | "Reviewed" | "Rejected";
  postedAt: string;
  description: string;
  matchScore: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  stage: string;
  status: "success" | "running" | "error";
  result: string;
}

export const mockJobs: Job[] = [
  { id: "1", title: "Senior Frontend Engineer", company: "Stripe", location: "Remote", source: "LinkedIn", status: "New", postedAt: "2h ago", description: "We are looking for a Senior Frontend Engineer to join our team and help build the future of online payments. You will work with React, TypeScript, and modern web technologies to create beautiful, performant UIs.", matchScore: 94 },
  { id: "2", title: "Full Stack Developer", company: "Vercel", location: "San Francisco, CA", source: "LinkedIn", status: "New", postedAt: "4h ago", description: "Join Vercel to build the platform that powers the modern web. Work on Next.js, edge computing, and developer tools.", matchScore: 89 },
  { id: "3", title: "Product Designer", company: "Linear", location: "Remote", source: "Indeed", status: "Applied", postedAt: "1d ago", description: "Design the future of project management tools. Work closely with engineering to ship pixel-perfect interfaces.", matchScore: 78 },
  { id: "4", title: "Backend Engineer", company: "Notion", location: "New York, NY", source: "Glassdoor", status: "Reviewed", postedAt: "1d ago", description: "Build scalable backend systems that power millions of workspaces. Experience with distributed systems required.", matchScore: 85 },
  { id: "5", title: "DevOps Engineer", company: "Datadog", location: "Boston, MA", source: "LinkedIn", status: "New", postedAt: "3h ago", description: "Help us scale our monitoring platform. Experience with Kubernetes, Terraform, and CI/CD pipelines.", matchScore: 72 },
  { id: "6", title: "Machine Learning Engineer", company: "OpenAI", location: "San Francisco, CA", source: "Indeed", status: "New", postedAt: "6h ago", description: "Work on cutting-edge AI models. Strong background in deep learning and Python required.", matchScore: 91 },
  { id: "7", title: "React Developer", company: "Shopify", location: "Remote", source: "LinkedIn", status: "Applied", postedAt: "2d ago", description: "Build commerce experiences used by millions of merchants worldwide.", matchScore: 88 },
  { id: "8", title: "Staff Engineer", company: "Figma", location: "San Francisco, CA", source: "Glassdoor", status: "New", postedAt: "5h ago", description: "Lead technical initiatives on the Figma editor. Deep experience with WebGL and performance optimization.", matchScore: 82 },
];

export const mockLogs: LogEntry[] = [
  { id: "1", timestamp: "2024-03-15 14:32:01", stage: "Collect Jobs", status: "success", result: '{ "jobs_found": 156, "sources": ["LinkedIn", "Indeed", "Glassdoor"] }' },
  { id: "2", timestamp: "2024-03-15 14:32:18", stage: "Normalize Data", status: "success", result: '{ "normalized": 156, "format": "standard_v2" }' },
  { id: "3", timestamp: "2024-03-15 14:32:34", stage: "Remove Duplicates", status: "success", result: '{ "duplicates_removed": 24, "remaining": 132 }' },
  { id: "4", timestamp: "2024-03-15 14:33:01", stage: "Fetch Job Description", status: "success", result: '{ "fetched": 132, "failed": 3, "status": 200 }' },
  { id: "5", timestamp: "2024-03-15 14:35:22", stage: "Generate Resume", status: "success", result: '{ "resumes_generated": 8, "avg_match": "87%" }' },
  { id: "6", timestamp: "2024-03-15 14:36:45", stage: "Generate Cover Letter", status: "running", result: '{ "processing": 4, "completed": 4 }' },
  { id: "7", timestamp: "2024-03-15 14:37:00", stage: "Send Email", status: "error", result: '{ "error": "SMTP timeout", "retry_in": "5m" }' },
];

export const mockDashboardStats = {
  totalJobsToday: 156,
  afterFiltering: 132,
  processedByAI: 42,
  emailsSent: 8,
  lastRun: "14 minutes ago",
};

export const mockChartData = {
  sourcesDistribution: [
    { name: "LinkedIn", value: 68 },
    { name: "Indeed", value: 45 },
    { name: "Glassdoor", value: 19 },
  ],
  jobsPerDay: [
    { date: "Mon", jobs: 89 },
    { date: "Tue", jobs: 112 },
    { date: "Wed", jobs: 98 },
    { date: "Thu", jobs: 145 },
    { date: "Fri", jobs: 132 },
    { date: "Sat", jobs: 67 },
    { date: "Sun", jobs: 156 },
  ],
};

export const mockResume = {
  summary: "Experienced full-stack engineer with 7+ years building scalable web applications. Specialized in React, TypeScript, and Node.js with a track record of shipping high-impact products at fast-growing startups.",
  experience: [
    { company: "TechCorp", role: "Senior Frontend Engineer", period: "2022 - Present", description: "Led the frontend architecture migration to React 18 with TypeScript. Improved Core Web Vitals by 40%. Mentored a team of 4 junior developers." },
    { company: "StartupXYZ", role: "Full Stack Developer", period: "2019 - 2022", description: "Built the core product from 0 to 50k users. Implemented real-time collaboration features using WebSockets. Reduced API response times by 60%." },
    { company: "AgencyPro", role: "Frontend Developer", period: "2017 - 2019", description: "Developed responsive web applications for enterprise clients. Created a reusable component library used across 12 projects." },
  ],
  skills: ["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "AWS", "Docker", "GraphQL", "Tailwind CSS", "Next.js"],
  education: [{ school: "MIT", degree: "B.S. Computer Science", year: "2017" }],
};

export const mockCoverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the Senior Frontend Engineer position at Stripe. With over 7 years of experience building high-performance web applications using React and TypeScript, I am confident that my skills and passion align perfectly with your team's mission.

At TechCorp, I led the migration of our frontend architecture to React 18, resulting in a 40% improvement in Core Web Vitals. I have extensive experience building payment interfaces and financial dashboards that handle complex state management and real-time data.

I am particularly drawn to Stripe's commitment to developer experience and building tools that power the internet economy. I would love the opportunity to contribute to your mission.

Best regards,
John Doe`;
