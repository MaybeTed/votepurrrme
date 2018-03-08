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

Actions.fetchCats = async (query) => {
	const request = await axios(`/api/getCats?rank=${query}`);
	store.dispatch({
		type: 'FETCH_CATS',
		payload: request.data
	});
}

export default Actions;
