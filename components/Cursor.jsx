"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

<<<<<<< HEAD
// Dot follows the pointer instantly; the ring trails it with spring physics
// and grows when hovering links, buttons or cards.
=======
// Desktop: dot follows the mouse, ring trails it with spring physics.
// Touch screens: the dot and ring appear under your finger while you press,
// and every tap sends out a gold ripple.
>>>>>>> master
export default function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 140, damping: 16, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 140, damping: 16, mass: 0.6 });
<<<<<<< HEAD
  const [on, setOn] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    setOn(true);
=======
  const [touch, setTouch] = useState(null);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    setTouch(!window.matchMedia("(hover:hover) and (pointer:fine)").matches);
>>>>>>> master
    const move = (e) => {
      x.set(e.clientX); y.set(e.clientY);
      setHover(!!e.target.closest?.("a,button,[data-hover]"));
    };
<<<<<<< HEAD
    const d = () => setDown(true), u = () => setDown(false);
    addEventListener("pointermove", move);
    addEventListener("pointerdown", d);
    addEventListener("pointerup", u);
    return () => { removeEventListener("pointermove", move); removeEventListener("pointerdown", d); removeEventListener("pointerup", u); };
  }, [x, y]);

  if (!on) return null;
  return (
    <>
      <motion.div className="cur-dot" style={{ x, y }} animate={{ scale: down ? 0.5 : hover ? 0 : 1 }} />
      <motion.div className="cur-ring" style={{ x: rx, y: ry }}
        animate={{ scale: down ? 0.8 : hover ? 1.8 : 1, backgroundColor: hover ? "rgba(255,180,59,.16)" : "rgba(255,180,59,0)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }} />
    </>
  );
}
=======
    const dn = (e) => {
      move(e);
      setDown(true);
      if (e.pointerType !== "mouse") {
        rx.jump?.(e.clientX); ry.jump?.(e.clientY); // ring starts under the finger
        const id = Date.now() + Math.random();
        setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
        setTimeout(() => setRipples((r) => r.filter((v) => v.id !== id)), 750);
      }
    };
    const up = () => setDown(false);
    addEventListener("pointermove", move);
    addEventListener("pointerdown", dn);
    addEventListener("pointerup", up);
    addEventListener("pointercancel", up);
    return () => {
      removeEventListener("pointermove", move); removeEventListener("pointerdown", dn);
      removeEventListener("pointerup", up); removeEventListener("pointercancel", up);
    };
  }, [x, y, rx, ry]);

  if (touch === null) return null;
  const visible = touch ? (down ? 1 : 0) : 1;
  return (
    <>
      <motion.div className="cur-dot" style={{ x, y }} animate={{ opacity: visible, scale: down ? 0.5 : hover && !touch ? 0 : 1 }} />
      <motion.div className="cur-ring" style={{ x: rx, y: ry }}
        animate={{ opacity: visible, scale: down ? 0.8 : hover ? 1.8 : 1, backgroundColor: hover ? "rgba(255,180,59,.16)" : "rgba(255,180,59,0)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }} />
      {ripples.map((r) => (
        <motion.span key={r.id} className="cur-ripple" style={{ left: r.x, top: r.y }}
          initial={{ scale: 0.3, opacity: 0.9 }} animate={{ scale: 3.2, opacity: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} />
      ))}
    </>
  );
}
>>>>>>> master
