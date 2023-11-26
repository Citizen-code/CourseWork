import Order from "@/interface/model/order"
import ApiService from "@/service/api"
import { useEffect, useState } from "react"
import { useContext } from 'react'
import { AuthContext } from "../../context";
import ItemList from "./item"

export default function ListHistory(){
    const {client} = useContext(AuthContext);
    const [listOrders, setListOrders] = useState([] as Order[])
    const [page, setPage] = useState<number>(1)
    const [countPage, setCountPage] = useState<number>(1)
    const [isActive, setIsActive] = useState<boolean>(true)
    const [isFinally, setIsFinally] = useState<boolean>(true)
    const [isCancel, setIsCancel] = useState<boolean>(false)
    const fetchData = async () => {
        const status = [
            isActive?2:undefined,
            isFinally?1:undefined,
            isCancel?4:undefined
        ]
        const count = (await ApiService.orders_count(status)).data.count_pages
        setCountPage(count)
        if(page > count) {
            setPage(count==0?1:count)
            setListOrders(((await ApiService.orders(true, true, count==0?1:count, status)).data));
        }
        else setListOrders(((await ApiService.orders(true, true, page, status)).data));
        
    }
    const click_page =(item:number) => {
        if(page == item) return;
        setPage(item);
    }
    const create_pages = ()=>{
        let pages = [] as number[];
        for (let index = 1; index <= countPage; index++) {
            pages.push(index)
        }
        return <>
            {pages.map(item => 
                <li key={item} className={`page-item ${item == page?'active':''}`}>
                    <button className="page-link" onClick={async ()=> click_page(item)}>{item}</button>
                </li>
            )}
        </>
    }
    useEffect(() =>{
        fetchData()
    },[isActive, isCancel, isFinally, page])
    return (
        <>
            <div className="w-100 d-flex align-items-center justify-content-between">
                <div className="p-4  d-none d-sm-block">
                    <h5 className="m-0">Добро пожаловать</h5>
                    {(client.surname!=undefined||client.firstname!=undefined)?
                    <h4>{`${client.firstname} ${client.surname}`}</h4>: <></>}
                </div>
                    <div className="p-4">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="SwitchActive" defaultChecked={isActive} onChange={()=>{
                                setIsActive(!isActive)
                            }}/>
                            <label className="form-check-label" htmlFor="SwitchActive">Показывать активные заказы</label>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="SwitchFinally" defaultChecked={isFinally} onChange={()=>{
                                setIsFinally(!isFinally)
                            }}/>
                            <label className="form-check-label" htmlFor="SwitchFinally">Показывать завешенные заказы</label>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="SwitchCancel" defaultChecked={isCancel} onChange={() => {
                                setIsCancel(!isCancel)
                            }}/>
                            <label className="form-check-label" htmlFor="SwitchCancel">Показывать отмененные заказы</label>
                        </div>
                    </div>
                </div>
                {listOrders.length != 0?<>
                    <div className="list-group">
                        {listOrders.map(item =>
                            <button key={item.id} data-bs-toggle="modal" data-bs-target={`#id-${item.id}`} className={`list-group-item list-group-item-action history-item status-${item.status_id}`} aria-current="true">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className='fw-bold d-inline-block pt-2'>{item.status?.name}</h5>
                                    <div>
                                        <div><small className='fw-bold d-inline-block'>{item.date}</small></div>
                                        <div className="text-end"><small className='fw-bold d-inline-block'>{item.time}</small></div>
                                    </div>
                                </div>
                                {item.comment != undefined?
                                <div>
                                    <h5 className='fw-bold d-inline-block'>Комментарий:</h5>
                                    <h6 className='fw-light text-truncate'>{item.comment}</h6>
                                </div>:<></>}
                            {item.status_id == 1?
                                <div className="">
                                    <h5 className='fw-bold d-inline-block'>Выполнил:</h5>
                                    <h6 className='fw-light d-inline-block ms-2'>{`${item.employee?.surname} ${item.employee?.firstname}`}</h6>
                                </div>:<></>}
                            </button>)}
                    </div>
                    {listOrders.map(item => 
                        <ItemList key={item.id} order={item} fetchData={fetchData}/>
                    )}
                </>
            :<h3 className='fw-bold text-center p-4'>Нет ни одного заказа</h3>}
            {countPage > 1 ?
            <nav className="p-3">
                <ul className="pagination d-flex flex-wrap align-items-center justify-content-center">
                    <li className="page-item">
                        <button className="page-link" onClick={async ()=> click_page(1)}><span aria-hidden="true">&laquo;</span></button>
                    </li>
                    {create_pages()}
                    <li className="page-item">
                        <button className="page-link" onClick={async ()=> click_page(countPage)}><span aria-hidden="true">&raquo;</span></button>
                    </li>
                </ul>
            </nav>
            :<></>}
        </>
    )
}