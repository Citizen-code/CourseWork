import { useState } from "react"
import Image from 'next/image';
import iconEdit from '@/../public/edit.svg'
import iconEmail from '@/../public/email.svg'
import iconPhone from '@/../public/phone.svg'
import EditClient from "./edit_client";
import { useContext } from 'react'
import { AuthContext } from "../../context";
import AddCar from "./add_car";
import EditCar from "./edit_car";
import InfoClient from "./info_client";
import InfoCar from "./info_car";

export default function ClientInfo(){
    const {client,fetchData} = useContext(AuthContext);
    const [editModeClient,setEditModeClient] = useState<boolean>(false);
    const [editModeCar,setEditModeCar] = useState<boolean>(false);

    const edit_client = () => setEditModeClient(!editModeClient)
    const edit_car = () => setEditModeCar(!editModeCar);
    const cancelEditClient = () =>  setEditModeClient(!editModeClient)
    const cancelEditCar = () => setEditModeCar(!editModeCar);
    return(
        <div>
            <div className="w-100 d-inline-flex align-items-center justify-content-between">
                <div className="p-4">
                    <h5 className="m-0">Добро пожаловать</h5>
                    {(client.surname!=undefined||client.firstname!=undefined)?
                    <h4>{`${client.surname} ${client.firstname}`}</h4>: <></>}
                </div>
                <div className="d-inline-flex align-items-center justify-content-end p-4">
                    {client.email!=undefined?
                    <h5 className="m-2 me-4 d-none d-sm-block">
                        <Image className="me-2" src={iconEmail} alt="EmailSVG" width={30} height={30}/>
                        {client.email}
                    </h5>:<></>}
                    {client.phone!=undefined?
                    <h5 className="m-2 me-4 d-none d-md-block">
                        <Image className="me-2" src={iconPhone} alt="PhoneSVG" width={30} height={30}/>
                        {client.phone}
                    </h5>:<></>}
                </div>
            </div>
            <div className="container">
                <div className="row align-items-top">
                    <div className={`col`}>
                        {editModeClient?<EditClient cancel={cancelEditClient}/>:<InfoClient edit={edit_client}/>}
                    </div>
                    <div className={`col`}>
                        {editModeCar?client?.car != undefined?<EditCar cancel={cancelEditCar}/>:<AddCar cancel={cancelEditCar}/>:<InfoCar edit={edit_car}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}