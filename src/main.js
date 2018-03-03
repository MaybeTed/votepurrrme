
import React from 'react';
import ReactDOM from 'react-dom';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import Vote from './Vote';
import Profile from './Profile';
import Popular from './Popular';

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
      let destination;
      if (event.currentTarget) {
      	destination = event.currentTarget.textContent;
      } else {
    	destination = event;
      }
      this.setState({ page: destination }, () => console.log('page: ', this.state.page)); 
	}

	render() {
		return (
			<div>
			  <Nav page={this.state.page} whichPage={this.whichPage} />
				<Switch className="route-wrapper">
		          <Route exact={true} path="/" render={() => (<Vote />)} />
		          <Route path="/profile" render={(props) => (<Profile whichPage={this.whichPage} />)} />
		          <Route path="/popular" render={(props) => (<Popular whichPage={this.whichPage} />)} />
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