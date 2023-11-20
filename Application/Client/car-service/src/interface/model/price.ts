import { UUID } from "crypto";

export default interface Price{
    id:UUID,
    price:number,
    is_time_based:boolean
}