'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';
import ClientInfo from './tab_control_content/client/client_base';
import style from '@/components/style/profile/tab.control.module.css'
import ListHistory from './tab_control_content/history/list';
import NewOrder from './tab_control_content/order/new_order';

export default function TabControl() {
  const params = useSearchParams()
  const select = params.get('select')
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);
  return (
    <div>
      <nav className={`justify-content-center nav nav-tabs flex-nowrap`} id="nav-tab" role="tablist">
        <button className={`nav-link ${(select != 'service') && (select != 'history') ? 'active' : ''}`} id="nav-client-tab" data-bs-toggle="tab" data-bs-target="#nav-client" type="button" role="tab" aria-controls="nav-client" aria-selected="true">Пользователь</button>
        <button className={`nav-link ${select == 'service' ? 'active' : ''}`} id="nav-service-tab" data-bs-toggle="tab" data-bs-target="#nav-service" type="button" role="tab" aria-controls="nav-service" aria-selected="false">Оформление заказа</button>
        <button className={`nav-link ${select == 'history' ? 'active' : ''}`} id="nav-history-tab" data-bs-toggle="tab" data-bs-target="#nav-history" type="button" role="tab" aria-controls="nav-history" aria-selected="false">История</button>
      </nav>
      <div className="border-0 card tab-content" id="nav-tabContent">
        <div className={`tab-pane fade ${(select != 'service') && (select != 'history') ? 'show active' : ''}`} id="nav-client" role="tabpanel" aria-labelledby="nav-home-tab">
          <ClientInfo/>
        </div>
        <div className={`tab-pane fade ${select == 'service' ? 'show active' : ''}`} id="nav-service" role="tabpanel" aria-labelledby="nav-profile-tab">
          <NewOrder/>
        </div>
        <div className={`tab-pane fade ${select == 'history' ? 'show active' : ''}`} id="nav-history" role="tabpanel" aria-labelledby="nav-profile-tab">
          <ListHistory/>
        </div>
      </div>
    </div>
  )
}