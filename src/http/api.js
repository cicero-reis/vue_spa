import axios from "axios";
import { useAuthStore } from "@/stores/auth";

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

    (error) => {

        const store = useAuthStore();

        
        if (!error.response) {
            return Promise.reject({ auth: ["Oops! Something went wrong"] })
        }

        const { status, data } = error.response

        if (status === 401) {
            return Promise.reject({ auth: [error.response.data.error || "Unauthorized"] })
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