// Email via Resend (placeholder - API key baad mein add hoga)
export async function sendEmail(to: string, subject: string, html: string) {
    console.log(`[EMAIL] To: ${to} | Subject: ${subject}`);
    // Resend integration yahan aayega
    return { ok: true, message: "Email queued" };
}
// SMS via Fast2SMS/Twilio (placeholder)
export async function sendSMS(mobile: string, message: string) {
    console.log(`[SMS] To: ${mobile} | Message: ${message}`);
    return { ok: true, message: "SMS queued" };
}
// Registration confirmation
export async function sendRegistrationConfirmation(email: string, name: string) {
    return sendEmail(
        email,
        "Registration Received - DAWN Cricket Club",
        `<h2>Dear ${name},</h2><p>Aapki registration humein mil gayi hai. Jald hi review karke aapko batayenge.</p>`
    );
}
// Approval confirmation
export async function sendApprovalConfirmation(email: string, name: string) {
    return sendEmail(
        email,
        "Congratulations! Registration Approved",
        `<h2>Mubarak ho ${name}!</h2><p>Aapki registration approve ho gayi hai. Ab aap apne dashboard mein login kar sakte hain.</p>`
    );
}
