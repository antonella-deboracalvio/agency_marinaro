import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SoftAurora from "./SoftAurora/SoftAurora";
import { DiaText } from "./ui/text-dia";
import { studio } from "../data/studio";
import "./Hero.css";

const heroWords = ["SITI WEB", "LOGHI", "MENU QR", "E-COMMERCE", "SOCIAL MEDIA", "GESTIONALI"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function HeroButton({ children, href, variant = "light" }) {
  const styles =
    variant === "light"
      ? "border-primary bg-primary text-background hover:border-primary-hover hover:bg-primary-hover"
      : "border-border-strong bg-card text-foreground hover:border-primary hover:text-primary";

  return (
    <Link
      to={href}
      className={`group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold transition duration-300 sm:w-auto sm:px-6 ${styles}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
    </Link>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="hero relative isolate overflow-hidden bg-background text-foreground"
    >
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={0.95}
          color1="#a855f7"
          color2="#06b6d4"
          noiseFrequency={2.5}
          noiseAmplitude={1}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1}
          enableMouseInteraction={true}
          mouseInfluence={0.25}
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-black/20 pointer-events-none" />
      <div className="pointer-events-none absolute bottom-0 inset-x-0 z-[2] h-32 bg-gradient-to-b from-transparent to-background" />

      <div className="hero-content relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center px-5 pb-[112px] pt-[96px] text-center sm:px-6 md:min-h-0 lg:px-8 lg:pb-20 lg:pt-12">
        <motion.div
          className="mx-auto flex w-full min-w-0 max-w-6xl flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            className="flex w-screen max-w-[100vw] flex-col gap-y-1 uppercase tracking-[-0.04em] text-foreground sm:w-full sm:max-w-[calc(100vw-40px)] sm:gap-y-0 sm:text-[clamp(2.5rem,7vw,4.6rem)] sm:leading-[0.9] lg:max-w-[1100px] lg:gap-y-3 lg:text-[clamp(4rem,6vw,6rem)]"
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block text-[clamp(1.9rem,7.4vw,2.6rem)] font-extrabold leading-[0.95] text-foreground sm:text-[inherit] sm:font-bold sm:leading-[inherit] lg:text-[clamp(3.8rem,5.5vw,5.8rem)]">CREIAMO</span>
            <DiaText
              words={heroWords}
              duration={2400}
              className="hero-dia mx-auto my-0 h-[1.08em] w-full max-w-full whitespace-nowrap text-center text-[clamp(2.45rem,9.6vw,3.4rem)] font-black leading-[0.9] tracking-[-0.04em] text-silver sm:text-[clamp(2.8rem,8vw,4.8rem)] lg:text-[clamp(3.6rem,5.5vw,5.5rem)]"
            />
            <span className="block text-[clamp(1.5rem,6vw,2.4rem)] font-extrabold leading-[0.95] tracking-[-0.055em] text-foreground sm:text-[inherit] sm:font-bold sm:leading-[inherit] sm:tracking-[-0.04em]">
              CHE FANNO CRESCERE
            </span>
            <span className="block text-[clamp(1.65rem,6.6vw,2.4rem)] font-extrabold leading-[0.95] text-foreground sm:text-[inherit] sm:font-bold sm:leading-[inherit]">
              IL TUO BRAND.
            </span>
          </motion.h1>
          <motion.div
            className="hero-actions mb-0 mt-8 flex w-[calc(100vw-40px)] max-w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row lg:mt-12 lg:max-w-none"
            variants={fadeUp}
            transition={{ duration: 0.72, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroButton href="/contatti">Parliamo del progetto</HeroButton>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-6 left-5 z-10 hidden lg:block pointer-events-none"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.72, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-mono text-[0.7rem] text-[rgba(255,255,255,0.4)]">✦ {studio.projects} progetti completati</span>
      </motion.div>
    </section>
  );
}
