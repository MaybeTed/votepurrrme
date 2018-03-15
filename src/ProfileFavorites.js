import React from 'react';
import { Link } from 'react-router-dom';

const ProfileFavorites = (props) => {
	return (
		<div className="folder">
		  <div className="favorite-container" >
		    {props.favorites.map((favorite, index) => {
		  	  return(
		  	    <div key={index}>
		  	      <Link to={`/cat/${favorite.id}`}>
		  	        <img src={`https://res.cloudinary.com/dj2e9orvq/image/upload/${favorite.url}`} />
		  	        <p>{favorite.name}</p>
		  	      </Link>
		  	    </div>
		  	  )
		    })}
		  </div>
		</div>
	)
}

export default ProfileFavorites;
