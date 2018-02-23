import React from 'react';

class Nav extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {

	  };
	}

	componentWillReceiveProps() {
		console.log(this.props.page)
	}

	render() {
		{console.log('this.props.page: ', this.props.page)}
	  return (
        <div className="nav">
          <h3>Vote Purrr Me</h3>
          <ul className="nav-links">
            <li onClick={this.props.changeRoute} className={this.props.page === 'Vote' ? 'underline' : null}>Vote</li>
            <li>Popular</li>
            <li onClick={this.props.changeRoute} className={this.props.page === 'Profile' ? 'underline' : null}>Profile</li>
            <li>Log in</li>
          </ul>
        </div>
	  );
	}
}
export default Nav;