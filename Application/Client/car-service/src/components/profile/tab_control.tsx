'use client'
import { useSearchParams, usePathname } from 'next/navigation'
import { useEffect,useContext, useState } from 'react';
import ClientInfo from './tab_control_content/client/client_base';
import ListHistory from './tab_control_content/history/list';
import NewOrder from './tab_control_content/order/new_order';
import { AuthContext } from "@/components/profile/context";

export default function TabControl() {
  const params = useSearchParams()
  const pathname = usePathname()
  const [select,setSelect] = useState(params.get('select'))
  const {client} = useContext(AuthContext);
  useEffect(() => {
    const url = pathname + params.toString()
    console.log(url)
    }, [pathname, params])
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
    console.log('Update')
  }, []);
  return (
    <div>
      <nav className={`justify-content-center nav nav-tabs flex-nowrap`} id="nav-tab" role="tablist">
        <button onClick={()=>setSelect('profile')} className={`nav-link ${(select != 'service') && (select != 'history') ? 'active' : ''}`} id="nav-client-tab" data-bs-toggle="tab" data-bs-target="#nav-client" type="button" role="tab" aria-controls="nav-client" aria-selected="true">Пользователь</button>
        <button onClick={()=>setSelect('service')} className={`nav-link ${select == 'service' ? 'active' : ''}`} id="nav-service-tab" data-bs-toggle="tab" data-bs-target="#nav-service" type="button" role="tab" aria-controls="nav-service" aria-selected="false">Оформление заказа</button>
        <button onClick={()=>setSelect('history')} className={`nav-link ${select == 'history' ? 'active' : ''}`} id="nav-history-tab" data-bs-toggle="tab" data-bs-target="#nav-history" type="button" role="tab" aria-controls="nav-history" aria-selected="false">История</button>
      </nav>
      <div className="border-0 card tab-content" id="nav-tabContent">
        <div className={`tab-pane fade ${(select != 'service') && (select != 'history') ? 'show active' : ''}`} id="nav-client" role="tabpanel" aria-labelledby="nav-home-tab">
          <ClientInfo/>
        </div>
        <div className={`tab-pane fade ${select == 'service' ? 'show active' : ''}`} id="nav-service" role="tabpanel" aria-labelledby="nav-profile-tab">
          
          {!client.id?
            <div className='w-100 d-flex align-items-center justify-content-center p-4'>
              <div className='spinner-border text-info' style={{'width':'4rem','height':'4rem'}} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>:
            client.car != undefined?<NewOrder/>:
            <div>
              <h4 className='fw-bold text-center p-2 pt-4'>Необходимо добавить информацию о транспортном средстве</h4>
              <div className="row m-4">
                <button className="btn btn-secondary btn-block" onClick={()=>setSelect('profile')}>Добавить информацию</button>
              </div>
            </div>}
        </div>
        <div className={`tab-pane fade ${select == 'history' ? 'show active' : ''}`} id="nav-history" role="tabpanel" aria-labelledby="nav-profile-tab">
          <ListHistory/>
        </div>
      </div>
    </div>
  )
}