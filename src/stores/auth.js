import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { login } from '@/http/auth-api'

export const useAuthStore = defineStore('authStore', () => {

    const token = ref(localStorage.getItem('token') || null)
    const user = ref(null)

    const isLoggedIn = computed(() => !!token.value)


    const handleLogin = async (credentials) => {
        const result = await login(credentials)
        const { access_token } = result.data
        token.value = access_token
        localStorage.setItem('token', access_token)
    }

    return {
        handleLogin,
        isLoggedIn
    }
})

