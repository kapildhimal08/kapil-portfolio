"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <header className="nav">
      <div className="wrap">
        <a className="logo" href="#home">kapil<span>.dev</span></a>
        {["projects", "skills", "about", "contact"].map((s) => (
          <a key={s} className="l" href={`#${s}`}>{s[0].toUpperCase() + s.slice(1)}</a>
        ))}
      </div>
      <motion.div className="progress" style={{ scaleX }} />
    </header>
  );
}
