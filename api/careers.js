import { createCareersHandler } from "../server/careers-handler.js";

const handler = createCareersHandler();
export default {
  fetch(request) {
    const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() || "unknown";
    return handler(request, { ip });
  },
};
