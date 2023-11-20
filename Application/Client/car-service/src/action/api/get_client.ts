'use server'
import type Client from '@/interface/model/client';
import { UUID } from 'crypto';
import BaseApiFetch from '../api_base_fetch'

export default async function GetClient(id:UUID):Promise<Client>{
    return await BaseApiFetch<Client>({url:`/api/client/${id}`, method:'GET', body:undefined})
}