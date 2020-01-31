import { default as axios } from "axios";

const HOST = 'http://localhost:3001'

export default class API {
    static headers = {
        'Content-Type': 'application/json'
    }

    static login(email: string, password: string): Promise<any> {
        return new Promise((res, rej) => {
            axios.post(`${HOST}/api/auth/login`, { username: email, password }, { headers: API.headers })
                .then((response) => {
                    const { status, authenticate, data } = response.data;
                    if (status === 'success') {
                        localStorage.setItem('token', authenticate);
                        API.headers = Object.assign({}, API.headers, { 'Authorization': `Bearer ${authenticate}` })
                        res(data)
                    }
                })
                .catch(error => console.log('error', error))
        })
    }

    static loginToken(): Promise<any> {
        return new Promise((res, rej) => {
            const token = localStorage.getItem('token');
            if (!token) return rej();
            API.headers = Object.assign({}, API.headers, { 'Authorization': `Bearer ${token}` })

            axios.post(`${HOST}/api/auth/login-jwt`, {}, { headers: API.headers })
                .then((response) => {
                    const { status, authenticate, data } = response.data;
                    if (status === 'success') {
                        localStorage.setItem('token', authenticate);
                        API.headers = Object.assign({}, API.headers, { 'Authorization': `Bearer ${authenticate}` })
                        res(data)
                    }
                })
                .catch(error => rej(error))
        })
    }

    static register(email: string, password: string) {
        return axios.post(`${HOST}/api/account`, { email, password }, { headers: API.headers })
    }

    static logout() {
        return axios.post(`${HOST}/api/auth/logout`)
    }

    static getAccount() {
        return axios.get(`${HOST}/api/account`, { headers: API.headers })
    }
}