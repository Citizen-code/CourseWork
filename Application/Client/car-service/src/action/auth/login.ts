'use server'
import type Message from '@/interface/model/message';
import type Tokens from '@/interface/model/tokens';
import {cookies} from 'next/headers'

export default async function Login(
    {email, password, remember}:{email:string, password:string, remember:boolean}):Promise<Message|undefined>{
    const body = JSON.stringify({
        email,
        password
    })
    const cookie = cookies();
    const response = await fetch(new URL('/auth/login/client', process.env.BASE_URL as string),{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
    })
    if(response.ok){
        const tokens = await response.json() as Tokens
        if(remember) cookie.set('refreshToken', tokens.refreshToken, {httpOnly:true});
        cookie.set('accessToken', tokens.accessToken)
        return undefined
    }else return await response.json() as Message;
    
}