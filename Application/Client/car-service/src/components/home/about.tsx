import style from '@/components/style/home/about.module.css'
import Border from '@/components/home/border'

export default function About() {
    return (
        <div className={style['background-img']}>
            <Border/>
            <div className='container h-100'>
                <div className='row h-100 justify-content-center align-items-center'>
                    <div className='col'>
                        <div>
                            <h3>О техцентре</h3>
                            <h6>Мы делаем полный спектр ремонтных работ, от электронной диагностики автомобиля до замены любой его запчасти. Вы всегда получаете гарантированно качественную работу и можете быть уверенными в надежной работе своего автомобиля. Вы получите полную гарантию на все виды работ.</h6>
                            <h6>Обслуживание автомобиля организовано согласно требованиям заводов-изготовителей. Оборудование техцентра соответствует всем современным требованиям.</h6>
                        </div>
                        <div className='row align-items-top'>
                            <div className='col'>
                                <h5>Информация для связи:</h5>
                                <h6><strong>Телефон:</strong> +7 900 428 55 64</h6>
                                <h6><strong>Email:</strong> wheely@yandex.ru</h6>
                            </div>
                            <div className='col'>
                                <h5>Адрес:</h5>
                                <h6>Серпухов, Московская область</h6>
                            </div>
                        </div>
                        
                    </div>
                    <div style={{textAlign:'center'}} className='col d-none d-lg-block'>
                        <iframe src='https://yandex.ru/map-widget/v1/?um=constructor%3A5cab86726606c304a3f11c8e0be84195f6e001b65234a32b60c08f0d749d9c4d&amp;source=constructor' width='450' height='300'/>
                    </div>
                </div>
            </div>
        </div>
    )
}