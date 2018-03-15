import React from 'react';
import { Link } from 'react-router-dom';

const Followers = (props) => {
	return (
		<div>
		  <p>Followers</p>
          {props.followers.map((follower, index) => {
            return (<Link to={`/profile/${follower.follower}`} key={index}><h5>{follower.name}</h5></Link>)
          })}
		</div>
	)
}

export default Followers;
