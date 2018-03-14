import React from 'react';

class ProfileComments extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('this.props.comments: ', this.props.comments)
		return (
			<div className="folder">
			  {this.props.comments.map((comment, index) => {
			  	return (
			    <div className="mycomments-container" key={index} >
			      <section className="profile-comment-info">
			        <p>{comment.created_at}</p>
			        <p>{comment.message}</p>
			      </section>
			      <section className="profile-cat-img">
			        <img src={`https://res.cloudinary.com/dj2e9orvq/image/upload/${comment.url}`} />
			      </section>
			    </div>
			    )
			  })}
			</div>
		)
	}
}

export default ProfileComments;
