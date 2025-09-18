import { createApp } from 'vue'
import { createPinia } from 'pinia'
import routes from './router'
import App from './App.vue'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(routes)

app.mount('#app')
