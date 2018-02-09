import React, { Component } from "react";
import DeleteBtn from "./DeleteBtn";
// import Jumbotron from "../../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import apiKey from '../utils/apikey.js'
// import { Col, Row, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    savedArticles: [],
    topic: "",
    startYear: "",
    endYear: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.loadArticles()
      .then(res => {
        console.log(res)
        this.setState({savedArticles: res.data})
      })
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  saveArticle = body => {
    API.saveArticle(body)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic) {
      API.getArticles({
      params: {
        'api-key': apiKey,
        q: this.state.topic,
        begin_date: this.state.startYear,
        end_date: this.state.endYear
        }
      })
      .then(res => {
        console.log(res.data.response.docs)
        this.setState({ articles: res.data.response.docs, topic: "", startYear: "", endYear: "" })
      }
      )
      .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
      <div className='jumbotron'>
        <h1>NY Times Article Scrubber</h1>
        <h2>Search for and annotate articles of interest!</h2>
        </div>
      <div className = 'container'>
        <div className= 'row'>
          <div className="col-md-12">
            
            <form>
              <div className='form-group'>
                <label htmlFor="topic">Topic</label>
                <input className='form-control'
                  value={this.state.topic}
                  onChange={this.handleInputChange}
                  name="topic"
                  placeholder="Title (required)"
                />
                <label htmlFor="startYear">Start Year</label>
                <input className='form-control'
                  type='date'
                  value={this.state.startYear}
                  onChange={this.handleInputChange}
                  name="startYear"
                  placeholder="Start Year"
                />
                <label htmlFor="endYear">End Year</label>
                <input className='form-control'
                  type="date"
                  value={this.state.endYear}
                  onChange={this.handleInputChange}
                  name="endYear"
                  placeholder="End Year"
                />
                <button
                  className="btn btn-success"
                  disabled={!(this.state.topic)}
                  onClick={this.handleFormSubmit}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-12 articles">
          <div className="list-overflow-container">
              <h1>Results</h1>
            {this.state.articles.length ? (
              <ul className="list-group">
                {this.state.articles.map((article, index) => (
                  (index < 5) ? (
                    <li key={article._id}>
                      <a href={article.web_url} target="_blank">
                        <strong>
                          {article.headline.main}
                        </strong>
                      </a>
                      <span className="results">
                      <button className="btn btn-primary"
                        onClick={() => this.saveArticle({
                          title: article.headline.main,
                          url: article.web_url,
                          date: article.pub_date
                        })}>Save</button></span>
                      <p>{article.pub_date.slice(0, 10)}</p>
                    </li>
                    ) : ('')
                ))}
              </ul>
            ) : (
              <h3>No Results to Display</h3>
            )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-12 articles">
                <h1>My Saved Articles</h1>
            {this.state.savedArticles.length ? (
              <ul className="list-group">
                {this.state.savedArticles.map((savedArticle, index) => (
                    <li key={savedArticle._id}>
                      <a href={savedArticle.url} target="_blank">
                        <strong>
                          {savedArticle.title}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteArticle(savedArticle._id)} />
                      <p>{savedArticle.date.slice(0, 10)}</p>
                    </li>
                ))}
              </ul>
            ) : (
              <h3>No Results to Display</h3>
            )}

          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Articles;
