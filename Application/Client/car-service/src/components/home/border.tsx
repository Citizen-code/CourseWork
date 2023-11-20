import style from '@/components/style/home/border.module.css'

export default function Border() {
    return (
        <>
            <div className={`${style['element-shape']} ${style['element-shape-top']}`}>
                <svg className={style['svg']} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
	                <path className={style['element-shape-fill']} d="M761.9,44.1L643.1,27.2L333.8,98L0,3.8V0l1000,0v3.9"/>
                </svg>
            </div>
            <div className={`${style['element-shape']} ${style['element-shape-bottom']}`}>
                <svg className={style['svg']} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
	                <path className={style['element-shape']} d="M761.9,44.1L643.1,27.2L333.8,98L0,3.8V0l1000,0v3.9"/>
                </svg>
            </div>
        </>
    )
}