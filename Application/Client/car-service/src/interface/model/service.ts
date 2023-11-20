import { UUID } from "crypto";
import Price from "./price";

export default interface Service{
    id:UUID,
    name:string,
    date_add:Date,
    price_id:UUID,
    is_active:Boolean,
    price:Price
}