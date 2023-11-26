import type Order from "@/interface/model/order";
import Image from 'next/image';

export default function ItemContent({ order }: { order: Order }) {
    return (<>
        <div className="modal-body">
            <div className="container-fluid">
                <div className={`row row-cols-1 ${order.list_consumable_parts?.length != 0 ? 'row-cols-sm-2' : ''}`}>
                    <div className="col">
                        <h6 className='fw-bold d-inline-block pt-1'>Список услуг:</h6>
                        <div className="list-group">
                            {order.list_services?.map(item =>
                                <div className="list-group-item list-group-item-action" key={item.id}>
                                    <div>
                                        <h6 className='fw-bold d-inline-block'>Наименование:</h6>
                                        <h6 className='fw-light d-inline-block ms-2'>{item.service.name}</h6>
                                    </div>
                                    <div>
                                        <h6 className='fw-bold d-inline-block'>Цена:</h6>
                                        <h6 className='fw-light d-inline-block ms-2'>{item.price.price}</h6>
                                    </div>
                                    {item.time!=null?
                                    <div>
                                        <h6 className='fw-bold d-inline-block'>Время выполнения:</h6>
                                        <h6 className='fw-light d-inline-block ms-2'>{item.time}</h6>
                                    </div>:<></>}
                                    <div>
                                        <h6 className='fw-bold d-inline-block'>Итоговая стоимость:</h6>
                                        <h6 className='fw-light d-inline-block ms-2'>{(item.price.is_time_based && item.time!=null) ? item.price.price * item.time : item.price.price}</h6>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {order.list_consumable_parts?.length != 0 ?
                        <div className="col" >
                            <div className="list-group">
                                <h6 className='fw-bold d-inline-block pt-1'>Список расходных материалов:</h6>
                                {order.list_consumable_parts?.map(item =>
                                    <div className="list-group-item list-group-item-action" key={item.id}>
                                        <Image hidden={item.consumable_part.photo_id != undefined} src={`http://185.252.146.21/photo/${item.consumable_part.photo?.id}${item.consumable_part.photo?.extension}`} height={100} width={100} className={`card-img-top`} alt="Фото авто"/>
                                        <div>
                                            <h6 className='fw-bold d-inline-block'>Наименование:</h6>
                                            <h6 className='fw-light d-inline-block ms-2'>{item.consumable_part.name}</h6>
                                        </div>
                                        <div>
                                            <h6 className='fw-bold d-inline-block'>Цена:</h6>
                                            <h6 className='fw-light d-inline-block ms-2'>{item.consumable_part.price}</h6>
                                        </div>
                                        <div>
                                            <h6 className='fw-bold d-inline-block'>Бренд:</h6>
                                            <h6 className='fw-light d-inline-block ms-2'>{item.consumable_part.brand}</h6>
                                        </div>
                                        <div>
                                            <h6 className='fw-bold d-inline-block'>Артикль:</h6>
                                            <h6 className='fw-light d-inline-block ms-2'>{item.consumable_part.article}</h6>
                                        </div>
                                        <div>
                                            <h6 className='fw-bold d-inline-block'>Единица измерения:</h6>
                                            <h6 className='fw-light d-inline-block ms-2'>{item.consumable_part.measure_unit}</h6>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div> :
                        <></>}
                </div>
            </div>
        </div>
    </>
    )
}