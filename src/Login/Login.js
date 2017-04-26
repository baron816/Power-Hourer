import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { setAccessToken, fetchPlaylists } from '../actions';

function Login({setToken}) {
  return (
    <GoogleLogin
    clientId="727985332451-et0hhrtnpccevvstmjm1e11vv7kc16pd.apps.googleusercontent.com"
    buttonText="Login"
    discoveryDocs="https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
    scope="https://www.googleapis.com/auth/youtube.readonly"
    onSuccess={setToken}
    onFailure={setToken}
    />
  );
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  function setToken({accessToken}) {
    dispatch(setAccessToken(accessToken));
    dispatch(fetchPlaylists());
  }

  return {
    setToken
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
