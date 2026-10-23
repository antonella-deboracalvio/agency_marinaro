import telefonoImage from "../assets/telefono.png";
import "./PhoneShowcase.css";

export default function PhoneShowcase() {
  return (
    <section className="project-visual-showcase" aria-label="Anteprima servizi creativi">
      <div className="project-visual-showcase__card">
        <img
          src={telefonoImage}
          alt="Perché scegliere la nostra agency: design su misura, soluzioni pratiche, supporto diretto e risultati concreti"
          className="project-visual-showcase__image"
        />
      </div>
    </section>
  );
}
