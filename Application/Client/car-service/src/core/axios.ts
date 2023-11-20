import axios from 'axios';
import { parseCookies } from 'nookies';
import Refresh from '@/action/auth/refresh'

const $axios = axios.create({
  baseURL: process.env.BASE_URL,
})

$axios.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const { accessToken } = parseCookies();
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config;
});

$axios.interceptors.response.use(
  (config) => config,
  async (error) => {
    const config = error.config;
    console.log(error.response)
    if(error.response.status == 401){
      const response = await Refresh(undefined);
      if(response == undefined){
        return $axios.request(config)
      }else{
        location.reload()
      }
    }
    return error
  }
)


export default $axios;
