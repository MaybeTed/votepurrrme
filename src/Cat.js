import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import CatComment from './CatComment';

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

class Cat extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      cat: {
      	id: 10,
      	name: 'Sample Cat', 
      	url: 'http://www.gyanone.com/wp-content/uploads/2014/06/MBAsampleessays.jpg',
      	wins: 0,
      	chances: 0
      }, 
      comments: [],
      isFavorite: false,
      likes: []
  	}
    this.addFavorite = this.addFavorite.bind(this);
    this.getCat = this.getCat.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.showFavoriteIcon = this.showFavoriteIcon.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  componentDidMount() {
    this.props.whichPage('Cat');
    this.getCat();
  }

  componentDidUpdate() {
    if (this.state.cat.id !== +this.props.match.params.id) {
      this.getCat();
    }
  }

  addFavorite() {
    axios.post('/api/addFavorite', {
        user: this.props.auth.id,
        cat: this.state.cat.id
    }).then((favorite) => {
        // this.setState({ isFavorite: favorite.data.favorite })
        this.getCat();
    })
  }

  getCat() {
    let loggedin = false;
    if (this.props.auth) {
      loggedin = this.props.auth.id;
    }
    axios.get(`/api/getcat?id=${this.props.match.params.id}&user=${loggedin}`)
      .then((cat) => {
        console.log('data response: ', cat)
        let isFavorite = cat.data.favorite && cat.data.favorite.length > 0 ? cat.data.favorite: false;
        this.setState({ cat: cat.data.cat, comments: cat.data.comments, isFavorite, likes: cat.data.likes })
      })
      .catch((err) => console.log('error: ', err))
  }

  removeFavorite() {
    axios.post('/api/removeFavorite', {
        user: this.props.auth.id,
        cat: this.state.cat.id
    }).then(() => {
        // this.setState({ isFavorite: false })
        this.getCat();
    })
  }

  submitComment() {
    if (this.props.auth) {
      let message = document.getElementById('comment').value;
      let userid = this.props.auth.id;
      let catid = this.state.cat.id;
      axios.post('/api/addComment', { message, userid, catid })
        .then(() => this.getCat())
        .catch(() => console.log('error sending message to server'));
      document.getElementById('comment').value = '';
    } else {
      alert('Please log in if you would like to comment');
    }
  }

  showFavoriteIcon() {
    if (this.state.isFavorite && this.state.isFavorite.length > 0 && this.state.isFavorite[0].cat_id === this.state.cat.id) {
      return (
        <div className="likes-container">
          <img className="pointer" onClick={this.removeFavorite} src="http://clipart-library.com/images/gTe5anbEc.png" />
          <p>{this.state.likes.length}</p>
        </div>
      )
    } else {
      return (
        <div className="likes-container">
          <img className="pointer" onClick={this.addFavorite} src="https://freeiconshop.com/wp-content/uploads/edd/heart-outline.png" />
          <p>{this.state.likes.length}</p>
        </div>
      )
    }
  }
	
  render() {
  	const { cat } = this.state;
	  return (
	    <div className="cat-page">
        <section className="cat-left-container">
	        <div className="cat-info">
            {this.props.auth ?
              this.showFavoriteIcon()
              :
              null
            }
		        <h2>{cat.name}</h2>
            <div className="stats">
		          <h4>Wins: {cat.wins}</h4>
		          <h4>Chances: {cat.chances}</h4>
		          <h4>Win Percentage: {(cat.wins/cat.chances*100).toFixed(0) + '%'}</h4>
            </div>
		      </div>
		      <img className="cat-page-cat-image" src={`https://res.cloudinary.com/dj2e9orvq/image/upload/${cat.url}`} />
        </section>
        <section className="cat-right-container">
          <div className="leave-comment-container">
            <p>Leave a comment</p>
            <textarea id="comment" cols="30" rows="4" />
            <button onClick={this.submitComment} >Submit</button>
          </div>
          {this.state.comments.map((comment, index) => {
            return <CatComment key={index} comment={comment} />
          })}
        </section>
	    </div>
	  )
  }
}

export default connect(mapStateToProps)(Cat);
