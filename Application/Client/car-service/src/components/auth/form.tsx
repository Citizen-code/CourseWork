'use client'
import LoginForm from "@/components/auth/authorization"
import RegistrationForm from "@/components/auth/registration"
import { useEffect } from 'react'

export default function Form(){
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap')
      }, []);
    return(
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div>
              <nav className="justify-content-center nav nav-tabs border-bottom-0" id="nav-tab" role="tablist">
                  <button className="nav-link active" id="nav-login-tab" data-bs-toggle="tab" data-bs-target="#nav-login" type="button" role="tab" aria-controls="nav-login" aria-selected="true">Авторизоваться</button>
                  <button className="nav-link" id="nav-registration-tab" data-bs-toggle="tab" data-bs-target="#nav-registration" type="button" role="tab" aria-controls="nav-registration" aria-selected="false">Зарегистрироваться</button>
              </nav>
              <div className="card tab-content" id="nav-tabContent">
                <div className="card-body tab-pane fade show active" id="nav-login" role="tabpanel" aria-labelledby="nav-home-tab">
                  <LoginForm/>
                </div>
                <div className="card-body tab-pane fade" id="nav-registration" role="tabpanel" aria-labelledby="nav-profile-tab">
                  <RegistrationForm/>
                </div>
              </div>
            </div>
        </div>
    )
}