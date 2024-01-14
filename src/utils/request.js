import axios from "axios";
import router from "@/router";
import {ElMessage} from "element-plus";


const request = axios.create({
    baseURL: 'http://121.36.55.63:3456',
    timeout: 60000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

request.interceptors.request.use(
    config => {
        if(localStorage.token){
            config.headers.Authorization=localStorage.getItem("token")
        }
        console.log(config)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    res=>{
        if(res.data.code===2000){
            ElMessage({
                message:"登录过期，请重新登录",
                type:"error"
            })
            localStorage.removeItem("token")
            router.push("/login")
            return res
        }
        return res
    },
    error => {
        if(error.response.status===401){
            ElMessage({
                message:"登录过期，请重新登录",
                type:"error"
            })
            localStorage.removeItem("token")
            router.push('/login')
        }
    }
)

export default request