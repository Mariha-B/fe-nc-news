import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://nc-news-gnke.onrender.com/api'
})

export const fetchData =  (endpoint) => {
    return newsApi.get(endpoint)
    .then((response) => {
        return response.data
    })
}