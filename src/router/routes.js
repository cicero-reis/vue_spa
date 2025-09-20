import HomePage from "@/pages/HomePage.vue"
import TasksPage from "@/pages/TasksPage.vue"
import LoginPage from "@/pages/LoginPage.vue"
import RegisterPage from "@/pages/RegisterPage.vue"
import UsersPage from "@/pages/UsersPage.vue"
import NotFoundErrorPage from "@/pages/errors/NotFoundErrorPage.vue"

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/tasks',
        name: 'tasks',
        component: TasksPage,
        meta: {
            auth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage,
        meta: {
            auth: true
        }
    },
    {
        path: '/users',
        name: 'users',
        component: UsersPage,
        meta: {
            auth: true
        }
    },
    {
        path: "/:notFound(.*)",
        name: 'error.404',
        component: NotFoundErrorPage,
    }
]

export default routes