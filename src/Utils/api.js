import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://nc-news-gnke.onrender.com/api'
})

export const fetchData =  (endpoint, topic, sortBy, order) => {
    return newsApi.get(endpoint, {params:{topic: topic, sort_by: sortBy, order: order}})
    .then((response) => {
        return response.data
    })
}

export const fetchCommentsOnArticle =  (articleId) => {
    return newsApi.get(`/articles/${articleId}/comments`)
    .then((response) => {
        return response.data
    })
}

export const patchArticle =  (articleId, patchBody) => {
    
    return newsApi.patch(`/articles/${articleId}`,patchBody)
    .then((response) => {
        return response.data.article
    })
}

export const postComment =  (article_id, patchBody) => {
    
    return newsApi.post(`/articles/${article_id}/comments`,patchBody)
    .then((response) => {
        return response.data.comment
    })
}

export const deleteComment = (comment_id) => {
    return newsApi.delete(`/comments/${comment_id}`)
    .then((response) => {
        return response.data
    })
}
