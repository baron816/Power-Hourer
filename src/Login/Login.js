import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';

import {
  setAccessToken,
  fetchYoutubePlaylists,
  loginUser,
  setError
} from '../actions';

function Login({setAccessToken, fetchYoutubePlaylists, loginUser, setError}) {
  return (
    <GoogleLogin
      clientId="727985332451-et0hhrtnpccevvstmjm1e11vv7kc16pd.apps.googleusercontent.com"
      buttonText="Login To YouTube"
      discoveryDocs="https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
      scope="https://www.googleapis.com/auth/youtube.readonly"
      onSuccess={signIn}
      onFailure={error}
    />
  );

  function signIn(response) {
    setAccessToken(response);
    fetchYoutubePlaylists();
    loginUser(response);
  }

  function error() {
    return function () {
      return setError('Failed to login');
    };
  }
}

function mapStateToProps() {
  return {};
}


export default connect(mapStateToProps, {setAccessToken, fetchYoutubePlaylists, loginUser, setError})(Login);
