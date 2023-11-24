import style from '@/components/style/home/gallery.module.css'
import items from '@/data/gallery'

export default function Gallery(){
    return(
        <div className={style['background']}>
            <div className='container h-100'>
                <h1 className={style['h1']}>Галерея</h1>
                <div className='row align-items-top'>
                    {items.map((item,index)=> 
                        <div key={index} className={`col-6 col-md-4 ${style['element']}`}>
                            <img src={item} height={250} width={'100%'} alt="Фото услуги"/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}