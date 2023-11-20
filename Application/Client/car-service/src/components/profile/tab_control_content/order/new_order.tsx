import { useState, useContext, useEffect } from 'react';
import ApiService from '@/service/api';
import { AuthContext } from '@/components/profile/context';
import type ErrorsForm from '@/interface/errors.form';
import ErrorsShow from '@/components/errors.show';
import type Order from '@/interface/model/order';

export default function NewOrder() {
    const empty_error = { isHidden: true, message: '', isHiddenList: true, list: [] }
    const { client, fetchData } = useContext(AuthContext);
    const [errorsForm, setErrorsForm] = useState<ErrorsForm>(empty_error)
    const [date, setDate] = useState<string>('')
    const [time, setTime] = useState<string>('')
    const [times, setTimes] = useState<string[]>([])
    const [comment, setComment] = useState<string>('')
    const [isVisibleTime, setIsVisibleTime] = useState<boolean>(false)
    const [isVisibleComment, setIsVisibleComment] = useState<boolean>(false)

    const GetTimes = (busy_times:Order[]) => {
        const times = [] as string[]
        for (let index = 8; index < 21; index++) {
            const time = `${index<10?'0'+index:index}:00`
            if(busy_times.find((i)=> i.time == `${time}:00`) == undefined)
                times.push(time);
        }
        setTimes(times)
    }

    const remove = () =>{
        setDate('');
        setIsVisibleTime(false);
        setIsVisibleComment(false);
        setTimes([]);
        setTime('')
    }
    
    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className="row m-4">
            <ErrorsShow errorsForm={errorsForm}/>
                <div className="form-outline m-2">
                    <label className='fw-bold'>Дата</label>
                    <input type='date' className="form-control" onChange={
                        async (e) =>{
                            if(e.target.value != ''){
                                if(new Date(e.target.value) > new Date()){
                                    setDate(e.target.value);
                                    setIsVisibleComment(false);
                                    setTime('')
                                    GetTimes((await ApiService.order_time(e.target.value)).data);
                                    setIsVisibleTime(true);
                                    return;
                                }else remove()
                            } else remove()
                        }

                    } value={date} />
                </div>
                {isVisibleTime?
                <div className="form-outline m-2">
                    <label className='fw-bold'>Время</label>
                    <div className="d-flex flex-wrap align-items-center justify-content-center btn-group" role="group">
                        {times.length == 0?<div>В этот день невозможно записаться</div>:
                        times.map(item=>
                            <div key={item}>
                                <label onClick={(e)=>{
                                    setTime(item)
                                    setIsVisibleComment(true)
                                }} className="btn btn-outline-primary">{item}</label>
                                <input type="radio" className="btn-check" id={item}/>
                            </div>
                        )}
                    </div>
                </div>:<></>}
                {isVisibleComment?<>
                <div className="form-outline m-2">
                    <label className='fw-bold'>Комментарий</label>
                    <textarea className="form-control" rows={3} onChange={(e) => setComment(e.target.value)} value={comment} />
                </div>
                <button className="m-2 btn btn-secondary btn-block" onClick={async () => {
                    const body: Order = {
                        client_id:client.id,
                        date,
                        time,
                        comment,
                    }
                    const res = (await ApiService.add_order(body)) as any
                    if(res.response){
                        const error = res.response.data
                        setErrorsForm({
                            message:error!.message,
                            isHidden:false,
                            isHiddenList:error!.errors?.length == 0,
                            list:error!.errors || []
                        })
                    }else{
                        setErrorsForm(empty_error)
                        await fetchData()
                        location.href = '/profile'
                    }
                }}>Добавить</button></>:
                <></>}
            </div>
        </div>
    )
}