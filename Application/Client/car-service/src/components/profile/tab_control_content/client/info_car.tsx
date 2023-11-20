'use client'
import { useContext } from 'react';
import { AuthContext } from '@/components/profile/context';
import iconEdit from '@/../public/edit.svg'
import Image from 'next/image';


export default function InfoCar({ edit }: { edit: () => void }) {
  const { client } = useContext(AuthContext);

  return (
    <div className="card">
      <Image src={`${process.env.BASE_URL}/photo/${client.car?.photo?.id}${client.car?.photo?.extension}`} height={250} width={300} className={`card-img-top`} alt="Фото авто"/>
      <div className="card-body">
        {((client.id && client.car)||(!client.id)) ?
          <>
            <div className='d-flex justify-content-between'>
              <h5 className='fw-bold d-inline-block d-inline-block'>Информация об авто</h5>
              <button type="button" onClick={edit} className="p-0 btn">
                <Image src={iconEdit} alt="EditSVG" width={30} height={30} />
              </button>
            </div>
            <div>
              <h5 className='fw-bold d-inline-block d-inline-block'>Наименование:</h5>
              <h5 className='fw-light d-inline-block ms-2'>
                {client.id ? client.car?.name ? client.car?.name : 'Не указанно' :
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                  </div>
                }
              </h5>
            </div>
            <div>
              <h5 className='fw-bold d-inline-block'>Номер:</h5>
              <h5 className='fw-light d-inline-block ms-2'>
                {client.id ? client.car?.number ? client.car?.number : 'Не указанно' :
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                  </div>
                }
              </h5>
            </div>
            <div>
              <h5 className='fw-bold d-inline-block'>Год выпуска:</h5>
              <h5 className='fw-light d-inline-block ms-2'>
                {client.id ? client.car?.release_year ? client.car?.release_year : 'Не указанно' :
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                  </div>
                }
              </h5>
            </div>
            <div>
              <h5 className='fw-bold d-inline-block'>Пробег:</h5>
              <h5 className='fw-light d-inline-block ms-2'>
                {client.id ? client.car?.mileage ? client.car?.mileage : 'Не указанно' :
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                  </div>
                }
              </h5>
            </div>
            <div>
              <h5 className='fw-bold d-inline-block'>Тип двигателя:</h5>
              <h5 className='fw-light d-inline-block ms-2'>
                {client.id ? client.car?.engine_id ? client.car?.engine?.name : 'Не указанно' :
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                  </div>
                }
              </h5>
            </div>
            <div>
              <h5 className='fw-bold d-inline-block'>VIN номер:</h5>
              <h5 className='fw-light d-inline-block ms-2'>
                {client.id ? client.car?.vin ? client.car?.vin : 'Не указанно' :
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                  </div>
                }
              </h5>
            </div>
            <div>
              <h5 className='fw-bold d-inline-block'>Цвет:</h5>
              <h5 className='fw-light d-inline-block ms-2'>
                {client.id ? client.car?.color ? client.car?.color : 'Не указанно' :
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                  </div>
                }
              </h5>
            </div>
          </> :
          <>
          <div>
            <h5 className='fw-bold text-center'>Необходимо добавить информацию о транспортном средстве</h5>
            <div className="row m-4">
              <button className="btn btn-secondary btn-block" onClick={edit}>Добавить информацию</button>
            </div>
          </div>
          </>
        }
      </div>
    </div>
  )
}