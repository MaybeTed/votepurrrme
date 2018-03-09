import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      searchResults: []
    }

    this.deleteSearchResults = this.deleteSearchResults.bind(this);
    this.displaySearchResults = this.displaySearchResults.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  deleteSearchResults() {
    document.getElementsByClassName('search-input')[0].value = '';
    this.setState({ searchResults: [] });
  }

  displaySearchResults(result, i) {
    let url = '';
    if (result.url) {
      // we know it's a cat
      url = `/cat/${result.id}`;
    } else {
      // we know it's a user
      url = `/profile/${result.id}`;
    }

    return <Link to={url} key={i} onClick={this.deleteSearchResults}><div className="search-result">{result.name}</div></Link>
  }

  handleSearch() {
    let query = document.getElementsByClassName('search-input')[0].value;
    axios.get(`/api/search?input=${query}`)
      .then((results) => {
        console.log('search results: ', results.data)
        let searchResults = [].concat(results.data.users, results.data.cats);
        this.setState({ searchResults });
      })
  }

	render() {
	  return (
        <div className="nav">
          <h3>Vote Purrr Me</h3>
          <ul className="nav-links">
            <li>
              <input className="search-input" placeholder="Search" />
              <div className={this.state.searchResults.length === 0 ? "search-results-container hide" : "search-results-container"}>
                {this.state.searchResults.map((item, i) => this.displaySearchResults(item, i))}
              </div>
              <button className="search-button" onClick={this.handleSearch} >
                <img className="search-icon" src="http://www.portablecoolers.com/mobile/images/search.png" />
              </button>
            </li>
            <Link to="/" className="link" onClick={this.props.whichPage}><li className={this.props.page === 'Vote' ? 'underline' : null}>Vote</li></Link>
            <Link to="/popular" className="link" onClick={this.props.whichPage}><li className={this.props.page === 'Popular' ? 'underline' : null}>Popular</li></Link>
            {this.props.auth ?
              <Link to={`/profile/${this.props.auth.id}`} className="link" onClick={this.props.whichPage}><li className={this.props.page === 'Profile' ? 'underline' : null}>Profile</li></Link>
            :
              null
            }
            {this.props.auth ?
              <li><a className="link" href="/logout">Log out</a></li>
            :
              <li><a className="link" href="/auth/google">Log in</a></li>
            }
          </ul>
        </div>
	  );
	}
}
export default withRouter(connect(mapStateToProps)(Nav));