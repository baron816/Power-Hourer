import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import {
  setAccessToken,
  fetchYoutubePlaylists,
  loginUser
} from '../actions';

function Login({signIn}) {
  return (
    <GoogleLogin
      clientId="727985332451-et0hhrtnpccevvstmjm1e11vv7kc16pd.apps.googleusercontent.com"
      buttonText="Login To YouTube"
      discoveryDocs="https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
      scope="https://www.googleapis.com/auth/youtube.readonly"
      onSuccess={signIn}
      onFailure={signIn}
    />
  );
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  function signIn({accessToken, googleId}) {
    dispatch(setAccessToken(accessToken, googleId));
    dispatch(fetchYoutubePlaylists());
    dispatch(loginUser(googleId));
  }

  return {
    signIn
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
