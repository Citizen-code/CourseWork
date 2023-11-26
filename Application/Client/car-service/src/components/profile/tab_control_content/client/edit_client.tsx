'use client'
import { useState, useContext } from 'react';
import type Client from '@/interface/model/client';
import ApiService from '@/service/api';
import { AuthContext } from '@/components/profile/context';
import type ErrorsForm from '@/interface/errors.form';
import ErrorsShow from '@/components/errors.show';



export default function EditClient({ cancel }: { cancel: () => void }) {
  const empty_error = {isHidden:true,message:'',isHiddenList:true,list:[]}
  const { client, fetchData } = useContext(AuthContext);
  const [birth_date, setBirthDate] = useState(new Date(client.birth_date))
  const [email, setEmail] = useState(client.email)
  const [firstname, setFirstname] = useState(client.firstname)
  const [lastname, setLastname] = useState(client.lastname)
  const [phone, setPhone] = useState(client.phone)
  const [surname, setSurname] = useState(client.surname)
  const [errorsForm, setErrorsForm] = useState<ErrorsForm>(empty_error)

  return (
    <div className="card">
      <div className="card-body">
        <ErrorsShow errorsForm={errorsForm}/>
        <div className='d-flex justify-content-between'>
          <h5 className='fw-bold d-inline-block d-inline-block'>Изменение данных об клиенте</h5>
          <button onClick={cancel} type="button" className="btn-close" aria-label="Close" />
        </div>
        <div className="form-outline m-2">
          <label className='fw-bold'>Фамилия</label>
          <input id='Surname' className="form-control" onChange={(e) => setSurname(e.target.value)} value={surname} />
        </div>
        <div className="form-outline m-2">
          <label className='fw-bold'>Имя</label>
          <input id='Firstname' className="form-control" onChange={(e) => setFirstname(e.target.value)} value={firstname} />
        </div>
        <div className="form-outline m-2">
          <label className='fw-bold'>Отчество</label>
          <input id='Lastname' className="form-control" onChange={(e) => setLastname(e.target.value)} value={lastname} />
        </div>
        <div className="form-outline m-2">
          <label className='fw-bold'>Дата рождения</label>
          <input id='BirthDate' className="form-control" type='date' onChange={(e) => setBirthDate(new Date(e.target.value))} defaultValue={birth_date?.toLocaleDateString('en-CA')} />
        </div>
        <div className="form-outline m-2">
          <label className='fw-bold'>Почта</label>
          <input id='Email' className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className="form-outline m-2">
          <label className='fw-bold'>Телефон</label>
          <input id='Phone' className="form-control" onChange={(e) => setPhone(e.target.value)} value={phone} />
        </div>
        <div className="row m-4">
          <button id='EditClientBnt' className="btn btn-secondary btn-block mb-4" onClick={async () => {
            const body: Client = {
              birth_date: birth_date?.toLocaleDateString('en-CA'),
              email,
              firstname,
              lastname,
              phone,
              surname,
              id: client.id
            }
            const res = (await ApiService.client_update(body)) as any
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
            
          }}>Сохранить</button>
        </div>
      </div>
    </div>
  )
}