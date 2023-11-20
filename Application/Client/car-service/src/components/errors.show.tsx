import type ErrorsForm from '@/interface/errors.form';

export default function ErrorsShow({errorsForm}:{errorsForm:ErrorsForm}) {
  return (
    <div className="alert alert-danger" hidden={errorsForm.isHidden}>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              {errorsForm.message}
            </button>
          </h2>
          <div hidden={errorsForm.isHiddenList} id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              {errorsForm.list.map(item =>
                <div key={`${item.path} ${item.value} ${item.msg}`}>
                  <div className='d-inline-flex'>
                    <strong className='me-1'>{item.path + ':'}</strong>
                    <div>{item.msg}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  )
}