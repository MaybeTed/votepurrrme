
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
        current: [],
        cat1Fav: false,
        cat2Fav: false
	  }
	  this.getNewCats = this.getNewCats.bind(this);
      this.addToFavorites = this.addToFavorites.bind(this);
      this.removeFavorite = this.removeFavorite.bind(this);
	}

	componentDidMount() {
      this.getNewCats();
	}

    addToFavorites(cat) {
        axios.post('/api/addFavorite', {
            user: this.props.auth.id,
            cat: this.state.current[cat].id
        }).then(() => {
            if (cat === 0) {
                this.setState({ cat1Fav: true });
            } else {
                this.setState({ cat2Fav: true });
            }
        })
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
        let cat1 = false;
        let cat2 = false;
	    const index = Math.floor(Math.random() * this.props.cats.length);
        let pictures = this.props.cats.slice();
        const pic1 = pictures.splice(index, 1);
        const index2 = Math.floor(Math.random() * pictures.length);
        const pic2 = pictures.splice(index2, 1);
        console.log('pic1: ', pic1)
        if (this.props.auth) {
            axios.get(`/api/checkFavorites?userid=${this.props.auth.id}&cat1id=${pic1[0].id}&cat2id=${pic2[0].id}`)
              .then((response) => {
                console.log('response yo: ', response.data)
                if (response.data.cat1.length > 0) {
                    console.log('cat1 if running')
                    cat1 = true;
                }
                if (response.data.cat2.length > 0) {
                    console.log('cat2 if running')
                    cat2 = true;
                }
                this.setState({
                    current: [pic1[0], pic2[0]],
                    cat1Fav: cat1,
                    cat2Fav: cat2
                })
              })
        } else {
          this.setState({
            current: [pic1[0], pic2[0]],
          })
        }
      }
	}

    removeFavorite(cat) {
        axios.post('/api/removeFavorite', {
            user: this.props.auth.id,
            cat: this.state.current[cat].id
        }).then(() => {
            if (cat === 0) {
                this.setState({ cat1Fav: false });
            } else {
                this.setState({ cat2Fav: false });
            }
        })
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
                  {this.props.auth ?
                  <div className="add-to-favorites">
                    {this.state.cat1Fav ?
                        <img
                          src="http://clipart-library.com/images/gTe5anbEc.png"
                          onClick={() => this.removeFavorite(0)}
                        />
                        :
                        <img 
                          src="https://freeiconshop.com/wp-content/uploads/edd/heart-outline.png"
                          onClick={() => this.addToFavorites(0)}
                        />
                    }
                    {this.state.cat2Fav ?
                        <img
                          src="http://clipart-library.com/images/gTe5anbEc.png"
                          onClick={() => this.removeFavorite(1)}
                        />
                        :                        
                        <img
                          src="https://freeiconshop.com/wp-content/uploads/edd/heart-outline.png"
                          onClick={() => this.addToFavorites(1)}
                        />
                    }
                  </div>
                  :
                  null
                  }	        
    	      </div>
            </div>
		)
	}
}

export default connect(mapStateToProps)(Vote);
