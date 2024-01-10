import axios from "axios";
import store from '@/store'
import {VueAxios} from "@/utils/axios";
// import storage from 'store'
// import { ElNotification } from 'element-plus'
// import { VueAxios } from './axios'

const request = axios.create({
    baseURL: 'http://127.0.0.1:3456',
    timeout: 60000
})

request.interceptors.request.use(
    config =>{
        if (store.state.token){
            config.headers.Authorization = `token ${store.state.token}`
        }
        return config
    }
)

request.interceptors.response.use(
    response =>{
        return response
    },
    error => {
        if (error.response){
            switch (error.response.status){
                case 401:
                    store.dispatch('UserLogout').then(() => {
                        setTimeout(() => {
                            window.location.reload()
                        }, 1500)
                    })
            }
        }
        return Promise.reject(error.response)
    }
)

const installer = {
    vm: {},
    install (Vue) {
        Vue.use(VueAxios, request)
    }
}

export default request