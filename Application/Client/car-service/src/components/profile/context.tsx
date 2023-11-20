'use client'
import { createContext, useEffect, useState} from 'react'
import AuthService from '@/service/auth';
import Client from '@/interface/model/client';
import ApiService from '@/service/api';

interface Data{
    client:Client,
    fetchData:() => Promise<void>
}
export const AuthContext = createContext({} as Data);

export default function ProfileContext({children}: {children: React.ReactNode}) {
    const [clientInfo, setClientInfo] = useState({} as Client);
    const fetchData = async () => {
        const client = ((await ApiService.client((await AuthService.validate()).data.id,true))).data
        setClientInfo(client);
    }
    useEffect(()=>{fetchData()},[])

    return(
        <AuthContext.Provider value={{client:clientInfo,fetchData}}>
            {children}
        </AuthContext.Provider>
    )
}