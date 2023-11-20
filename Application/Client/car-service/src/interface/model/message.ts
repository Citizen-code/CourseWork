import ErrorValidate from "./error_validate";

export default interface Message{
    message:string,
    errors:ErrorValidate[]
}