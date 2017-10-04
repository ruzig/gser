import React from 'react';
import { connect } from 'react-redux';
import { path } from 'lodash/fp';

import './Notification.css';
import { messageSelector } from './state';

const Notification = ({ notification }) => (
  <div >
    { path('error', notification) && <div className="hide-me notification">
      {notification.message}
    </div> }
  </div>
);

const enhance = connect(
  state => ({
    notification: messageSelector(state),
  })
);

export default enhance(Notification);
