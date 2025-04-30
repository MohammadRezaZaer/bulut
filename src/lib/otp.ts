const otpStore = new Map<string, string>();

export function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function sendOtpToPhone(phone: string, otp: string) {
    console.log(`OTP to ${phone}: ${otp}`); // Replace with SMS provider
}

export function saveOtp(phone: string, otp: string) {
    otpStore.set(phone, otp);
}

export function verifyOtp(phone: string, code: string) {
    return otpStore.get(phone) === code;
}
