import { UUID } from "crypto"
import Engine from "./engine"
import Photo from "./photo"

export default interface Car{
    id?:UUID,
    client_id:UUID,
    name?:string,
    number?:string,
    release_year?:number,
    mileage?:string,
    vin?:string,
    color?:string,
    engine_id?:number,
    photo_id?:UUID,
    engine?:Engine,
    photo?:Photo
}