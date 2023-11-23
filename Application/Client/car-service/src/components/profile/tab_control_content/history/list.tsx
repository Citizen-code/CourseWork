import Order from "@/interface/model/order"
import ApiService from "@/service/api"
import { useEffect, useState } from "react"
import ItemList from "./item"

export default function ListHistory(){
    const [listOrders, setListOrders] = useState([] as Order[])
    const fetchData = async () => setListOrders(((await ApiService.orders(true)).data))
    useEffect(() =>{
        fetchData()
    },[])
    return (
        <>
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
        </>
    )
}