import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

class Nav extends React.Component {
	render() {
	  return (
        <div className="nav">
          <h3>Vote Purrr Me</h3>
          <ul className="nav-links">
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