import axios from 'axios';

export default {
  // Gets all articles from NY Times
  getArticles: function(params) {
    return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json`, params);
  },
  // Gets the article with the given id
  loadArticles: function() {
    return axios.get("/api/articles/");
  },
  // Deletes the articles with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a articles to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};