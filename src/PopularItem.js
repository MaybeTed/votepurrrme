import React from 'react';

class PopularItem extends React.Component {
	constructor() {
		super();
		this.state = {

		}
	}

	render() {
		return (
      <div className="popular-item-container">
        <h3>#{this.props.index + 1} {this.props.cat.name}</h3>
        <h5>Wins: {this.props.cat.wins}</h5>
        <h5>Chances: {this.props.cat.chances}</h5>
        <h5>Win Percentage: {this.props.cat.winPercentage}</h5>
      </div>
		)
	}
}

export default PopularItem;
