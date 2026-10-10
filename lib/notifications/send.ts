export async function sendEmail(to: string, subject: string, html: string) {
    console.log("[EMAIL] To: " + to + " | Subject: " + subject);
    return { ok: true };
}
export async function sendSMS(mobile: string, message: string) {
    console.log("[SMS] To: " + mobile + " | Msg: " + message);
    return { ok: true };
}
