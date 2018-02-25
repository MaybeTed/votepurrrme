import React from 'react';
import PopularItem from './PopularItem';

class Popular extends React.Component {
  constructor() {
  	super();
  	this.state = {
      popularCats: [
        {
          name: 'fat cat',
          user: 'edward', 
          wins: 117,
          chances: 192,
          winPercentage: 60
        }, {
          name: 'Monorail Cat',
          user: 'bob', 
          wins: 91,
          chances: 125,
          winPercentage: 72
        }, {
          name: 'Maru',
          user: 'alice', 
          wins: 76,
          chances: 141,
          winPercentage: 53
        }
      ]
  	}
  }

  componentDidMount() {
  	this.props.whichPage('Popular');
  }

  render() {
  	return (
      <div>
        <h1>Most popular cats</h1>
        <div>
          {this.state.popularCats.map((cat, index) => <PopularItem key={index} cat={cat} index={index} />)}
        </div>
      </div>
  	)
  }
}

export default Popular;
