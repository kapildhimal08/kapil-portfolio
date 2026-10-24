"use client";
import { useState } from "react";

// Live GitHub account finder: calls the public GitHub REST API from the browser.
export default function GithubFinder() {
  const [q, setQ] = useState("kapildhimal08");
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [load, setLoad] = useState(false);

  async function search(e) {
    e.preventDefault();
    const u = q.trim();
    if (!u) return;
    setLoad(true); setErr(""); setData(null);
    try {
      const base = `https://api.github.com/users/${encodeURIComponent(u)}`;
      const [r1, r2] = await Promise.all([fetch(base), fetch(`${base}/repos?per_page=100&sort=updated`)]);
      if (r1.status === 404) throw new Error("No GitHub user found with that name.");
      if (!r1.ok || !r2.ok) throw new Error("GitHub is limiting requests right now. Try again in a minute.");
      const user = await r1.json(), repos = await r2.json();
      const langs = {};
      repos.forEach((r) => { if (r.language && !r.fork) langs[r.language] = (langs[r.language] || 0) + 1; });
      const total = Object.values(langs).reduce((a, b) => a + b, 0) || 1;
      setData({
        user,
        top: [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5),
        langs: Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([n, c]) => ({ n, p: Math.round((c / total) * 100) })),
      });
    } catch (x) { setErr(x.message); }
    setLoad(false);
  }

  return (
    <div className="demo">
      <h3>GitHub Portfolio Finder</h3>
      <p className="sub" style={{ margin: "6px 0 18px" }}>Type any GitHub username to see their profile, top repositories and languages.</p>
      <form className="row" onSubmit={search}>
        <input className="field" value={q} onChange={(e) => setQ(e.target.value)} placeholder="GitHub username" aria-label="GitHub username" />
        <button className="btn" type="submit" disabled={load}>{load ? "Searching…" : "Find"}</button>
      </form>
      {err && <p className="err" role="alert">{err}</p>}
      {data && (
        <div className="result">
          <div className="profile">
            <img src={data.user.avatar_url} alt={`${data.user.login} avatar`} width="84" height="84" />
            <div>
              <h4>{data.user.name || data.user.login}</h4>
              <p>{data.user.bio || "No bio added."}</p>
              <p className="stats"><b>{data.user.public_repos}</b> repos · <b>{data.user.followers}</b> followers · <b>{data.user.following}</b> following</p>
              <a className="go" href={data.user.html_url} target="_blank" rel="noopener">Open profile</a>
            </div>
          </div>
          <h5>Languages</h5>
          {data.langs.length === 0 && <p className="sub">No language data yet.</p>}
          {data.langs.map((l) => (
            <div className="bar" key={l.n}><span>{l.n}</span><div><i style={{ width: `${l.p}%` }} /></div><em>{l.p}%</em></div>
          ))}
          <h5>Top repositories</h5>
          <ul className="repos">
            {data.top.map((r) => (
              <li key={r.id}><a href={r.html_url} target="_blank" rel="noopener">{r.name}</a><span>{r.language || "—"} · ★ {r.stargazers_count}</span></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
