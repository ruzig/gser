import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash/fp';

import {
  fetchGithubUserAction,
  usersSelector,
} from './state';

import './index.css';

const userListing = map(user => (
  <div className="line" key={user.id}>
    <img
      className="avatar"
      src={user.avatar_url}
      alt="avatar"
    />
    <a href={user.html_url}>{user.login}</a>
  </div>
));

const Home = ({ fetchUser, users }) => (
  <div>
    <input
      type="button"
      value="Tap me"
      onClick={() => fetchUser()}
    />
    <div>
      {users && userListing(users)}
    </div>
  </div>
);

const enhance = connect(
  state => ({
    users: usersSelector(state),
  }),
  {
    fetchUser: fetchGithubUserAction,
  }
);

export default enhance(Home);
