import storage from 'store'
import { login } from "@/api/login";

const user = {
    state: {
        token: window.sessionStorage.getItem('token'),
        username: ''
    },
    mutations: {
        LOGIN: (state, data) =>{
            state.token = data
            window.sessionStorage.setItem('token', data)
        },
        LOGOUT: (state) =>{
            state.token = null
            window.sessionStorage.removeItem('token')
        },
        USERNAME: (state, data) =>{
            state.username = data
            window.sessionStorage.setItem('username', data)
        }

    },
    actions: {
        Login ({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo).then(response => {
                    const result = response.data
                    console.log('result', result)
                    storage.set(result.token, 7 * 24 * 60 * 60 * 1000)
                    commit('LOGIN', result.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        UserLogout({ commit }){
            console.log('.................')
            commit('LOGOUT');
        },
        UserName({ commit }, data){
            commit('USERNAME', data);
        }
    }
}

export default user
