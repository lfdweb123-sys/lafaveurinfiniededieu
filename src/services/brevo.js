const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
const SENDER_EMAIL = import.meta.env.VITE_BREVO_SENDER_EMAIL || 'noreply@lfd.com';
const SENDER_NAME = 'La Faveur Infinie de Dieu';

export async function sendEmail({ to, toName, subject, htmlContent }) {
  if (!BREVO_API_KEY) {
    console.warn('Brevo API key non configurée');
    return { success: false, error: 'API key manquante' };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: { name: SENDER_NAME, email: SENDER_EMAIL },
        to: [{ email: to, name: toName || to }],
        subject,
        htmlContent
      })
    });

    const data = await response.json();
    if (!response.ok) return { success: false, error: data.message };
    return { success: true, messageId: data.messageId };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export function getContactEmailTemplate({ name, email, subject, message }) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:20px;background:#f9fafb;">
      <div style="background:#fff;border-radius:16px;border:1px solid #e5e7eb;padding:24px;">
        <div style="background:linear-gradient(135deg,#D4A017,#B8860B);padding:20px;border-radius:12px;text-align:center;margin-bottom:20px;">
          <h1 style="color:#fff;margin:0;font-size:20px;">La Faveur Infinie de Dieu</h1>
          <p style="color:rgba(255,255,255,.8);margin:4px 0 0;font-size:13px;">Nouveau message de contact</p>
        </div>
        <table style="width:100%;font-size:13px;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#6b7280;font-weight:600;">Nom</td><td style="color:#111827;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-weight:600;">Email</td><td style="color:#111827;">${email}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-weight:600;">Sujet</td><td style="color:#111827;">${subject}</td></tr>
          <tr><td colspan="2"><hr style="border:none;border-top:1px solid #e5e7eb;margin:12px 0;"/></td></tr>
          <tr><td colspan="2" style="padding:8px 0;color:#111827;line-height:1.6;">${message}</td></tr>
        </table>
        <p style="color:#9ca3af;font-size:11px;text-align:center;margin-top:16px;">LFD - La Faveur Infinie de Dieu</p>
      </div>
    </div>
  `;
}