// Public contact details only. Email delivery credentials belong on the server.
export const contactChannels = {
  email: "", // Set the studio's confirmed, monitored email address here.
  whatsappNumber: "393297560298",
};

export function whatsappHref(message = "") {
  const url = `https://wa.me/${contactChannels.whatsappNumber}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}
