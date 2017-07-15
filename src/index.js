import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { persistStore } from 'redux-persist-immutable';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { indigo500 } from 'material-ui/styles/colors';

import App from './App';
import store from './store';
import './index.css';

injectTapEventPlugin();

function AppProvider() {
  const c = new React.Component();

  const muiTheme = getMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
      primary1Color: indigo500,
    }
  });

  c.state = {
    rehyrdrated: false
  };

  c.componentWillMount = function () {
    persistStore(store, {blacklist: ['searchVideos']}, () => {
      c.setState({ rehyrdrated: true });
    });
  };

  c.render =  function () {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          {c.state.rehyrdrated ?
            <App /> : <Spinner />
          }
        </MuiThemeProvider>
      </Provider>
    );
  };

  function Spinner() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><CircularProgress size={100} thickness={8}/></div>
    );
  }

  return c;
}

ReactDOM.render(
  <AppProvider />,
  document.getElementById('root')
);
