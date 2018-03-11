import React from 'react';

class CatComment extends React.Component {
	render() {
		return (
			<div className="cat-comment">
			  <p>Jan 1st 10:22PM</p>
			  <p className="indent"><span className="username">Bob</span> says</p>
			  <p>Why is that cat so weird looking?!?! Is that even a cat? Looks more like a monorail</p>

			</div>
		)
	}
}

export default CatComment;
