"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from "recharts";
import { languages, focus, tech } from "../lib/data";

function PieCard({ title, note, data }) {
  const [a, setA] = useState(0);
  const cur = data[a];
  return (
    <motion.div className="panel" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
      <h3>{title}</h3>
      <p className="sub" style={{ margin: 0 }}>{note}</p>
      <div className="pie-wrap">
        <ResponsiveContainer width="100%" height={290}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={80} outerRadius={112} paddingAngle={3} cornerRadius={6} stroke="none"
              activeIndex={a} activeShape={(p) => <Sector {...p} outerRadius={p.outerRadius + 10} />}
              onMouseEnter={(_, i) => setA(i)} animationBegin={150} animationDuration={1400}>
              {data.map((d) => <Cell key={d.name} fill={d.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pie-center">
          {cur.Icon && <cur.Icon size={34} color={cur.color} />}
          <b>{cur.value}%</b><span>{cur.name}</span>
        </div>
      </div>
      <ul className="legend">
        {data.map((d, i) => (
          <li key={d.name} className={i === a ? "on" : ""} data-hover onMouseEnter={() => setA(i)}>
            {d.Icon ? <d.Icon size={20} color={d.color} /> : <span className="dot" style={{ background: d.color }} />}
            {d.name}<em>{d.value}%</em>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Skills() {
  const langData = languages.map((l) => ({ name: tech[l.key].name, value: l.value, color: tech[l.key].color, Icon: tech[l.key].Icon }));
  return (
    <section id="skills" className="sec wrap">
      <motion.h2 className="stitle" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>Skills</motion.h2>
      <p className="sub">The languages I write most, and where my learning time goes. Hover a slice or a row.</p>
      <div className="charts">
        <PieCard title="Languages I use most" note="Rough share of the code I write." data={langData} />
        <PieCard title="Where I spend my time" note="Learning focus by area." data={focus} />
      </div>
    </section>
  );
}
