export const FIELDS = {
    AUTH_TOKEN: 'auth_token',
    MOBILE: 'mobile',
    OTP: 'otp',
} as const


export const ROUTES = {
    LOGIN: '/login',
    DASHBOARD: {
        Dashboard:'/dashboard',
        EditAccount:'/edit-account',
        Referrals:'/referrals',
        InsuranceList:'/insurance-list'
    },
    PROFILE: '/profile',
    INSURANCE_SIGNUP: '/insurance-signup',

    // Add other routes here
};
export const TextBucket = {

    Sign_out: 'Sign out',
    // Add other routes here
};

