import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {FIELDS} from "@/lib/constants";

export function middleware(req: NextRequest) {
    const phone = req.cookies.get(FIELDS.MOBILE);

    if (req.nextUrl.pathname.startsWith('/dashboard') && !phone) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
