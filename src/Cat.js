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
      comments: []
  	}
    this.getCat = this.getCat.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  componentDidMount() {
    this.getCat();
  }

  // componentDidUpdate() {
  //   if (this.state.cat.id !== +this.props.match.params.id) {
  //     this.getCat();
  //     console.log('running')
  //   }
  //   console.log('this.state.cat.id: ', this.state.cat.id)
  //   console.log('this.props.match.params.id: ', this.props.match.params.id)
  // }

  getCat() {
    axios.get(`/api/getcat?id=${this.props.match.params.id}`)
      .then((cat) => {
        console.log('data: ', cat);
        this.setState({ cat: cat.data.cat, comments: cat.data.comments })
      })
      .catch((err) => console.log('error: ', err))
  }

  submitComment() {
    if (this.props.auth) {
      let message = document.getElementById('comment').value;
      let userid = this.props.auth.id;
      let catid = this.state.cat.id;
      axios.post('/api/addComment', { message, userid, catid })
        .then(() => console.log('sent comment to server'))
        .catch(() => console.log('error sending message to server'))
    } else {
      alert('Please log in if you would like to comment');
    }
  }
	
  render() {
  	const { cat } = this.state;
    console.log('this.state.comments from render: ', this.state.comments)
	return (
	  <div className="cat-page">
      <section className="cat-left-container">
	      <div className="cat-info">
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
