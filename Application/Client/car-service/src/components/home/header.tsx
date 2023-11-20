import style from '@/components/style/home/header.module.css'
import Link from 'next/link'

//d-none - лого
export default function Header(){
    return(
        <header className='me-0 ms-0' id={style.header}>
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className={`ms-5 col-auto ${style.menu_el_left} d-none d-sm-block`}>
                        <h3 id={style.logo}>Wheely</h3>
                    </div>
                    <div className={`ms-3 col d-flex flex-wrap justify-content-center ${style.menu_el_center}`}>
                        <Link href='#About' className={style.menu_link}>О нас</Link>
                        <Link href='#Services' className={style.menu_link}>Услуги</Link>
                        <Link href='/profile' className={style.menu_link}>Личный кабинет</Link>
                        <Link href='#Gallery' className={style.menu_link}>Галерея</Link>
                        <Link href='#Feedback' className={style.menu_link}>Отзывы</Link>
                    </div>
                    <div className={`col-auto ${style.menu_el_right} d-none d-md-block`}>
                        <ul>
                            <li>Вт-Сб: 10:00 – 19:00</li>
                            <li>wheely@yandex.ru</li>
                            <li>+7 900 428 55 64</li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}