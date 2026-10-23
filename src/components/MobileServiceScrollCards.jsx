export default function MobileServiceScrollCards({ services }) {
  return (
    <div className="mobile-service-scroll px-5 pb-4 pt-6 md:hidden">
      <div className="mobile-service-stack">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <article
              key={service.title}
              className="mobile-service-card group sticky overflow-hidden rounded-[28px] border border-primary/20 bg-card p-6"
              style={{
                top: `${92 + index * 10}px`,
                zIndex: index + 1,
              }}
            >
              {service.image && (
                <img
                  src={service.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-45"
                />
              )}

              <div className="absolute inset-0 bg-black/60" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-black tracking-[0.18em] text-primary">{service.number}</span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-primary">
                    <Icon size={18} />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-black leading-tight text-foreground">{service.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-foreground/70">{service.description ?? service.text}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
