import style from '@/components/style/home/feedback.module.css'
import items from '@/data/feedback'

export default function Feedback(){
    return(
        <div className={style['background']}>
            <div data-negative="false">
			  <svg className={`${style['svg']} w-100 ${style['element-shape-top']}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2600 131.1" preserveAspectRatio="none">
                <path className={`${style['element-shape']} ${style['element-shape-fill']}`} d="M0 0L2600 0 2600 69.1 0 0z"></path>
                <path className={`${style['element-shape']} ${style['element-shape-fill']}`} style={{'opacity':'0.25'}} d="M0 0L2600 0 2600 69.1 0 69.1z"></path>
                <path className={`${style['element-shape']} ${style['element-shape-fill']}`} style={{'opacity':'0.25'}} d="M2600 0L0 0 0 130.1 2600 69.1z"></path>
                </svg>		
            </div>
            <div className={`container-fluid h-100`}>
                <h1 className={style['h1']}>Отзывы наших клиентов</h1>
                <div className='row h-100 justify-content-center'>
                    {items.map(item=>
                        <div key={item.id} className={`col-md-3 card mb-3 ${style['card-background']}`}>
                            <div className="card-body">
                                <p className="card-text">{item.text}</p>
                            </div>
                            <div className={`card-footer ${style['card-footer']}`}>{item.author}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}