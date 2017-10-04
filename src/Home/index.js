import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash/fp';

import {
  fetchGithubUserAction,
  usersSelector,
} from './state';

import './index.css';
import Pagination from './Pagination';

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

const Home = ({ fetchUserWithPage, users }) => (
  <div>
    {
      users.length > 0 ?
      <div>
        <h3>Top devs in Singapore</h3>
        { userListing(users) }
      </div>
        :
      <div style={{ textAlign: 'center' }}>
        <h3>We're planing a surprise</h3>
        <div
          className="fetch-button"
          onClick={() => fetchUserWithPage(1)}
        >Tap me</div>
      </div>
    }
    <Pagination fetcher={fetchUserWithPage}/>
  </div>
);

const enhance = connect(
  state => ({
    users: usersSelector(state),
  }),
  {
    fetchUserWithPage: fetchGithubUserAction,
  }
);

export default enhance(Home);
