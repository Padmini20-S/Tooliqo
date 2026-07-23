"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Image as ImageIcon, Video, Music, Code, SearchCheck, Shield, Zap } from "lucide-react";

const icons = [
  { icon: FileText, color: "text-red-400", size: 40, delay: 0, duration: 15, x: "10%", y: "20%" },
  { icon: ImageIcon, color: "text-blue-400", size: 50, delay: 2, duration: 18, x: "85%", y: "15%" },
  { icon: Video, color: "text-purple-400", size: 35, delay: 1, duration: 20, x: "75%", y: "70%" },
  { icon: Music, color: "text-orange-400", size: 45, delay: 3, duration: 22, x: "15%", y: "65%" },
  { icon: Code, color: "text-indigo-400", size: 30, delay: 0.5, duration: 16, x: "5%", y: "40%" },
  { icon: SearchCheck, color: "text-cyan-400", size: 35, delay: 4, duration: 19, x: "90%", y: "45%" },
  { icon: Shield, color: "text-emerald-400", size: 40, delay: 2.5, duration: 21, x: "25%", y: "85%" },
  { icon: Zap, color: "text-amber-400", size: 45, delay: 1.5, duration: 17, x: "65%", y: "10%" },
];

export default function FloatingBackgroundIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            className="absolute opacity-[0.15]"
            style={{ left: item.x, top: item.y }}
            animate={{
              y: ["0%", "-30%", "0%"],
              x: ["0%", "10%", "0%"],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon className={`w-12 h-12 md:w-16 md:h-16 ${item.color}`} />
          </motion.div>
        );
      })}
    </div>
  );
}
