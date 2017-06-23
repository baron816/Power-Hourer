import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { dispatchAll } from '../utils';

import {
  setAccessToken,
  fetchYoutubePlaylists,
  loginUser,
  setError
} from '../actions';

function Login({signIn, error}) {
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
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {

  const signIn = ({accessToken, googleId, tokenId}) => dispatchAll(dispatch, setAccessToken(accessToken, googleId), fetchYoutubePlaylists(), loginUser(tokenId));

  const error = dispatchAll(dispatch, setError('Failed to login'));

  return {
    signIn,
    error
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
