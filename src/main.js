
import React from 'react';
import ReactDOM from 'react-dom';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Vote from './Vote';
import Profile from './Profile';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
      page: 'Vote'
		}
		this.whichPage = this.whichPage.bind(this);
	}

	// isHomepage(event) {
 //    let destination = event.currentTarget.textContent;
 //    this.setState({ page: destination })
	// }

	whichPage(event) {
    let destination = event.currentTarget.textContent;
    console.log('destination: ', destination)
    this.setState({ page: destination }, () => console.log('this.state.page: ', this.state.page))
	}

	render() {
		return (
			<div>
			  <Nav page={this.state.page} whichPage={this.whichPage} />
				<Switch className="route-wrapper">
          <Route exact={true} path="/" render={() => (<Vote />)} />
          <Route path="/profile" render={(props) => (<Profile />)} />
        </Switch>
      </div>
		)
	}
}

document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>, 
    document.getElementById('mount')
	);
});