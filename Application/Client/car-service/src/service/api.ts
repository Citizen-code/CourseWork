import $api from "@/core/axios";
import type Car from "@/interface/model/car";
import type Client from "@/interface/model/client";
import type Engine from "@/interface/model/engine";
import type Message from "@/interface/model/message";
import type Order from "@/interface/model/order";
import type Photo from "@/interface/model/photo";
import type Service from "@/interface/model/service";
import type {AxiosResponse} from 'axios'
import type { UUID } from "crypto";

export default class ApiService{
    static async photo(file: File): Promise<AxiosResponse<Photo>> {
        var formData = new FormData();
        formData.append("photo", file);
        return $api.post<Photo>(`api/photo`,formData, {headers: {'Content-Type': 'multipart/form-data'}})
    }

    static async engine(): Promise<AxiosResponse<Engine[]>> {
        return $api.get<Engine[]>(`api/engine`)
    }

    static async client(id:UUID, include?:boolean): Promise<AxiosResponse<Client>> {
        return $api.get<Client>(`api/client/${id}`,{ params:{ include } })
    }

    static async client_update(edit:Client): Promise<AxiosResponse<Message>> {
        let body = this.remove_empty(edit)
        return $api.put<Message>(`api/client/${edit.id}`,body)
    }

    static async car_update(edit:Car): Promise<AxiosResponse<Message>> {
        let body = this.remove_empty(edit)
        return $api.put<Message>(`api/car/${edit.id}`,body)
    }

    static async car_add(edit:Car): Promise<AxiosResponse<Message>> {
        let body = this.remove_empty(edit)
        return $api.post<Message>(`api/car/`,body)
    }

    static remove_empty(obj:object):object{
        return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != ''&&v != undefined))
    }

    static async service(id:UUID, include?:boolean): Promise<AxiosResponse<Service>> {
        return $api.get<Service>(`api/service/${id}`,{ params:{ include } })
    }

    static async services(include?:boolean, pagination?:boolean, page?:number): Promise<AxiosResponse<Service[]>> {
        return $api.get<Service[]>(`api/service`,{ params:{ include, pagination, page } })
    }

    static async order(id:UUID, include?:boolean): Promise<AxiosResponse<Order>> {
        return $api.get<Order>(`api/order/${id}`,{ params:{ include } })
    }

    static async add_order(data:Order): Promise<AxiosResponse<Order>> {
        let body = this.remove_empty(data)
        return $api.post<Order>(`api/order/`, body)
    }

    static async order_delete(id:UUID): Promise<AxiosResponse<Message>> {
        return $api.delete<Message>(`api/order/${id}`)
    }

    static async orders(include?:boolean, pagination?:boolean, page?:number): Promise<AxiosResponse<Order[]>> {
        return $api.get<Order[]>(`api/order/client`,{ params:{ include, pagination, page } })
    }

    static async order_time(date:string): Promise<AxiosResponse<Order[]>> {
        return $api.get<Order[]>(`api/order/time/${date}`)
    }
}