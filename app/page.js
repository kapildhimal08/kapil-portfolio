import Providers from "../components/Providers";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import { About, Contact } from "../components/AboutContact";

export default function Page() {
  return (
    <Providers>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <footer className="footer wrap">
        <span>© 2026 Kapil Dhimal</span>
        <span>
          <a href="https://github.com/kapildhimal08" target="_blank" rel="noopener">GitHub</a>
          <a href="https://linkedin.com/in/kapil-dhimal" target="_blank" rel="noopener">LinkedIn</a>
          <a href="#home">Back to top</a>
        </span>
      </footer>
    </Providers>
  );
}
