"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";
import { tech, marquee } from "../lib/data";

// three.js only runs in the browser, so it is loaded without SSR
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });
const roles = ["responsive websites", "Java programs", "React interfaces", "real-world projects"];

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2400); return () => clearInterval(t); }, []);
  const words = "Kapil Dhimal".split(" ");
  const loop = [...marquee, ...marquee];

  return (
    <>
      <section id="home" className="hero">
        <div className="hero3d" aria-hidden="true"><Scene3D /></div>
        <div className="wrap hero-inner">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            BCA student in Kathmandu, Nepal
          </motion.p>
          <h1 aria-label="Kapil Dhimal">
            {words.map((w, wi) => (
              <span className="word" key={w} aria-hidden="true">
                {w.split("").map((c, k) => (
                  <span className="mask" key={k}>
                    <motion.span initial={{ y: "115%", rotate: 10 }} animate={{ y: 0, rotate: 0 }}
                      transition={{ delay: 0.25 + (wi * 6 + k) * 0.045, duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }}>{c}</motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="role">I'm learning to build
            <AnimatePresence mode="wait">
              <motion.b key={i} initial={{ y: 22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -22, opacity: 0 }} transition={{ duration: 0.3 }}>
                {roles[i]}
              </motion.b>
            </AnimatePresence>
          </p>
          <motion.div className="cta" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
            <Magnetic><a className="btn" href="#projects">See my projects</a></Magnetic>
            <Magnetic><a className="btn ghost" href="#contact">Get in touch</a></Magnetic>
          </motion.div>
        </div>
      </section>
      <div className="marquee" aria-label="Technologies I use">
        <div className="track">
          {loop.map((k, n) => { const t = tech[k]; return (
            <span className="chip" key={n}><t.Icon size={24} color={t.color} />{t.name}</span>
          ); })}
        </div>
      </div>
    </>
  );
}
