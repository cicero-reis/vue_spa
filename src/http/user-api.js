import api from '@/http/api'

const apiPath = import.meta.env.VITE_API_PATH
const apiPathLangChain = import.meta.env.VITE_API_PATH_LANGCHAIN

export const fmc = (id, token) => api.post(`${apiPath}/users/fcm-token/${id}`, token)

export const taskSummary = (id) => api.get(`${apiPath}/users/tasksummary/${id}`)

export const feedback = (userTasks) => api.post(`${apiPathLangChain}/api/feedback`, userTasks)
