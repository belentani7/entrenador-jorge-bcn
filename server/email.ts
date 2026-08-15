type EmailPayload = { to: string; subject: string; html: string };

export async function sendTransactionalEmail(payload: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "Jorge Performance <onboarding@resend.dev>";
  if (!apiKey) return false;
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [payload.to], subject: payload.subject, html: payload.html }) });
  return response.ok;
}

export function confirmationEmail(name: string, date?: string, time?: string) {
  const schedule = date && time ? `<p>Tu solicitud corresponde al <strong>${date}</strong> a las <strong>${time}</strong>.</p>` : "";
  return `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.6"><h1 style="color:#ff5b1a">Jorge Performance</h1><p>Hola ${name},</p><p>He recibido tus datos. Gracias por dar el primer paso.</p>${schedule}<p>Te escribiré personalmente para confirmar los detalles.</p></div>`;
}
