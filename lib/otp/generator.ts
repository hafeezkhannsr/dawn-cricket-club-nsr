// 6-digit OTP generate karo
export function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
// OTP expiry time (5 minute)
export function getOTPExpiry(): number {
    return Date.now() + 5 * 60 * 1000;
}
// OTP valid hai ya nahi
export function isOTPValid(otpCreatedAt: number): boolean {
    return Date.now() < otpCreatedAt;
}
