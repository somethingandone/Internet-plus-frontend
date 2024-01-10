import request from '@/utils/request'

const userApi = {
    Login: '/user/sign_in',
    Register: '/user/register'
}

export function login (parameter) {
    return request({
        url: userApi.Login,
        method: 'post',
        data: parameter
    })
}

export function register(data) {
    return request({
        url: userApi.Register,
        method: 'post',
        data: data
    })
}