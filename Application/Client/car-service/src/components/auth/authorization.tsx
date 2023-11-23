'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import type ErrorValidate from '@/interface/model/error_validate';
import LoginAction from '@/action/auth/login';
import type ErrorsForm from '@/interface/errors.form';
import ErrorsShow from '../errors.show';

export default function Authorization() {
  const params = useSearchParams()
  const url = params.get('url')
  const [email, setEmail] = useState<string>('1234@yandex.ru')
  const [password, setPassword] = useState<string>('123')
  const [remember, setRemember] = useState<boolean>(true)
  const [errorsForm, setErrorsForm] = useState<ErrorsForm>({isHidden:true,message:'',isHiddenList:true,list:[]})

  const formAction = async ()=>{
    const error = await LoginAction({email, password, remember})
    if(error != undefined){
      setErrorsForm({
        message:error!.message,
        isHidden:false,
        isHiddenList:error!.errors?.length == 0,
        list:error!.errors || []
      })
    }else{
      location.href = url || '/profile'
    }
  }
  
  return (
    <form action={formAction} className='pt-2'>
      <ErrorsShow errorsForm={errorsForm}/>
      <div className="form-outline mb-4">
        <input className="form-control" onChange={e => setEmail(e.target.value)} placeholder='Email' value={email} />
      </div>
      <div className="form-outline mb-4">
        <input className="form-control" onChange={e => setPassword(e.target.value)} placeholder='Пароль' value={password} />
      </div>

      <div className="row m-1">
        <div className="col d-flex justify-content-center">
          <div className="form-check mb-3 mb-md-0">
            <label><input className="form-check-input" onChange={e => setRemember(!remember)} type="checkbox" checked={remember} id="loginCheck" />Запомнить меня?</label>
          </div>
        </div>
      </div>
      <div className="row m-4">
        <button type="submit" className="btn btn-primary btn-block mb-4">Войти</button>
      </div>
    </form>
  )
}