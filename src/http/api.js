import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { refresh } from '@/http/auth-api'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: false
})

api.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem('token')

        if (token) {
            request.headers.Authorization = `Bearer ${token}`
        }

        return request
    },
    (error) => {
        Promise.reject(error)
    }
)

api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const store = useAuthStore();
        const originalRequest = error.config
        
        if (!error.response) {
            return Promise.reject({ auth: ["Oops! Something went wrong"] })
        }

        const { status, data } = error.response

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const refreshToken = await refresh()

                const newToken = refreshToken.data.access_token

                localStorage.setItem('token', newToken)

                store.token = newToken

                originalRequest.headers.Authorization = `Bearer ${newToken}`

                return api(originalRequest)

            } catch (refreshError) {
                
                store.handleLogout()
                
                return Promise.reject(refreshError)
            }
        }

        if (status === 403) {
            return Promise.reject({ auth: [error.response.data.error || "No permission"] })
        }

        if (status === 422) {
            const validationErrors = error.response.data.errors
            return Promise.reject(validationErrors)
        }

        if (status === 500) {
            return Promise.reject({ auth: [error.response.data.error || "Oops! Something went wrong"] })
        }

        return Promise.reject(error)
    }
)

export default api