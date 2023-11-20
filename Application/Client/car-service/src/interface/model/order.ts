import { UUID } from "crypto";
import ServiceList from "./list_service";
import ConsumablePartsList from "./list_consumable_parts";
import Status from "./status";
import Employee from "./employee";

export default interface Order{
    id?:UUID,
    date?:string,
    time?:string,
    comment?:string,
    client_id?:UUID,
    employee_id?:UUID,
    status_id?:number,
    list_services?:ServiceList[]
    list_consumable_parts?:ConsumablePartsList[]
    status?:Status,
    employee?:Employee
}