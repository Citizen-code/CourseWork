import { NextRequest, NextResponse } from 'next/server'
import Validate from './action/auth/validate';
import Refresh from './action/auth/refresh';


export default async function middleware(req: NextRequest) {
    if(req.method === 'GET'){
        const client = await Validate()
        if (client === 401 && req.cookies.has('refreshToken')) {
            const responseNext = NextResponse.next()
            const response = await Refresh(responseNext)
            if (response == undefined) return responseNext;
            else return NextResponse.redirect(new URL('/login', req.url))
        }
        else if(client === 401){
            if(req.nextUrl.pathname.includes('/login')) return;
            else return NextResponse.redirect(new URL('/login', req.url))
        }else if(req.nextUrl.pathname.includes('/login')){
            return NextResponse.redirect(new URL('/profile', req.url));
        }
    }
}

export const config = {
    matcher: ['/profile', '/login']
}