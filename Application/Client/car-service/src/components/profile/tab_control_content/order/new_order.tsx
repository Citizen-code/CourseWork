import { useState, useContext } from 'react';
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
    const [isVisibleMessage, setIsVisibleMessage] = useState<boolean>(false)

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
        setIsVisibleMessage(true)
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
                    <input id='DateOrder' type='date' className="form-control" max="2024-12-31" onChange={
                        async (e) =>{
                            if(e.target.value != ''){
                                setDate(e.target.value);
                                const select_date = new Date(e.target.value)
                                const current_date = new Date()
                                if(select_date > current_date && select_date <= new Date(`${current_date.getFullYear()+1}-12-31`)){
                                    setIsVisibleMessage(false)
                                    setIsVisibleComment(false);
                                    setTime('')
                                    GetTimes((await ApiService.order_time(e.target.value)).data);
                                    setIsVisibleTime(true);
                                    return;
                                }else remove()
                            } else remove()
                        }

                    } defaultValue={date} />
                </div>
                {isVisibleMessage ? <div>На этот день нельзя записаться</div>:<></>}
                {isVisibleTime?
                <div className="form-outline m-2">
                    <label className='fw-bold'>Время</label>
                    <div className="d-flex flex-wrap align-items-center justify-content-center btn-group" role="group">
                        {times.length == 0?<div>В этот день невозможно записаться</div>:
                        times.map(item=>
                            <div key={item}>
                                <input autoComplete='off' type="radio" className="btn-check" name='bnt' id={item}/>
                                <label htmlFor={item} onClick={(e)=>{
                                    setTime(item)
                                    setIsVisibleComment(true)
                                }} className="btn btn-outline-info TimeOrder">{item}</label>
                            </div>
                        )}
                    </div>
                </div>:<></>}
                {isVisibleComment?<>
                <div className="form-outline m-2">
                    <label className='fw-bold'>Комментарий</label>
                    <textarea id='Comment' className="form-control" rows={4} onChange={(e) => setComment(e.target.value)} value={comment} />
                </div>
                <button id='OrderNewBnt' className="m-2 btn btn-secondary btn-block" onClick={async () => {
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
                        location.href = '/profile?select=history';
                    }
                }}>Оформить</button></>:
                <></>}
            </div>
        </div>
    )
}