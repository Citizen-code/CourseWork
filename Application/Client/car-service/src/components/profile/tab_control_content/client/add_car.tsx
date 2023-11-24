'use client'
import { useState, useContext, useEffect } from 'react';
import type Car from '@/interface/model/car';
import ApiService from '@/service/api';
import { AuthContext } from '@/components/profile/context';
import type ErrorsForm from '@/interface/errors.form';
import ErrorsShow from '@/components/errors.show';
import type Engine from '@/interface/model/engine';

export default function AddCar({ cancel }: { cancel: () => void }) {
  const empty_error = {isHidden:true,message:'',isHiddenList:true,list:[]}
  const [engines, setEngines] = useState([] as Engine[])
  const { client, fetchData } = useContext(AuthContext);
  const [color, setColor] = useState<string>()
  const [engine_id, setEngineId] = useState<number>()
  const [mileage, setMileage] = useState<string>()
  const [number, setNumber] = useState<string>()
  const [release_year, setReleaseYear] = useState<number>()
  const [vin, setVin] = useState<string>()
  const [name, setName] = useState<string>()
  const [photo, setPhoto] = useState<File|undefined>(undefined)
  const [errorsForm, setErrorsForm] = useState<ErrorsForm>(empty_error)
  useEffect(()=>{
    const fetchData = async () => {
      setEngines((await ApiService.engine()).data);
    }
    fetchData()
  },[])
  return (
    <div className="card">
      <div className="card-body">
        <ErrorsShow errorsForm={errorsForm}/>
        <div className='d-flex justify-content-between'>
          <h5 className='fw-bold d-inline-block d-inline-block'>Добавление данных об авто</h5>
          <button onClick={cancel} type="button" className="btn-close" aria-label="Close" />
        </div>
        <div className="form-outline m-2">
          <label className='fw-bold'>Наименование</label>
          <input className="form-control" onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        <div className="form-outline m-2">
          <label className='fw-bold'>Номер</label>
          <input className="form-control" onChange={(e) => setNumber(e.target.value)} value={number} />
        </div>
        <div className="form-outline m-2">
          <label className='fw-bold'>Год выпуска</label>
          <input type='number' className="form-control" onChange={(e) => setReleaseYear(parseInt(e.target.value))} value={release_year} />
        </div>
        <div className="form-outline m-2">
          <label className='fw-bold'>Цвет</label>
          <input className="form-control" onChange={(e) => setColor(e.target.value)} value={color} />
        </div>
        <div className="form-outline m-2">
          <label className='fw-bold'>Пробег</label>
          <input className="form-control" onChange={(e) => setMileage(e.target.value)} value={mileage} />
        </div>
        <div className="form-outline m-2">
          <label className='fw-bold'>VIN</label>
          <input className="form-control" onChange={(e) => setVin(e.target.value)} value={vin} />
        </div>
        <div className="form-outline m-2">
          <label className='fw-bold'>Тип двигателя</label>
          <select onChange={(e)=>{setEngineId(e.target.value=='-1'?undefined:parseInt(e.target.value))}} className="form-select">
            <option value={'-1'} hidden selected={engine_id==undefined}>Выберите...</option>
            {engines.map(item =>
              <option selected={engine_id == item.id} value={item.id}>{item.name}</option>
            )}
          </select>
        </div>
        <div className="form-outline m-2">
          <label className='fw-bold'>Фото</label>
          <input type='file' className="form-control" onChange={(e) => {if(e.target.files != null) setPhoto(e.target.files[0])}} />
        </div>

        <div className="row m-4">
          <button className="btn btn-secondary btn-block mb-4" onClick={async () => {
            const body: Car = {
              client_id: client.id,
              color,
              mileage,
              number,
              release_year,
              vin,
              name,
              engine_id
            }
            if(photo != undefined){
              body.photo_id = (await ApiService.photo(photo!)).data.id
            }
            const res = (await ApiService.car_add(body)) as any
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
              cancel()
            }
          }}>Добавить</button>
        </div>

      </div>
    </div>
  )
}