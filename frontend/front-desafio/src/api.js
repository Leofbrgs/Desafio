import axios from 'axios';

const api = axios.create({
    baseURL: "https://api.github.com/users/{username}"
})

export default api;