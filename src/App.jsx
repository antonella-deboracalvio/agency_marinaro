import { useEffect } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import EditorialServicesShowcase from "./components/EditorialServicesShowcase";
import WorkProcess from "./components/WorkProcess";
import SiteNavbar from "./components/layout/Navbar";
import SiteFooter from "./components/layout/Footer";
import WhatsAppButton from "./components/layout/WhatsAppButton";
import ScrollToTop from "./components/layout/ScrollToTop";
import SfogliaProjectPage from "./pages/SfogliaProjectPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectsTeaser from "./components/projects/ProjectsTeaser";
import StoryScroll from "./components/StoryScroll";
import BrandIdentity from "./components/BrandIdentity";
import Pricing from "./components/PricingSection";
import Team from "./components/team/TeamPreview";
import TeamPage from "./pages/TeamPage";
import ContactSection from "./components/ContactSection";
import ContactPage from "./pages/ContactPage";
import ServiceAreaPage from "./pages/ServiceAreaPage";
import { serviceCatalog } from "./data/service-catalog";



const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.35,
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.05,
    });
    let frame;
    function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}

function Services() {
  return (
    <section id="servizi" className="services-section bg-background text-foreground">
      <motion.div
        className="services-section__inner mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <EditorialServicesShowcase />
      </motion.div>
    </section>
  );
}

export function HomePage() {
  useSmoothScroll();
  return (
    <div className="min-h-screen bg-background font-sans">
      <main>
        <Hero />
        <StoryScroll />
        <Services />
        <ProjectsTeaser />
        <BrandIdentity />
        <WorkProcess />
        <Pricing />
        <Team />
        <ContactSection />
      </main>
    </div>
  );
}

export default function App() {
  

  return <BrowserRouter><ScrollToTop /><SiteNavbar /><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/progetti" element={<ProjectsPage />} />
    <Route path="/progetti/sfoglia" element={<SfogliaProjectPage />} />
    <Route path="/progetti/:slug" element={<ProjectDetailPage />} />
    <Route path="/team" element={<TeamPage />} />
    <Route path="/contatti" element={<ContactPage />} />
    {serviceCatalog.map(area => <Route key={area.id} path={area.href} element={<ServiceAreaPage key={area.id} areaId={area.id} />} />)}
    <Route path="*" element={<NotFoundPage />} />
  </Routes><SiteFooter /><WhatsAppButton /></BrowserRouter>;
}
