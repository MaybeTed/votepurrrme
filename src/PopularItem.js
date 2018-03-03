import React from 'react';

class PopularItem extends React.Component {
	render() {
		return (
      <div className="popular-item-container">
        <div className="popular-item-info">
          <h3 className="popular-item-name">#{this.props.index + 1} {this.props.cat.name}</h3>
          <h5 className="popular-item-user">by {this.props.cat.user}</h5>
          <h5>Wins: {this.props.cat.wins}</h5>
          <h5>Chances: {this.props.cat.chances}</h5>
          <h5>Win Percentage: {this.props.cat.winPercentage}</h5>
        </div>
        <div className="popular-item-img-container">
          <img src={`https://res.cloudinary.com/dj2e9orvq/image/upload/${this.props.cat.image}`} />
        </div>
      </div>
		)
	}
}

export default PopularItem;
