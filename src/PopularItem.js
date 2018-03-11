import React from 'react';
import { Link } from 'react-router-dom';

class PopularItem extends React.Component {
	render() {
    const { name, url, wins, chances } = this.props.cat;
		return (
      <Link to={`/cat/${this.props.cat.id}`} ><div className="popular-item-container">
        <div className="popular-item-info">
          <h3 className="popular-item-name">#{this.props.index + 1} {name}</h3>
          <h5>Wins: {wins}</h5>
          <h5>Chances: {chances}</h5>
          <h5>Win Percentage: {(wins/chances*100).toFixed(0) + '%'}</h5>
        </div>
        <div className="popular-item-img-container">
          <img src={`https://res.cloudinary.com/dj2e9orvq/image/upload/${url}`} />
        </div>
      </div></Link>
		)
	}
}

export default PopularItem;
