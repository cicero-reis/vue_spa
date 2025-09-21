import api from '@/http/api'

const apiPath = import.meta.env.VITE_API_PATH

export const login = (credentials) => api.post(`${apiPath}/auth/login`, credentials)

export const logout = () => api.post(`${apiPath}/auth/logout`)

export const fmc = (token) => api.post(`${apiPath}/auth/fcm-token`, token)