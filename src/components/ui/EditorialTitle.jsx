import "./EditorialTitle.css";

// Shared typography for WORK, SERVICES, BRANDS and METODO.
export default function EditorialTitle({ children, className = "", ...props }) {
  return <h2 className={`editorial-title ${className}`.trim()} {...props}>{children}</h2>;
}
