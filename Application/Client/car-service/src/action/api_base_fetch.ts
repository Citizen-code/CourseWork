'use server'
import { cookies } from 'next/headers'
export default async function ApiBaseFetch<T>(
    { url, method, body }: { url: string, method: 'GET' | 'POST', body: object | undefined }): Promise<T> {

    const cookie = cookies();
    const option = {
        method,
        headers: {
            Authorization: `Bearer ${cookie.get('accessToken')?.value}`
        },
    } as any

    if (body != undefined) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(body)
    }

    const request = async () => await fetch(new URL(url, process.env.BASE_URL as string), option)

    const response_base = await request()
    return await response_base.json() as T
}