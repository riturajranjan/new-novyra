"use client";

import { motion } from "framer-motion";

const nodes = [
  { x: 10, y: 30 },
  { x: 10, y: 70 },
  { x: 45, y: 15 },
  { x: 45, y: 50 },
  { x: 45, y: 85 },
  { x: 80, y: 35 },
  { x: 80, y: 65 },
];

const edges: [number, number][] = [
  [0, 2],
  [0, 3],
  [1, 3],
  [1, 4],
  [2, 5],
  [3, 5],
  [3, 6],
  [4, 6],
];

/** Abstract AI neural-network visualization — decorative, no readable content. */
export function NeuralNetwork() {
  return (
    <svg viewBox="0 0 90 100" className="h-full w-full" aria-hidden>
      {edges.map(([a, b], i) => {
        const from = nodes[a];
        const to = nodes[b];
        return (
          <motion.line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="var(--color-brand-purple)"
            strokeWidth="0.6"
            strokeOpacity="0.35"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
          />
        );
      })}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="3"
          fill="var(--color-brand-cyan)"
          initial={{ opacity: 0.4, scale: 0.8 }}
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.85, 1, 0.85] }}
          transition={{
            duration: 2.4,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        />
      ))}
    </svg>
  );
}
