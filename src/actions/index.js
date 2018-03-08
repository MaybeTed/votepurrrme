import axios from 'axios';
import store from '../../store';

const Actions = {};

Actions.fetchUser = async () => {
	const request = await axios('/auth/verify');
  	store.dispatch({
	  type: 'FETCH_USER',
	  payload: request.data
    });
}

Actions.fetchCats = async () => {
	const request = await axios('/api/getCats');
	console.log('request.data: ', request.data)
	store.dispatch({
		type: 'FETCH_CATS',
		payload: request.data
	});
}

export default Actions;
