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
    const fetchData = async (select_page=page) => {
        setCountPage(((await ApiService.orders_count()).data.count_pages))
        setListOrders(((await ApiService.orders(true, true, select_page)).data));
    }
    const click_page =(item:number) => {
        if(page == item) return;
        setPage(item);
        fetchData(item)
    }
    const create_pages = ()=>{
        let pages = [] as number[];
        for (let index = 1; index <= countPage; index++) {
            pages.push(index)
        }
        return <>
            {pages.map(item => 
                <li key={item} className="page-item">
                    <button className="page-link" onClick={async ()=> click_page(item)}>{item}</button>
                </li>
            )}
        </>
    }
    useEffect(() =>{
        fetchData()
    },[])
    return (
        <>
            <div className="w-100 d-inline-flex align-items-center justify-content-between">
                <div className="p-4">
                    <h5 className="m-0">Добро пожаловать</h5>
                    {(client.surname!=undefined||client.firstname!=undefined)?
                    <h4>{`${client.surname} ${client.firstname}`}</h4>: <></>}
                </div>
                <div className="d-inline-flex align-items-center justify-content-end p-4">
                    <div>Текст</div>
                </div>
            </div>
            {listOrders.length != 0? <>
                    <div className="list-group">
                        {listOrders.map(item =>
                            <button key={item.id} data-bs-toggle="modal" data-bs-target={`#id-${item.id}`} className="list-group-item list-group-item-action" aria-current="true">
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
            :<h3 className='fw-bold text-center p-'>Нет ни одного заказа</h3>}
            <nav className="p-3">
                <ul className="pagination d-flex flex-wrap align-items-center justify-content-center">
                    <li className="page-item">
                        <button className="page-link" onClick={async ()=> click_page(1)}><span aria-hidden="true">&laquo;</span></button>
                    </li>
                    {countPage > 1 ? create_pages():<></>}
                    <li className="page-item">
                        <button className="page-link" onClick={async ()=> click_page(countPage)}><span aria-hidden="true">&raquo;</span></button>
                    </li>
                </ul>
            </nav>
        </>
    )
}