"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { projects, tech } from "../lib/data";
import GithubFinder from "./GithubFinder";
import InternManager from "./InternManager";

function Card({ p, i, onOpen }) {
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const rotY = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 200, damping: 20 });
  const rotX = useSpring(useTransform(my, [0, 1], [9, -9]), { stiffness: 200, damping: 20 });
  const gx = useTransform(mx, (v) => `${v * 100}%`), gy = useTransform(my, (v) => `${v * 100}%`);
  const spot = useMotionTemplate`radial-gradient(320px circle at ${gx} ${gy}, rgba(255,180,59,.16), transparent 70%)`;

  return (
    <motion.article data-hover className={`card${p.featured ? " featured" : ""}`}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900, backgroundImage: spot }}
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
      onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width); my.set((e.clientY - r.top) / r.height); }}
      onPointerLeave={() => { mx.set(0.5); my.set(0.5); }}>
      <span className={`badge${p.featured ? " hot" : ""}`}>{p.status}</span>
      <h3>{p.title}</h3>
      <p>{p.desc}</p>
      <div className="logos">
        {p.stack.map((k) => { const t = tech[k]; return (
          <span className="logo-i" key={k}><t.Icon size={18} color={t.color} />{t.name}</span>
        ); })}
      </div>
      <div className="actions">
        {p.demo && <button className="btn" onClick={() => onOpen(p.demo)}>Try live demo</button>}
        {p.link && <a className="go" href={p.link} target="_blank" rel="noopener">View on GitHub</a>}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [open, setOpen] = useState(null);
  useEffect(() => {
    const k = (e) => e.key === "Escape" && setOpen(null);
    addEventListener("keydown", k);
    document.body.style.overflow = open ? "hidden" : "";
    return () => removeEventListener("keydown", k);
  }, [open]);

  return (
    <section id="projects" className="sec wrap">
      <motion.h2 className="stitle" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>Projects</motion.h2>
      <p className="sub">Things I've built and am building. Open a live demo to use two of them right here.</p>
      <div className="grid">{projects.map((p, i) => <Card key={p.title} p={p} i={i} onOpen={setOpen} />)}</div>
      <AnimatePresence>
        {open && (
          <motion.div className="modal-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}
              initial={{ y: 60, scale: 0.94, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 40, opacity: 0 }}>
              <button className="close" onClick={() => setOpen(null)} aria-label="Close demo">✕</button>
              {open === "finder" ? <GithubFinder /> : <InternManager />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
