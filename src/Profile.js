import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFriends: false,
      followers: true,
      person: {
        id: 1,
        name: 'Sample Data',
        photo: 'https://www.flooringvillage.co.uk/ekmps/shops/flooringvillage/images/request-a-sample--547-p.jpg'
      }
    }

    this.getPerson = this.getPerson.bind(this);
    this.showFollowing = this.showFollowing.bind(this);
    this.showFollowers = this.showFollowers.bind(this);
  }
  componentDidMount() {
    this.props.whichPage('Profile');
    this.getPerson();
  }

  componentDidUpdate() {
    this.getPerson();
  }

  getPerson() {
    axios.get(`/api/getuser?id=${this.props.match.params.id}`)
      .then((user) => this.setState({ person: user.data }))
  }

  showFollowers() {
    if (this.state.followers && this.state.showFriends) {
      this.setState({ showFriends: false });
    } else if (!this.state.showFriends) {
      this.setState({ showFriends: true, followers: true });
    } else if (!this.state.followers) {
      this.setState({ followers: true });
    }
  }

  showFollowing() {
    if (!this.state.followers && this.state.showFriends) {
      this.setState({ showFriends: false });
    } else if (!this.state.showFriends) {
      this.setState({ showFriends: true, followers: false });
    } else if (this.state.followers) {
      this.setState({ followers: false });
    }
  }

	render() {
    const { person } = this.state;
		return (
      <div className="profile">
        <section className="profile-user">
          <img src={person.photo} />
          <h3>{person.name}</h3>
          <h5>Display reputation here</h5>
          <div className="follow-container">
            <div>
              <div className="follow-name" onClick={this.showFollowers}>Followers</div>
              <div className="follow-number" onClick={this.showFollowers}>0</div>
            </div>
            <div>
              <div className="follow-name" onClick={this.showFollowing}>Following</div>
              <div className="follow-number" onClick={this.showFollowing}>0</div>
            </div>
          </div>
        </section>
        <section className={this.state.showFriends ? "profile-friends" : "profile-friends hide"}>
          <h2>
          {this.state.followers ? <p>Followers</p> : <p>Following</p>}
          </h2>
        </section>
      </div>
		)
	}
}

export default connect(mapStateToProps)(Profile);
