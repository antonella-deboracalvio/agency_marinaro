"use client";

import { Check, Clock, X } from "lucide-react";
import { cn } from "../../lib/utils";
import "./timeline.css";

const statusLabels = { completed: "Completato", active: "In corso", pending: "Da iniziare", error: "Errore" };

function StatusIcon({ status }) {
  if (status === "completed") return <Check />;
  if (status === "active" || status === "pending") return <Clock />;
  if (status === "error") return <X />;
  return <span className="timeline__dot" />;
}

function Timestamp({ value }) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return (
    <time className="timeline__timestamp" dateTime={date.toISOString()}>
      {date.toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" })}
    </time>
  );
}

// Adapted from the supplied timeline. Existing React / Lucide / cn are enough;
// horizontal scrolling uses the browser, with no additional UI dependency.
export function Timeline({
  items = [],
  className,
  variant = "default",
  orientation = "vertical",
  showConnectors = true,
  showTimestamps = true,
  timestampPosition = "top",
  ...props
}) {
  return (
    <div
      className={cn("timeline", `timeline--${variant}`, `timeline--${orientation}`, className)}
      tabIndex={orientation === "horizontal" ? 0 : undefined}
      {...props}
    >
      <ol className="timeline__list">
        {items.map((item, index) => {
          const status = item.status || "default";
          return (
            <li className="timeline__item" key={item.id} data-status={status}>
              {showConnectors && index < items.length - 1 && <span className="timeline__connector" aria-hidden="true" />}
              <span className="timeline__icon" aria-hidden="true">
                {item.icon ?? <StatusIcon status={status} />}
              </span>
              <div className="timeline__body">
                {showTimestamps && timestampPosition === "top" && <Timestamp value={item.timestamp} />}
                <div className="timeline__heading">
                  <h3 className="timeline__title">{item.title}</h3>
                  {showTimestamps && timestampPosition === "inline" && <Timestamp value={item.timestamp} />}
                </div>
                {statusLabels[status] && <span className="sr-only">{statusLabels[status]}</span>}
                {item.description && <p className="timeline__description">{item.description}</p>}
                {item.content && <div className="timeline__content">{item.content}</div>}
                {showTimestamps && timestampPosition === "bottom" && <Timestamp value={item.timestamp} />}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Timeline;
