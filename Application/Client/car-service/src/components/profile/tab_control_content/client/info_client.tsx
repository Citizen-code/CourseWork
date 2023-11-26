'use client'
import { useContext } from 'react';
import { AuthContext } from '@/components/profile/context';
import iconEdit from '@/../public/edit.svg'
import Image from 'next/image';


export default function InfoClient({ edit }: { edit: () => void }) {
  const { client } = useContext(AuthContext);

  return (
    <div className="card">
      <div className="card-body">
        <div className='d-flex justify-content-between'>
          <h5 className='fw-bold d-inline-block d-inline-block'>Информация о пользователе</h5>
          <button id='EditClientBnt' type="button" onClick={edit} className="p-0 btn">
            <Image src={iconEdit} alt="EditSVG" width={30} height={30} />
          </button>
        </div>
        <div>
          <h5 className='fw-bold d-inline-block d-inline-block'>Фамилия:</h5>
          <h5 className='fw-light d-inline-block ms-2'>
            {client.id ? client.surname ? client.surname : 'Не указанно' :
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
            }
          </h5>
        </div>
        <div>
          <h5 className='fw-bold d-inline-block'>Имя:</h5>
          <h5 className='fw-light d-inline-block ms-2'>
            {client.id ? client.firstname ? client.firstname : 'Не указанно' :
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
            }
          </h5>
        </div>
        <div>
          <h5 className='fw-bold d-inline-block'>Отчество:</h5>
          <h5 className='fw-light d-inline-block ms-2'>
            {client.id ? client.lastname ? client.lastname : 'Не указанно' :
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
            }
          </h5>
        </div>
        <div>
          <h5 className='fw-bold d-inline-block'>Дата рождения:</h5>
          <h5 className='fw-light d-inline-block ms-2'>
            {client.id ? client.birth_date ? client.birth_date : 'Не указанно' :
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
            }
          </h5>
        </div>
        <div>
          <h5 className='fw-bold d-inline-block'>Почта:</h5>
          <h5 className='fw-light d-inline-block ms-2'>
            {client.id ? client.email ? client.email : 'Не указанно' :
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
            }
          </h5>
        </div>
        <div>
          <h5 className='fw-bold d-inline-block'>Телефон:</h5>
          <h5 className='fw-light d-inline-block ms-2'>
            {client.id ? client.phone ? client.phone : 'Не указанно' :
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
            }
          </h5>
        </div>
      </div>
    </div>
  )
}