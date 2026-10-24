"use client";
import { useEffect, useState } from "react";

const seed = [
  { id: 1, name: "Aarav Sharma", dept: "Web Development", progress: 70, present: true },
  { id: 2, name: "Sita Rai", dept: "UI Design", progress: 45, present: true },
  { id: 3, name: "Bikash Thapa", dept: "Java Backend", progress: 20, present: false },
];

// Working mini version of the Intern Management System (data is saved in this browser).
export default function InternManager() {
  const [list, setList] = useState(seed);
  const [ready, setReady] = useState(false);
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [find, setFind] = useState("");

  useEffect(() => {
    try { const s = localStorage.getItem("interns"); if (s) setList(JSON.parse(s)); } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) { try { localStorage.setItem("interns", JSON.stringify(list)); } catch {} } }, [list, ready]);

  const add = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setList([...list, { id: Date.now(), name: name.trim(), dept: dept.trim() || "General", progress: 0, present: true }]);
    setName(""); setDept("");
  };
  const upd = (id, patch) => setList(list.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const shown = list.filter((x) => (x.name + x.dept).toLowerCase().includes(find.toLowerCase()));
  const avg = list.length ? Math.round(list.reduce((a, b) => a + b.progress, 0) / list.length) : 0;

  return (
    <div className="demo">
      <h3>Intern Management System</h3>
      <p className="sub" style={{ margin: "6px 0 18px" }}>Add interns, mark attendance and track progress. Your changes stay in this browser.</p>
      <div className="kpis">
        <div><b>{list.length}</b><span>Interns</span></div>
        <div><b>{list.filter((x) => x.present).length}</b><span>Present today</span></div>
        <div><b>{avg}%</b><span>Avg progress</span></div>
      </div>
      <form className="row" onSubmit={add}>
        <input className="field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Intern name" aria-label="Intern name" />
        <input className="field" value={dept} onChange={(e) => setDept(e.target.value)} placeholder="Department" aria-label="Department" />
        <button className="btn" type="submit">Add intern</button>
      </form>
      <input className="field" style={{ margin: "14px 0" }} value={find} onChange={(e) => setFind(e.target.value)} placeholder="Search interns" aria-label="Search interns" />
      <ul className="interns">
        {shown.map((x) => (
          <li key={x.id}>
            <div className="who"><b>{x.name}</b><span>{x.dept}</span></div>
            <label className="prog">
              <input type="range" min="0" max="100" value={x.progress} onChange={(e) => upd(x.id, { progress: +e.target.value })} aria-label={`${x.name} progress`} />
              <em>{x.progress}%</em>
            </label>
            <button className={`pill${x.present ? " on" : ""}`} onClick={() => upd(x.id, { present: !x.present })}>{x.present ? "Present" : "Absent"}</button>
            <button className="pill" onClick={() => setList(list.filter((y) => y.id !== x.id))} aria-label={`Remove ${x.name}`}>Remove</button>
          </li>
        ))}
        {shown.length === 0 && <li className="sub">No interns found. Add one above.</li>}
      </ul>
    </div>
  );
}
