import React from 'react';
import { connect } from 'react-redux';
import PopularItem from './PopularItem';
import Actions from './actions';

function mapStateToProps(state) {
  return {
    cats: state.cats
  }
}

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
    Actions.fetchCats('rank');
  }

  render() {
    if (!this.props.cats.length) {
      return <div>Loading...</div>
    }
    const { name, url, wins, chances } = this.props.cats[0];
  	return (
      <div>
        <h1 className="popular-title">Most popular cats</h1>
        <div className="popular-both-containers">
          <div className="most-popular-cat-container">
            <div className="most-popular-cat">
              <div className="most-popular-cat-info">
                <h1>#1 {name}</h1>
                <h4>Wins: {wins}</h4>
                <h4>Chances: {chances}</h4>
                <h4>Win percentage: {(wins/chances*100).toFixed(0) + '%'}</h4>
                <img className="trophy" src="https://gallery.yopriceville.com/var/resizes/Free-Clipart-Pictures/Trophy-and-Medals-PNG/Gold_Cup_Trophy_PNG_Clipart_Image.png?m=1507172109" />
              </div>
              <img className="num1-cat-img" src={`https://res.cloudinary.com/dj2e9orvq/image/upload/${url}`} />
            </div>
          </div>
          <div className="popular-cats-container">
            {this.props.cats.map((cat, index) => {
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

export default connect(mapStateToProps)(Popular);
