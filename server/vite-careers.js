import { Readable } from "node:stream";
import { createCareersHandler } from "./careers-handler.js";
import { createContactHandler } from "./contact-handler.js";

export function careersApiPlugin(env) {
  const handlers = { "/api/careers": createCareersHandler({ env }), "/api/contact": createContactHandler({ env }) };
  const install = (server) => {
    server.middlewares.use(async (req, res, next) => {
      const handler = handlers[req.url?.split("?")[0]];
      if (!handler) return next();
      try {
        const body = ["GET", "HEAD"].includes(req.method) ? undefined : Readable.toWeb(req);
        const request = new Request(`http://${req.headers.host}${req.url}`, { method: req.method, headers: req.headers, body, duplex: "half" });
        const response = await handler(request, { ip: req.socket.remoteAddress || "local" });
        res.writeHead(response.status, Object.fromEntries(response.headers));
        res.end(await response.text());
      } catch {
        res.writeHead(500, { "Content-Type": "application/json", "Cache-Control": "no-store" });
        res.end(JSON.stringify({ error: "Invio temporaneamente non disponibile." }));
      }
    });
  };
  return { name: "marinaro-careers-api", configureServer: install, configurePreviewServer: install };
}
