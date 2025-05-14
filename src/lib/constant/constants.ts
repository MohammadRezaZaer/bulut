export const FIELDS = {
    AUTH_TOKEN: 'auth_token',
    MOBILE: 'mobile',
    OTP: 'otp',
} as const


export const ROUTES = {
    LOGIN: '/login',
    DASHBOARD: {
        Dashboard:'/dashboard',
        EditAccount:'/dashboard/edit-account',
        Referrals:'/dashboard/referrals',
        InsuranceList:'/dashboard/insurance-list'
    },
    PROFILE: '/profile',
    INSURANCE_SIGNUP: '/insurance-signup',
    REQUEST_RELIEF: "/request-relief",

    // Add other routes here
    MARKETING: "/marketing",
    ROAD_ASSISTANCE_SIGNUP: "/road-assistance-signup"
};
export const TextBucket = {

    Sign_out: 'Sign out',
    // Add other routes here
};

export const SIDEBAR_WIDTH = {
    collapsed: 'w-20',
    expanded: 'w-80',
    min: 'min-w-12',
};