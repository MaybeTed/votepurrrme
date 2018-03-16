
import React from 'react';
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import promise from 'redux-promise';
import logger from 'redux-logger';
import axios from 'axios';
import store from '../store';
import reducer from './reducers';
import Nav from './Nav';
import Vote from './Vote';
import Profile from './Profile';
import Popular from './Popular';
import Cat from './Cat';
import Actions from './actions/index';

function mapStateToProps(state) {
	return {
		auth: state.auth,
		cats: state.cats
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
          page: 'Vote'
		}
		this.whichPage = this.whichPage.bind(this);
	}

    componentDidMount() {
    	Actions.fetchUser();
    	Actions.fetchCats();
    }

	whichPage(event) {
	  console.log('whichPage event: ', event)
      let destination;
      if (event.currentTarget) {
      	console.log('event.currentTarget.textContent: ', event.currentTarget.textContent)
      	destination = event.currentTarget.textContent;
      } else {
    	destination = event;
      }
      this.setState({ page: destination }); 
	}

	render() {
		return (
			<div>
			  <Nav page={this.state.page} whichPage={this.whichPage} />
				<Switch className="route-wrapper">
		          <Route exact={true} path="/" render={(props) => (<Vote {...props} />)} />
		          <Route path="/profile/:id" render={(props) => (<Profile {...props} whichPage={this.whichPage} />)} />
		          <Route path="/cat/:id" render={(props) => (<Cat {...props} whichPage={this.whichPage} />)} />
		          <Route path="/popular" render={(props) => (<Popular {...props} whichPage={this.whichPage} />)} />
		        </Switch>
		      </div>
		)
	}
}


document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(
	<Provider store={store}>	
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>, 
    document.getElementById('mount')
	);
});

export default connect(mapStateToProps, { Actions })(App);
