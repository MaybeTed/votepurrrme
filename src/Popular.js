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
          winPercentage: 60,
          image: '31_s3txnc.jpg'
        }, {
          name: 'Monorail Cat',
          user: 'bob', 
          wins: 91,
          chances: 125,
          winPercentage: 72,
          image: '20_vft97j.jpg'
        }, {
          name: 'Maru',
          user: 'alice', 
          wins: 76,
          chances: 141,
          winPercentage: 53,
          image: '7_n03l1n.jpg'
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
        <div className="popular-both-containers">
          <div className="most-popular-cat-container">
            <div className="most-popular-cat">
              <div>
                <h1>#1 {this.state.popularCats[0].name}</h1>
                <h5> by {this.state.popularCats[0].user}</h5>
                <h4>Wins: {this.state.popularCats[0].wins}</h4>
                <h4>Chances: {this.state.popularCats[0].chances}</h4>
                <h4>Win percentage: {this.state.popularCats[0].winPercentage}</h4>
                <img src="" />
              </div>
              <img src={`https://res.cloudinary.com/dj2e9orvq/image/upload/${this.state.popularCats[0].image}`} />
            </div>
          </div>
          <div className="popular-cats-container">
            {this.state.popularCats.map((cat, index) => {
              if (index === 0) {
                return null;
              } else {
                return <PopularItem key={index} cat={cat} index={index} />
              }
            })}
          </div>
        </div>
      </div>
  	)
  }
}

export default Popular;
