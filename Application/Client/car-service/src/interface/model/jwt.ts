import { UUID } from "crypto";

export default interface JWT{
    id:UUID,
    type:string
}