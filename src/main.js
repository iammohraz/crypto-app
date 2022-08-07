import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/'
})

export default {axios}

createApp(App).use(router).mount('#app')
