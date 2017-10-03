import React from 'react';
import { connect } from 'react-redux';

import { fetchGithubUserAction } from './state';

const Home = ({ fetchUser }) => (
  <div>
    <input
      type="button"
      value="Tap me"
      onClick={() => fetchUser()}
    />
  </div>
);

const enhance = connect(
  null,
  {
    fetchUser: fetchGithubUserAction,
  }
);

export default enhance(Home);
