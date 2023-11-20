import { UUID } from "crypto";
import ConsumablePart from "./consumable_part";

export default interface ServiceList{
    id:UUID,
    order_id:UUID,
    consumable_part_id:UUID,
    consumable_part:ConsumablePart
}