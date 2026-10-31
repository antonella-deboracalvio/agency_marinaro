import telefonoImage from "../assets/telefono.png";
import "./PhoneShowcase.css";
import {useTranslation} from "../i18n/context.js";


export default function PhoneShowcase() {
  const {t:tr}=useTranslation();

  return (
    <section className="project-visual-showcase" aria-label={tr("Anteprima servizi creativi")}>
      <div className="project-visual-showcase__card">
        <img
          src={telefonoImage}
          alt={tr("Perché scegliere la nostra agency: design su misura, soluzioni pratiche, supporto diretto e risultati concreti")}
          className="project-visual-showcase__image"
        />
      </div>
    </section>
  );
}
