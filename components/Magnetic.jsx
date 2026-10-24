"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Wrap a button: it gets pulled toward the cursor when you come close.
export default function Magnetic({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 14 }), sy = useSpring(y, { stiffness: 220, damping: 14 });
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: "inline-block" }}
      onPointerMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}
