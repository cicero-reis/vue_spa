import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { login, logout } from '@/http/auth-api'
import registerFcmToken from "@/services/registerFcmToken";
import jwtDecode from "jwt-decode" 

export const useAuthStore = defineStore('authStore', () => {

    const token = ref(localStorage.getItem('token') || null)
    const user = ref(localStorage.getItem('token') ? jwtDecode(token.value) : [])
    const errors = ref([])

    const isLoggedIn = computed(() => !!token.value)

    const handleLogin = async (credentials) => {
        try {
            const result = await login(credentials)
            token.value = result.data.access_token
            localStorage.setItem('token', token.value)
            user.value = jwtDecode(token.value)
            // Registrar token FCM
            await registerFcmToken();
        } catch (error) {
            errors.value = error
        }
    }

    const handleLogout = async () => {
        try {
            const result = await logout()
            localStorage.removeItem('token')
            token.value = null
        } catch (error) {
            localStorage.removeItem('token')
            token.value = null
        }
    }

    return {
        handleLogin,
        handleLogout,
        isLoggedIn,
        token,
        user,
        errors
    }
})

