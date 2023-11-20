import { UUID } from "crypto";
import Service from "./service";
import Price from "./price";

export default interface ServiceList{
    id:UUID,
    order_id:UUID,
    service_id:UUID,
    price_id:UUID,
    time:number,
    price:Price,
    service:Service
}