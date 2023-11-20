'use server'
import {cookies} from 'next/headers'
import type ClientValidate from '@/interface/model/client_validate';

export default async function Validate():Promise<ClientValidate|number>{
    const cookie = cookies();
    const response = await fetch(new URL('/auth/validate', process.env.BASE_URL as string),{
        method:'GET',
        headers:{
            Authorization:`Bearer ${cookie.get('accessToken')?.value}`
        }
    })
    if(response.ok){
        return await response.json() as ClientValidate
    }
    else{
        return response.status
    }
}