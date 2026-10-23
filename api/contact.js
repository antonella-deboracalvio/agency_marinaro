import { createContactHandler } from "../server/contact-handler.js";

const handler = createContactHandler();
export default {
  fetch(request) {
    const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() || "unknown";
    return handler(request, { ip });
  },
};
