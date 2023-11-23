import type Order from "@/interface/model/order";
import ItemContent from "./item.content";
import ApiService from "@/service/api";

export default function ItemList({ order, fetchData }: { order: Order, fetchData: () => Promise<void> }) {
    const switch_status = () => {
        switch (order.status_id) {

            case 1: return <ItemContent order={order} />;
            case 2: return <div>
                <h5 className='ps-3 pb-2 fw-bold d-inline-block'>Заказ ожидает выполнения</h5>
            </div>
            case 3: return <div>
                <h5 className='ps-3 pb-2 fw-bold d-inline-block'>Заказ в процессе выполнения</h5>
            </div>
            case 4: return <div>
                <h5 className='ps-3 pb-2 fw-bold d-inline-block'>Заказ отменен</h5>
            </div>
        }
    }
    return (
        <div className="modal fade modal-xl modal-dialog-scrollable" id={`id-${order.id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className='modal-title fw-bold d-inline-block pt-1' id="exampleModalLabel">{order.status?.name}</h6>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {order.comment != undefined ?
                    <div className="ps-3 pt-2">
                        <h5 className='fw-bold d-inline-block'>Комментарий:</h5>
                        <h6 className='fw-light text-truncate'>{order.comment}</h6>
                    </div> : <></>}
                    {switch_status()}
                    {order.status_id == 2 ?
                        <div className="modal-footer p-0 m-0">
                            <button onClick={async (e) => {
                                await ApiService.order_delete(order.id!);
                                await fetchData()
                            }} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отменить заказ</button>
                        </div> :
                        <></>}
                </div>
            </div>
        </div>
    )
}