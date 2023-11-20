'use server'
import type Message from '@/interface/model/message';
import type Tokens from '@/interface/model/tokens';
import {cookies} from 'next/headers'

export default async function Login(
    {email, password, birthDate, surname, firstname, lastname, phone, remember}:{email:string, password:string, birthDate:Date|undefined, surname:string, firstname:string, lastname:string, phone:string, remember:boolean}):Promise<Message|undefined>{
    const cookie = cookies();
    const body = JSON.stringify(Object.fromEntries(Object.entries({
        email,
        password,
        birth_date:birthDate?.toLocaleDateString('en-CA'),
        surname,
        firstname,
        lastname,
        phone
    }).filter(([_, v]) => v != ''&&v != undefined)));
    console.log(body)
    const response = await fetch(new URL('/auth/registration', process.env.BASE_URL as string),{
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