import Image from 'next/image'
import style from '@/components/style/home/services.module.css'
import items from '@/data/service'

export default function Services(){
    return(
        <div className={style['background']}>
            <div className='container h-100'>
                <h1 className={style['h1']}>Список наших услуг</h1>
                <div className='row justify-content-center align-items-top'>
                    {items.map(item=> 
                        <div key={item.id} className={`col-md-3 col-sm-12 card ${style['element']}`}>
                            <Image src={item.image} height={300} width={300} className={`card-img-top ${style['img']}`} alt="Фото услуги"/>
                            <div className="card-body">
                                <h5 className={`card-title ${style['h5']}`}>
                                    {item.name}
                                </h5>
                                <div className="card-text">
                                    {item.description}
                                </div>
                                <a className={`btn btn-outline-danger ${style['bnt']}`} href="#" role="button">
                                    Заказать услугу
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}