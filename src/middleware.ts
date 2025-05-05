import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {FIELDS} from "@/lib/constant/constants";

export function middleware(req: NextRequest) {
    const mobile = req.cookies.get(FIELDS.AUTH_TOKEN);

    if (req.nextUrl.pathname.startsWith('/dashboard') && !mobile) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
