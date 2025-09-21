import { config } from "../config/env.js";

export const buildWhatsAppLink = (customerName) => {
  // Message must include ONLY the customer's name.
  const text = `Hello, my name is ${customerName}.`;
  const encoded = encodeURIComponent(text);
  return {
    text,
    waLink: `https://wa.me/${config.whatsappNumber}?text=${encoded}`
  };
};
