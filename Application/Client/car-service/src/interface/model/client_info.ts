import Client from "./client";
import ClientValidate from "./client_validate";

export default interface ClientInfo{
    validate:ClientValidate,
    client:Client
}