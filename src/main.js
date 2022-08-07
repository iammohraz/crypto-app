import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import axios from 'axios'

const axios_ins = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/'
})

export {axios_ins}

createApp(App).use(router).mount('#app')
