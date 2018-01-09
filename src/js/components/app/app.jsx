import React from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ChatRoomContainer from '../../containers/chat-room-container';

import store from '../../store';
import './app.scss';

export default () => (
    <Provider store={store}>
        <MuiThemeProvider>
            <div className="page-container">
                <ChatRoomContainer />
            </div>
        </MuiThemeProvider>
    </Provider>
);
