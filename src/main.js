
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
import Actions from './actions/index';

function mapStateToProps(state) {
	return {
		auth: state.auth
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
    }

	whichPage(event) {
      let destination;
      if (event.currentTarget) {
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
	<Provider store={store}>	
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>, 
    document.getElementById('mount')
	);
});

export default connect(mapStateToProps)(App);
