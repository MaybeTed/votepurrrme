
import React from 'react';
import ReactDOM from 'react-dom';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import Nav from './Nav';
import Vote from './Vote';
import Profile from './Profile';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
      page: 'Vote'
		}
		this.changeRoute = this.changeRoute.bind(this);
	}

	componentDidMount() {

	}

	changeRoute(event) {
		let destination = event.currentTarget.textContent;
		console.log('destination: ', destination)
    this.setState({ page: destination });
	}

	router() {
		if (this.state.page === 'Vote') {
			return <Vote page={this.state.page} />
		} else if (this.state.page === 'Profile') {
			return <Profile page={this.state.page} />
		}
	}

	render() {
		return (
			<div>
				<Nav changeRoute={this.changeRoute} page={this.props.page} />
				{this.router()}
      </div>
		)
	}
}

document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(
    React.createElement(App),
    document.getElementById('mount')
	);
});