import { createContactHandler } from "../../server/contact-handler.js";

const handler = createContactHandler();
export default (request, context) => handler(request, { ip: context.ip || "unknown" });
