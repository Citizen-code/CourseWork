import type ErrorValidate from "./model/error_validate";

export default interface ErrorsForm{
    isHidden:boolean,
    isHiddenList:boolean,
    message:string,
    list:ErrorValidate[],
}