import Link from "next/link";

export default function Footer(){
    return(
        <footer>
            <div className="container p-4">
                <div className="row h-100 align-items-center">
                    <div className="col text-start">
                        <h3>Wheely</h3>
                    </div>
                    <div className="col text-end d-none d-md-block">
                        <h5>
                            <ul>
                                <li>Пн-Вс: 08:00 – 20:00</li>
                                <li>wheely@yandex.ru</li>
                                <li>+7 900 428 55 64</li>
                            </ul>
                        </h5>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="container p-4">
                <div className="d-inline">© 2023. ООО «Wheely» ВСЕ ПРАВА ЗАЩИЩЕНЫ. РАЗРАБОТКА САЙТА — </div>
                <Link href='https://github.com/Citizen-code' style={{'color':'red'}}>Citizen</Link>
            </div>
        </footer>
    )
}