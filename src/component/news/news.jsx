import React from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      loading: true,
      error: null,
      query: '',
    };
    this.apiKey = 'f73f1b11e8e74125943386e3b7775612'; 
    this.apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${this.apiKey}`;
  }

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async (query = '') => {
    let url = this.apiUrl;
    if (query) {
      url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${this.apiKey}`;
    }

    try {
      const response = await axios.get(url);
      this.setState({ news: response.data.articles, loading: false });
    } catch (error) {
      this.setState({ error: 'Failed to fetch news', loading: false });
    }
  };

  handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value; 
    this.setState({ query }, () => {
      this.fetchNews(this.state.query);
    });
  };

  handleReadMore = (url) => {
    window.open(url, '_blank'); 
  };

  render() {
    const { news, loading, error } = this.state;

    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
              <img
                src="https://www.koran.id/wp-content/uploads/2019/05/Logo-Koran.id-mobile-280x96-1.png"
                alt="Logo"
                width="200px"
              />
            <form className="d-flex" onSubmit={this.handleSearch} role="search" style={{ marginLeft: 'auto' }}>
              <input
                className="form-control me-2"
                type="search"
                name="search" 
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </nav>
        <div className="container mt-5">
          <h1 className="text-center mb-4">BERITA PALING ANYAR</h1>
          {loading && (
            <div className="text-center">
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Enteni Diluk...</p>
            </div>
          )}
          {error && <div>{error}</div>}
          <div className="row">
            {news.length === 0 && !loading && <p className="text-center">No news found</p>}
            {news.map((article) => (
              <div className="col-md-4 mb-4" key={article.url}>
                <div className="card h-100 shadow-sm">
                {article.urlToImage && ( 
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="card-img-top"
                  />
                )}
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article.description || 'No description available.'}</p>
                    <button 
                      onClick={() => this.handleReadMore(article.url)} 
                      className="btn btn-dark"
                      style={{ cursor: 'pointer' }} 
                    >
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <footer className="footer mt-auto py-3 bg-light">
          <div className="container">
            <span className="text-muted">© 2024 nabilhatami, GSK</span>
          </div>
        </footer>
      </div>
    );
  }
}
