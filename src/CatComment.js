import React from 'react';
import { Link } from 'react-router-dom';

class CatComment extends React.Component {
	constructor(props) {
		super(props);
		console.log('CatComment constructor')
	}

	render() {
		console.log('render running')
		const { created_at, name, message, user_id } = this.props.comment;
		return (
			<div className="cat-comment">
			  <p>{created_at}</p>
			  <p className="indent"><Link to={`/profile/${user_id}`} ><span className="username">{name}</span></Link> says</p>
			  <p>{message}</p>

			</div>
		)
	}
}

export default CatComment;
