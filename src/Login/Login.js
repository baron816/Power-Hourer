import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { setAccessToken } from '../actions';

function Login(props) {
  const c = new React.Component(props);

  c.render = function () {
    return (
      <GoogleLogin
      clientId="727985332451-et0hhrtnpccevvstmjm1e11vv7kc16pd.apps.googleusercontent.com"
      buttonText="Login"
      discoveryDocs="https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
      scope="https://www.googleapis.com/auth/youtube.readonly"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      />
    );
  };

  function responseGoogle(response) {
    c.props.dispatch(setAccessToken(response.accessToken));
  }

  return c;
}

export default connect()(Login);
