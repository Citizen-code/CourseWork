'use server'
import type Message from '@/interface/model/message';
import {cookies} from 'next/headers'

export default async function Logout():Promise<Message|undefined>{
    const cookie = cookies();
    if(cookie.get('refreshToken')==undefined){
        cookie.delete('accessToken')
        return {message:"Успешно", errors:[]}
    }
    const response = await fetch(new URL('/auth/logout/client', process.env.BASE_URL as string),{
        method:'POST',
        headers:{
            cookie:`refreshToken=${cookie.get('refreshToken')?.value};`
        }
    })
    if(response.ok){
        cookie.delete('refreshToken');
        cookie.delete('accessToken')
    }
    return await response.json() as Message;
}