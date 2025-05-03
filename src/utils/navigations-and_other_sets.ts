import {
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon
} from "@heroicons/react/24/outline";
import {ROUTES} from "@/lib/constants";

export const navigation = [
    {name: 'داشبورد', href: '/dashboard', icon: HomeIcon, current: true},
    {name: 'معرفی شدگان', href: '/referrals', icon: UsersIcon, current: false},
    {name: 'لیست بیمه نامه ه', href: '/insurance-list', icon: FolderIcon, current: false},
]
export const navLinks = [
    {name: "خانه", href: "/", icon: HomeIcon, current: false},
    {name: "خرید بیمه نامه", href: ROUTES.INSURANCE_SIGNUP, icon: DocumentDuplicateIcon, current: false},
    {name: "درخواست امداد خودرو", href: "/request-relief", icon: CalendarIcon, current: false},
    {name: "مشاور و کارشناس فروش", href: "/marketing", icon: UsersIcon, current: false},
    {name: "ثبت نام امدادگران", href: "/road-assistance-signup", icon: FolderIcon, current: false},
    {name: "مجله", href: "#", icon: ChartPieIcon, current: false},
    {name: "درباره ما", href: "/about", icon: UsersIcon, current: false},
    {name: "تماس با ما", href: "/contact-us", icon: FolderIcon, current: false},
];
export const carColors = [
    { value: 'white', label: 'سفید' },
    { value: 'black', label: 'مشکی' },
    { value: 'gray', label: 'نوک مدادی' },
    { value: 'red', label: 'قرمز' },
    { value: 'silver', label: 'نقره‌ای' },
    { value: 'other', label: 'سایر رنگ‌ها' },
];