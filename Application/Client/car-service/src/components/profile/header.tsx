'use client'
import Logout from "@/action/auth/logout";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Header() {
    const { push } = useRouter();
    const action = Logout.bind(null)
    const formAction = async () => {
        const response = await action()
        if (response?.message == 'Успешно')
            push('/')
        else
            console.log(response)
    }
    return (
        <header>
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className={`col p-2 ps-4`}>
                        <Link href={'/'}><h3>Wheely</h3></Link>
                    </div>
                    <form action={formAction} className={`col p-2 pe-4 d-flex justify-content-end`}>
                        <button type='submit' className="btn btn-outline-danger">Выйти</button>
                    </form>
                </div>
            </div>
        </header>
    )
}