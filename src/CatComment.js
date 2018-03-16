import React from 'react';
import { Link } from 'react-router-dom';

class CatComment extends React.Component {
	constructor(props) {
		super(props);
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
		const { created_at, name, message, user_id } = this.props.comment;
		return (
			<div className="cat-comment">
			  <p>{this.changeTime(created_at)}</p>
			  <p className="indent"><Link to={`/profile/${user_id}`} ><span className="username">{name}</span></Link> says</p>
			  <p>{message}</p>

			</div>
		)
	}
}

export default CatComment;
