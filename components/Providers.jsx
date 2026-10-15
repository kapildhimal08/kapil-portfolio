"use client";
import { MotionConfig } from "framer-motion";
import Cursor from "./Cursor";

export default function Providers({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <Cursor />
      {children}
    </MotionConfig>
  );
}
