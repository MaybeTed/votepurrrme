import React from 'react';
import axios from 'axios';

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
      }
  	}
  }
  componentDidMount() {
    axios.get(`/api/getcat?id=${this.props.match.params.id}`)
      .then((cat) => this.setState({ cat: cat.data }))
  }
	
  render() {
  	const { cat } = this.state;
	return (
	  <div className="cat-page">
	    <div className="cat-info">
		  <h2>{cat.name}</h2>
		  <h4>Wins: {cat.wins}</h4>
		  <h4>Chances: {cat.chances}</h4>
		  <h4>Win Percentage: {(cat.wins/cat.chances*100).toFixed(0) + '%'}</h4>
		</div>
		<img src={`https://res.cloudinary.com/dj2e9orvq/image/upload/${cat.url}`} />
	  </div>
	)
  }
}

export default Cat;
