

export default function(state = [], action) {
	if (action.type === 'FETCH_CATS') {
		return action.payload;
	}
	return state;
}