"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Dot follows the pointer instantly; the ring trails it with spring physics
// and grows when hovering links, buttons or cards.
export default function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 140, damping: 16, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 140, damping: 16, mass: 0.6 });
  const [on, setOn] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    setOn(true);
    const move = (e) => {
      x.set(e.clientX); y.set(e.clientY);
      setHover(!!e.target.closest?.("a,button,[data-hover]"));
    };
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
