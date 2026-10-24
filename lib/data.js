import { FaJava } from "react-icons/fa";
import { SiPython, SiJavascript, SiHtml5, SiCss3, SiBootstrap, SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, SiGit, SiGithub, SiThreedotjs, SiFramer } from "react-icons/si";

// Every technology: display name, logo component, brand colour
export const tech = {
  java: { name: "Java", Icon: FaJava, color: "#F0883E" },
  javascript: { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  python: { name: "Python", Icon: SiPython, color: "#4B8BBE" },
  html: { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
  css: { name: "CSS3", Icon: SiCss3, color: "#2965F1" },
  bootstrap: { name: "Bootstrap", Icon: SiBootstrap, color: "#9B6CF0" },
  react: { name: "React", Icon: SiReact, color: "#61DAFB" },
  nextjs: { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
  nodejs: { name: "Node.js", Icon: SiNodedotjs, color: "#6CC24A" },
  mongodb: { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  git: { name: "Git", Icon: SiGit, color: "#F05032" },
  github: { name: "GitHub", Icon: SiGithub, color: "#FFFFFF" },
  three: { name: "Three.js", Icon: SiThreedotjs, color: "#FFFFFF" },
  framer: { name: "Framer Motion", Icon: SiFramer, color: "#FF4F9A" },
};

// Edit these percentages to match your real usage
export const languages = [
  { key: "java", value: 30 },
  { key: "javascript", value: 25 },
  { key: "html", value: 18 },
  { key: "css", value: 17 },
  { key: "python", value: 10 },
];

export const focus = [
  { name: "Web frontend", value: 45, color: "#FFB43B" },
  { name: "Java / OOP", value: 30, color: "#6C7CFF" },
  { name: "Backend basics", value: 15, color: "#3DDC97" },
  { name: "Python", value: 10, color: "#FF6B8B" },
];

export const projects = [
  { title: "Intern Management System", status: "Featured", featured: true,
    desc: "A dashboard for managing interns: profiles, task assignment, daily attendance and progress reports, with separate views for admins and interns.",
<<<<<<< HEAD
    stack: ["react", "nodejs", "mongodb", "css"], link: "https://github.com/kapildhimal08" },
=======
    stack: ["react", "nodejs", "mongodb", "css"], demo: "intern", link: "https://github.com/kapildhimal08" },
  { title: "GitHub Portfolio Finder", status: "Finished",
    desc: "Search any GitHub username and see their profile, top repositories and most-used languages, pulled live from the GitHub API.",
    stack: ["javascript", "react", "github", "css"], demo: "finder", link: "https://github.com/kapildhimal08" },
>>>>>>> master
  { title: "Personal Details Website", status: "Finished",
    desc: "A responsive profile site with clean navigation that presents skills and projects on any screen.",
    stack: ["html", "css", "bootstrap"], link: "https://github.com/kapildhimal08" },
  { title: "Student Record Manager", status: "Finished",
    desc: "A Java console app that stores student records in files, using inheritance, polymorphism and exception handling.",
    stack: ["java"], link: "https://github.com/kapildhimal08" },
  { title: "Weather Application", status: "In progress",
    desc: "A responsive app that fetches live forecasts from a weather API and shows them in a clean interface.",
    stack: ["javascript", "react", "css"] },
  { title: "Birthday Wishing Website", status: "Next up",
    desc: "An animated greeting page with bold typography, motion and a layout that works on phones.",
    stack: ["html", "css", "javascript"] },
  { title: "This 3D Portfolio", status: "Finished",
    desc: "The site you're on: a 3D hero scene, custom cursor, animated charts and scroll effects.",
    stack: ["nextjs", "react", "three", "framer"], link: "https://github.com/kapildhimal08" },
];

export const marquee = ["java","javascript","python","html","css","bootstrap","react","nextjs","nodejs","mongodb","git","github","three","framer"];
