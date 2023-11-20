import { UUID } from "crypto";
import type Photo from "./photo";

export default interface ConsumablePart{
    id:UUID,
    brand:string,
    article:string,
    name:string,
    price:number,
    measure_unit:string,
    photo_id:UUID,
    date_add:string
    photo:Photo
}