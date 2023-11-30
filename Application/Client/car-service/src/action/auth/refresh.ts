'use server'
import type Message from '@/interface/model/message';
import type Tokens from '@/interface/model/tokens';
import {cookies} from 'next/headers'
import type { NextResponse } from 'next/server';

export default async function Refresh(responseNext:NextResponse|undefined):Promise<Message|undefined>{
    const cookie = cookies();
    const response = await fetch(new URL('/auth/refresh/client', process.env.BASE_URL as string),{
        method:'GET',
        headers:{
            cookie:`refreshToken=${cookie.get('refreshToken')?.value};`
        }
    })
    if(response.ok){
        const tokens = await response.json() as Tokens
        if(responseNext != undefined){
            responseNext.cookies.set("accessToken",tokens.accessToken)
            responseNext.cookies.set("refreshToken",tokens.refreshToken,{httpOnly:true})
        }else{
            cookie.set('accessToken', tokens.accessToken)
            cookie.set('refreshToken', tokens.refreshToken, {httpOnly:true});
        }
        return undefined
    }
    return await response.json() as Message;
}