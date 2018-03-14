import React from 'react';

class CatComment extends React.Component {
	constructor(props) {
		super(props);
		console.log('CatComment constructor')
	}

	render() {
		console.log('render running')
		const { created_at, name, message } = this.props.comment;
		return (
			<div className="cat-comment">
			  <p>{created_at}</p>
			  <p className="indent"><span className="username">{name}</span> says</p>
			  <p>{message}</p>

			</div>
		)
	}
}

export default CatComment;
