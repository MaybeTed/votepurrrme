import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProfileFavorites from './ProfileFavorites';
import ProfileComments from './ProfileComments';
import Followers from './Followers';
import Following from './Following';

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
      hasFollowers: true,
      person: {
        id: 1,
        name: 'Sample Data',
        photo: 'https://www.flooringvillage.co.uk/ekmps/shops/flooringvillage/images/request-a-sample--547-p.jpg'
      },
      showFavorites: true,
      comments: [],
      followers: [],
      following: [],
      favorites: [],
      isFollowing: false
    }
    this.deleteComment = this.deleteComment.bind(this);
    this.follow = this.follow.bind(this);
    this.getPerson = this.getPerson.bind(this);
    this.renderButtonText = this.renderButtonText.bind(this);
    this.showFollowing = this.showFollowing.bind(this);
    this.showFollowers = this.showFollowers.bind(this);
    this.showFavorites = this.showFavorites.bind(this);
  }
  componentDidMount() {
    this.props.whichPage('Profile');
    this.getPerson();
  }

  componentDidUpdate() {
    if (this.state.person.id !== +this.props.match.params.id) {
      this.getPerson();
    }
  }

  deleteComment(commentid) {
    axios.post('/api/deleteComment', {
      comment: commentid
    })
    .then(() => this.getPerson())
  }

  follow() {
    // make a condition that says if this person is already a follower
    // you can't follow again, but you can unfollow

    if (this.state.isFollowing === false) {
      axios.post('/api/follow', {
        follower: this.props.auth.id,
        following: this.state.person.id
      }).then(() => this.getPerson())
    } else {
      axios.post('/api/unfollow', {
        follower: this.props.auth.id,
        following: this.state.person.id 
      }).then(() => this.getPerson())
    }
  }

  getPerson() {
    axios.get(`/api/getuser?id=${this.props.match.params.id}`)
      .then((user) => {
        this.setState({
          person: user.data.user,
          comments: user.data.comments,
          followers: user.data.followers,
          following: user.data.following,
          favorites: user.data.favorites,
          showFriends: false,
        })
      })
  }

  renderButtonText() {
    let person = this.state.followers;
    for (var i = 0; i < person.length; i++) {
      if (person[i].follower === this.props.auth.id) {
        if (this.state.isFollowing === false) {
          this.setState({ isFollowing: true });
        }
        return 'Unfollow';
      }
    }
    if (this.state.isFollowing) {
      this.setState({ isFollowing: false });
    }
    return 'Follow';
  }

  showFavorites(e) {
    let bool = false;
    if (/favorites/.test(e.target.className)) {
      bool = true;
    }
    if (this.state.showFavorites !== bool) {
      this.setState({ showFavorites: bool });
    }
  }

  showFollowers() {
    if (this.state.hasFollowers && this.state.showFriends) {
      this.setState({ showFriends: false });
    } else if (!this.state.showFriends) {
      this.setState({ showFriends: true, hasFollowers: true });
    } else if (!this.state.hasFollowers) {
      this.setState({ hasFollowers: true });
    }
  }

  showFollowing() {
    if (!this.state.hasFollowers && this.state.showFriends) {
      this.setState({ showFriends: false });
    } else if (!this.state.showFriends) {
      this.setState({ showFriends: true, hasFollowers: false });
    } else if (this.state.hasFollowers) {
      this.setState({ hasFollowers: false });
    }
  }

	render() {
    const { person } = this.state;
		return (
      <div className="profile">
        <div className="profile-left-container">
          <section className="profile-user">
            <img src={person.photo} />
            <div className="profile-name-and-button">
              <h3>{person.name}</h3>
              {this.props.auth && this.props.auth.id !== person.id ?
                <button className="follow-button" onClick={this.follow}>{this.renderButtonText()}</button>
                :
                null
              }
            </div>
            <div className="follow-container">
              <div>
                <div className="follow-name" onClick={this.showFollowers}>Followers</div>
                <div className="follow-number" onClick={this.showFollowers}>{this.state.followers.length}</div>
              </div>
              <div>
                <div className="follow-name" onClick={this.showFollowing}>Following</div>
                <div className="follow-number" onClick={this.showFollowing}>{this.state.following ? this.state.following.length : 0}</div>
              </div>
            </div>
          </section>
          <section className={this.state.showFriends ? "profile-friends" : "profile-friends hide"}>
            <h2>
            {this.state.hasFollowers ?
              <Followers followers={this.state.followers} />
              :
              <Following following={this.state.following} />
            }
            </h2>
          </section>
        </div>
        <div className="profile-right-container">
          <div className="my-options">
            <div className={this.state.showFavorites ? "my-favorites white-underline" : "my-favorites black-underline"} onClick={(e) => this.showFavorites(e)} >Favorites</div>
            <div className={this.state.showFavorites ? "my-comments black-underline" : "my-comments white-underline"} onClick={(e) => this.showFavorites(e)} >Comments</div>
          </div>
          {this.state.showFavorites ?
            <ProfileFavorites favorites={this.state.favorites} />
            :
            <ProfileComments comments={this.state.comments} deleteComment={this.deleteComment} />
          }
        </div>
      </div>
		)
	}
}

export default connect(mapStateToProps)(Profile);
