import { UUID } from "crypto"
import Car from "./car"

export default interface Client{
    id:UUID,
    surname:string,
    firstname:string,
    lastname:string,
    birth_date:string,
    email:string,
    phone:string,
    car?:Car
}