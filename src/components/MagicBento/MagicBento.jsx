import { motion } from "framer-motion";
import clsx from "clsx";
import "./MagicBento.css";

function updateGlow(event) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  card.style.setProperty("--glow-x", `${x}%`);
  card.style.setProperty("--glow-y", `${y}%`);
  card.style.setProperty("--glow-opacity", "1");
}

function dimGlow(event) {
  event.currentTarget.style.setProperty("--glow-opacity", "0");
}

export default function MagicBento({ items }) {
  return (
    <div className="magic-bento">
      {items.map(({ number, icon: Icon, title, text, layout, image }, index) => (
        <motion.article
          key={title}
          className={clsx("magic-bento-card flex flex-col overflow-hidden p-4 md:p-6", layout === "wide" && "is-wide", layout === "tall" && "is-tall")}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.42, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onPointerMove={updateGlow}
          onPointerDown={updateGlow}
          onPointerLeave={dimGlow}
          onPointerCancel={dimGlow}
        >
          {image && (
            <>
              <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-black/60" />
            </>
          )}

          <div className="relative z-10 flex items-start justify-between gap-3">
            <span className="text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-foreground/40 md:text-xs">{number}</span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary md:h-11 md:w-11">
              <Icon className="h-4 w-4 md:h-5 md:w-5" />
            </span>
          </div>

          <div className="relative z-10 mt-auto">
            <h3 className="text-[1.05rem] font-semibold leading-tight tracking-tight text-foreground md:text-2xl">{title}</h3>
            <p className="mt-2 text-[0.78rem] leading-5 text-zinc-400 md:mt-3 md:text-sm md:leading-6">{text}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
