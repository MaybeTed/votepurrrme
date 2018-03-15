import React from 'react';
import { Link } from 'react-router-dom';

const Following = (props) => {
	return (
		<div>
		  <p>Following</p>
          {props.following.map((following, index) => {
            return (<Link to={`/profile/${following.following}`} key={index}><h5>{following.name}</h5></Link>)
          })}
		</div>
	)
}

export default Following;
