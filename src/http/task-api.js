import api from '@/http/api'

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath + '/tasks'

export const listTasks = (page) => api.get(`${resource}?page=${page}`)

export const findTask = (id) => api.get(`${resource}/${id}`)

export const createTask = (task) => api.post(`${resource}`, task)

export const updateTask = (id, task) => api.put(`${resource}/${id}`, task)

export const updateIsCompleteTask = (id, task) => api.patch(`${resource}/iscompleted/${id}`, task)

export const updateUserIdTask = (id, task) => api.patch(`${resource}/userid/${id}`, task)

export const deleteTask = (id) => api.delete(`${resource}/${id}`)