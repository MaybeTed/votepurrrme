import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {

	  };
	}

	componentWillReceiveProps() {
		console.log('componentWillReceiveProps: ', this.props.page)
	}

	render() {
		{console.log('this.props.page: ', this.props.page)}
	  return (
        <div className="nav">
          <h3>Vote Purrr Me</h3>
          <ul className="nav-links">
            <li className={this.props.page === 'Vote' ? 'underline' : null}><Link to="/" onClick={this.props.whichPage}>Vote</Link></li>
            <li>Popular</li>
            <li className={this.props.page === 'Profile' ? 'underline' : null}><Link to="/profile" onClick={this.props.whichPage}>Profile</Link></li>
            <li>Log in</li>
          </ul>
        </div>
	  );
	}
}
export default Nav;