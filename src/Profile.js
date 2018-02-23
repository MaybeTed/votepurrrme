import React from 'react';
// import ProfileUser from './'

class Profile extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
      <div className="profile">
        <section className="profile-user">
          <img src="" />
          <h3>Display name here</h3>
          <h5>Display reputation here</h5>
          <div className="follow-container">
            <div>
              <div>Followers</div>
              <div className="follow-number">0</div>
            </div>
            <div>
              <div>Following</div>
              <div className="follow-number">0</div>
            </div>
          </div>
        </section>
      </div>
		)
	}
}

export default Profile;
