import { useState } from 'react'
import type ErrorValidate from '@/interface/model/error_validate';
import RegistrationAction from '@/action/auth/registration';
import type ErrorsForm from '@/interface/errors.form';
import ErrorsShow from '../errors.show';

export default function Registration() {
    const [surname, setSurname] = useState<string>('')
    const [firstname, setFirstname] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [birthDate, setBirthDate] = useState<Date>()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [remember, setRemember] = useState<boolean>(true)
    const [errorsForm, setErrorsForm] = useState<ErrorsForm>({isHidden:true,message:'',isHiddenList:true,list:[]})


    const action = RegistrationAction.bind(null, {email, password, birthDate, surname, firstname, lastname, phone, remember})
    const formAction = async ()=>{
      const error = await action()
      if(error != undefined){
        setErrorsForm({
            message:error!.message,
            isHidden:false,
            isHiddenList:error!.errors?.length == 0,
            list:error!.errors || []
          })
      }else{
        location.href = '/profile'
      }
    }

    return (
        <form action={formAction} className='pt-2'>
            <ErrorsShow errorsForm={errorsForm}/>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className="form-outline mb-4">
                            <input type='email' className="form-control" onChange={e => setEmail(e.target.value)} placeholder='Email' value={email} />
                        </div>
                        <div className="form-outline mb-4">
                            <input type='password' className="form-control" onChange={e => setPassword(e.target.value)} placeholder='Пароль' value={password} />
                        </div>
                        <div className="form-outline mb-4">
                            <input type='tel' className="form-control" onChange={e => setPhone(e.target.value)} placeholder='Телефон' value={phone} />
                        </div>
                    </div>
                    <div className='col'>
                        <div className="form-outline mb-4">
                            <input type='text' className="form-control" onChange={e => setSurname(e.target.value)} placeholder='Фамилия' value={surname} />
                        </div>
                        <div className="form-outline mb-4">
                            <input type='text' className="form-control" onChange={e => setFirstname(e.target.value)} placeholder='Имя' value={firstname} />
                        </div>
                        <div className="form-outline mb-4">
                            <input type='text' className="form-control" onChange={e => setLastname(e.target.value)} placeholder='Отчество' value={lastname} />
                        </div>
                    </div>
                    <div className="form-outline mb-4 d-flex justify-content-center">
                        <label>Дата рождения<input type='date' className="form-control" onChange={e => setBirthDate(new Date(e.target.value))} placeholder='Дата' value={birthDate?.toLocaleDateString('en-CA')} /></label>
                    </div>
                </div>
            </div>

            <div className="row m-1">
                <div className="col d-flex justify-content-center">
                    <div className="form-check mb-3 mb-md-0">
                        <label><input className="form-check-input" onChange={e => setRemember(!remember)} type="checkbox" checked={remember} id="registrationCheck" />Запомнить меня?</label>
                    </div>
                </div>
            </div>
            <div className="row m-4">
                <button type="submit" className="btn btn-primary btn-block mb-4">Зарегистрироваться</button>
            </div>
        </form>
    )
}