
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { connect } from 'react-redux';
import Nav from './Nav';

function mapStateToProps(state) {
    return {
        auth: state.auth,
        cats: state.cats
    }
}

class Vote extends React.Component {
	constructor() {
	  super();
	  this.state = {
        current: []
	  }
	  this.getNewCats = this.getNewCats.bind(this);
	}

	componentDidMount() {
      this.getNewCats();
	}

	getNewCats(winner, loser) {
      if (winner) {
        // send winner and loser to database
        console.log('winner: ', winner);
        console.log('loser: ', loser);
        axios.post('/api/vote', {
            winner,
            loser
        })
      }
      if (this.props.cats.length) {
	    const index = Math.floor(Math.random() * this.props.cats.length);
        let pictures = this.props.cats.slice();
        const pic1 = pictures.splice(index, 1);
        const index2 = Math.floor(Math.random() * pictures.length);
        const pic2 = pictures.splice(index2, 1);
        this.setState({ current: [pic1[0], pic2[0]] });
      }
	}

	render() {
        // if props haven't arrived yet, briefly show loading...
        if (!this.props.cats.length) {
            return <div>Loading...</div>
        }
        // after props arrive, let getNewCats() setState of current photos
        if (!this.state.current.length) {
            this.getNewCats();
            return <div>Loading...</div>
        }
		return (
			<div>
    	      <div className="main-page">
    	        <h3 className="title">Click your favorite cat</h3>
                  <div className="competition-cat">
                    <img src={`https://res.cloudinary.com/dj2e9orvq/image/upload/${this.state.current[0].url}`} onClick={this.getNewCats.bind(null, this.state.current[0], this.state.current[1])} />
                    <img src={`https://res.cloudinary.com/dj2e9orvq/image/upload/${this.state.current[1].url}`} onClick={this.getNewCats.bind(null, this.state.current[1], this.state.current[0])} />
                  </div> 		        
    	      </div>
            </div>
		)
	}
}

export default connect(mapStateToProps)(Vote);
