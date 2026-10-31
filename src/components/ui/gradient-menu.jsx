import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BadgeEuro, FolderKanban, Home, Layers3, Mail, UsersRound } from "lucide-react";
import {useTranslation} from "../../i18n/context.js";


const icons = { Home, Servizi: Layers3, Progetti: FolderKanban, Team: UsersRound, Prezzi: BadgeEuro, Contatti: Mail };

export default function GradientMenu({ items, isActive }) {
  const {t:tr}=useTranslation();

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className="hidden items-center gap-1.5 rounded-full border border-border bg-card/90 p-1.5 shadow-[0_12px_45px_rgba(0,0,0,.28)] backdrop-blur-xl lg:flex"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {items.map((item, index) => {
        const Icon = icons[item.label];
        const active = isActive(item.to);
        const highlighted = hoveredIndex === index || (hoveredIndex === null && active);
        return (
          <Link
            key={item.label}
            to={item.to}
            onMouseEnter={() => setHoveredIndex(index)}
            className="relative isolate flex h-10 items-center gap-2 rounded-full px-4 text-sm"
          >
            {highlighted && (
              <motion.span
                layoutId="desktop-menu-highlight"
                className="gradient-menu__highlight absolute inset-0 -z-10 rounded-full"
                transition={{ type: "spring", stiffness: 430, damping: 34, mass: 0.7 }}
              />
            )}
            <Icon className={`h-3.5 w-3.5 transition-colors duration-300 ${highlighted ? "text-foreground" : "text-foreground/45"}`} />
            <span className={`transition-colors duration-300 ${highlighted ? "text-foreground" : "text-foreground/55"}`}>{tr(item.label)}</span>
          </Link>
        );
      })}
    </div>
  );
}
