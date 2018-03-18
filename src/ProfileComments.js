import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function mapStateToProps(state) {
	return {
		auth: state.auth
	}
}

class ProfileComments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
		this.changeTime = this.changeTime.bind(this);
	}

	changeTime(str) {
	  const months = {
	    '01': 'January',
	    '02': 'February', 
	    '03': 'March',
	    '04': 'April',
	    '05': 'May',
	    '06': 'June',
	    '07': 'July',
	    '08': 'August',
	    '09': 'September',
	    '10': 'October',
	    '11': 'November',
	    '12': 'December'
	  }
	  let time = str.split('-');
	  let [ year, month, day ] = time;
	  day = day.split('T')[0];
	  return months[month] + ' ' + day + ', ' + year;
	}

	render() {
		return (
			<div className="folder">
			  {this.props.comments.map((comment, index) => {
			  	return (
			  	<div className="profile-comment-container">
			  	<Link to={`/cat/${comment.cat_id}`}>
			    <div className="mycomments-container" key={index}>
			      <section className="profile-comment-info">
			        <p>{this.changeTime(comment.created_at)}</p>
			        <p className="profile-comment-message">{comment.message}</p>
			      </section>
			      <section className="profile-cat-img">
			        <img src={`https://res.cloudinary.com/dj2e9orvq/image/upload/${comment.url}`} />
			      </section>
			    </div>
			    </Link>
			    {this.props.auth && this.props.auth.id === comment.user_id ? 
			    <p onClick={() => this.props.deleteComment(comment.id)} className="delete-comment-button">X</p>
			    : null }
			    </div>
			    )
			  })}
			</div>
		)
	}
}

export default connect(mapStateToProps)(ProfileComments);
