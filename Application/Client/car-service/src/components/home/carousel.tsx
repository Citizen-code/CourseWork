'use client'
import style from '@/components/style/home/carousel.module.css'
import Image from 'next/image'
import { useEffect } from 'react'
import items from '@/data/carousel'

export default function Carousel(){
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap');
      }, []);
    return(
        <div id="carouselExampleControls" className="carousel slide carousel-fade" data-bs-interval="false">
            <div className="carousel-inner">
            {items.map(item=>
                <div key={item.id} className={`carousel-item ${item.id===1?'active':''} no-select ${style.image_item_carousel}`}>
                    <div style={{'position':'relative'}}>
                        <Image
                            src={item.image_src}
                            className="d-block w-100" 
                            alt={item.image_alt}
                            fill={true}
                            priority/>
                        <div className={style.image_filter}/>
                        {item.html_element}
                    </div>
                </div>
            )}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}