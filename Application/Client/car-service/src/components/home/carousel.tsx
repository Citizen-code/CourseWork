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
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                </svg>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                </svg>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}