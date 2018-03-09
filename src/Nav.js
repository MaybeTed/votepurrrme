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

    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    let query = document.getElementsByClassName('search-input')[0].value);
    axios.get(`/api/search?query=${query}`)
      .then((results) => console.log('search results: ', results))
  }

	render() {
	  return (
        <div className="nav">
          <h3>Vote Purrr Me</h3>
          <ul className="nav-links">
            <li>
              <input className="search-input" placeholder="Search" />
              <button className="search-button" onClick={this.handleSearch} >
                <img className="search-icon" src="http://www.portablecoolers.com/mobile/images/search.png" />
              </button>
            </li>
            <li className={this.props.page === 'Vote' ? 'underline' : null}><Link to="/" onClick={this.props.whichPage}>Vote</Link></li>
            <li className={this.props.page === 'Popular' ? 'underline' : null}><Link to="/popular" onClick={this.props.whichPage}>Popular</Link></li>
            {this.props.auth ?
              <li className={this.props.page === 'Profile' ? 'underline' : null}><Link to="/profile" onClick={this.props.whichPage}>Profile</Link></li>
            :
              null
            }
            {this.props.auth ?
              <li><a href="/logout">Log out</a></li>
            :
              <li><a href="/auth/google">Log in</a></li>
            }
          </ul>
        </div>
	  );
	}
}
export default withRouter(connect(mapStateToProps)(Nav));