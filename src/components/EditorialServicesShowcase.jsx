import EditorialTitle from "./ui/EditorialTitle";
import BranchedMenu from "./ui/BranchedMenu";
import { serviceCatalog } from "../data/service-catalog";
import "./EditorialServicesShowcase.css";

const branches = serviceCatalog.map(area => ({
  label: area.name,
  href: area.href,
  children: area.links.map(link => ({ value: `${area.id}-${link.anchor}`, label: link.label, href: `${area.href}#${link.anchor}` })),
}));

export default function EditorialServicesShowcase() {
  return <div className="services-composition" data-layout="services-four-areas">
    <EditorialTitle id="services-title" className="services-display-title">Services</EditorialTitle>
    <div className="services-areas">
      {branches.map(branch => <BranchedMenu key={branch.label} items={[branch]} defaultOpen={[0]} defaultActive="none" width="100%" rowHeight={44} indent={34} trunk={10} radius={7} fontSize={16} accentColor="var(--primary-hover)" className="services-branched-menu" aria-label={`Servizi ${branch.label}`} />)}
    </div>
  </div>;
}
