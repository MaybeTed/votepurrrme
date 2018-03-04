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

export default Actions;
