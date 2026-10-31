"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import {useTranslation} from "../../i18n/context.js";


export function DiaText({ words, duration = 2000, className, ...props }) {
  const {t:tr}=useTranslation();

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => window.clearInterval(interval);
  }, [words, duration]);

  return (
    <span
      className={cn(
        "relative inline-block min-w-[2ch] overflow-hidden align-bottom text-silver",
        className,
      )}
      style={{ verticalAlign: "bottom" }}
      {...props}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            filter: { duration: 0.2 },
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.span
            className="inline-block bg-clip-text pb-1"
            style={{
              WebkitTextFillColor: "transparent",
              backgroundImage:
                "linear-gradient(90deg, currentColor 50%, var(--primary) 50%, var(--accent), var(--primary), var(--secondary))",
              backgroundSize: "250% 100%",
            }}
            initial={{ backgroundPosition: "100% 0%" }}
            animate={{ backgroundPosition: "0% 0%" }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
          >
            {tr(words[index])}
          </motion.span>
        </motion.span>
      </AnimatePresence>

      <span className="invisible" aria-hidden="true">
        {tr(words[index])}
      </span>
    </span>
  );
}

export default DiaText;
