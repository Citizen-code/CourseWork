import { UUID } from "crypto";

export default interface Employee{
    id:UUID,
    surname:string,
    firstname:string,
    lastname:string,
}