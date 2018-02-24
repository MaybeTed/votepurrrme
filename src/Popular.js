import React from 'react';

class Popular extends React.Component {
  constructor() {
  	super();
  	this.state = {

  	}
  }

  componentDidMount() {
  	this.props.whichPage('Popular');
  }

  render() {
  	return (
      <div>
        <h1>Popular component</h1>
      </div>
  	)
  }
}

export default Popular;
