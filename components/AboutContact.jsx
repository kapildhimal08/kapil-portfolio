"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

const EMAIL = "kapildhimal08@gmail.com";

export function About() {
  return (
    <section id="about" className="sec wrap">
      <div className="about">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="stitle">About me</h2>
          <p>I'm Kapil, a BCA student who likes turning ideas into things people can click, scroll and use. I started with HTML and CSS, then moved into Java to understand how programs are structured.</p>
          <p>Right now I'm focused on JavaScript, React and responsive design. I'm looking for an internship or entry-level role where I can contribute and learn from a team.</p>
        </motion.div>
        <ul className="facts">
          {[["Nepal", "Based in Kathmandu"], ["BCA", "Studying computer applications"], ["Open to work", "Internships and entry-level roles"]].map(([b, s], i) => (
            <motion.li key={b} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
              <b>{b}</b><span>{s}</span>
<<<<<<< HEAD
            </motion.li>
=======
              </motion.li>
>>>>>>> master
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Contact() {
  const [msg, setMsg] = useState("");
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setMsg("Copied"); } catch { setMsg(EMAIL); }
    setTimeout(() => setMsg(""), 2200);
  };
  return (
    <section id="contact" className="wrap">
      <motion.div className="contact" initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <h2>Let's build something together.</h2>
        <p className="sub" style={{ margin: "14px 0 0" }}>Send me a note about an internship, a project or a question.</p>
        <div className="mail">
          <Magnetic><a className="btn" href={`mailto:${EMAIL}`}>Email me</a></Magnetic>
          <Magnetic><button className="btn ghost" onClick={copy}>Copy email address</button></Magnetic>
          <span className="toast" role="status">{msg}</span>
        </div>
      </motion.div>
    </section>
  );
}
