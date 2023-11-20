import ItemCarousel from "@/interface/data/ItemCarousel"
import style from '@/components/style/home/carousel.module.css'
import Link from "next/link"

const items:ItemCarousel[] = [
    {
        id:1,
        image_src:'/4004a0f7-ffc1-4f22-8f82-ba19acd0781e.jpg',
        image_alt:'фото авто 1',
        html_element:
            <div className={style.info_carousel}>
                <div style={{'padding':'10px'}}><h1>ПОЛНЫЙ СПЕКТР РЕМОНТНЫХ РАБОТ<br/>АВТОМОБИЛЯ</h1></div>
                <div style={{'padding':'10px'}}><h6>Слесарные работы, техническое обслуживание, диагностика, установка дополнительного<br/>оборудования, кузовные работы.</h6></div>
                <div style={{'padding':'10px'}}><Link className="btn btn-secondary btn-lg" href="/profile" role="button">Оформить</Link></div>
            </div>
    },
    {
        id:2,
        image_src:'/10d7fbd4-60d4-44b7-ab4b-7ef92ff1b36d.jpg',
        image_alt:'фото авто 2',
        html_element:
            <div className={style.info_carousel}>
                <div style={{'padding':'10px'}}><h1>Техническое обслуживание по стандарту<br/>официального дилера без потери<br/>гарантийных обязательств</h1></div>
                <div style={{'padding':'10px'}}><h6>KIA, HYUNDAI. GENESIS. SSANG YOUNG и другие бренды.</h6></div>
                <div style={{'padding':'10px'}}><Link className="btn btn-secondary btn-lg" href="/profile" role="button">Оформить</Link></div>
            </div>
        
    },
    {
        id:3,
        image_src:'/6021a050-1bba-4eab-b123-a154b331e0f5.jpg',
        image_alt:'фото авто 3',
        html_element:
            <div className={style.info_carousel}>
                <div style={{'padding':'10px'}}><h1>Профессиональный ремонт АКПП<br/>за 24 часа с гарантией</h1></div>
                <div style={{'padding':'10px'}}><h6>Мы даем гарантию до двух лет ремонтные работы.</h6></div>
                <div style={{'padding':'10px'}}><Link className="btn btn-secondary btn-lg" href="/profile" role="button">Оформить</Link></div>
            </div>
        
    }
]

export default items