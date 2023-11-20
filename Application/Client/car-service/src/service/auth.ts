import $auth from "@/core/axios";
import ClientValidate from "@/interface/model/client_validate";
import Message from "@/interface/model/message";
import {AxiosResponse} from 'axios'

export default class AuthService{
    static async validate(): Promise<AxiosResponse<ClientValidate>> {
        return await $auth.get<ClientValidate>('auth/validate')
    }
}