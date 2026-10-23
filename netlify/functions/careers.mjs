import { createCareersHandler } from "../../server/careers-handler.js";

const handler = createCareersHandler();
export default (request, context) => handler(request, { ip: context.ip || "unknown" });
