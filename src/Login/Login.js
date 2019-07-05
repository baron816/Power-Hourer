import React from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import enhancedConnect from '../enhancedConnect';

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

Login.propTypes = {
  setAccessToken: PropTypes.func.isRequired,
  fetchYoutubePlaylists: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
};



const mapDispatchToProps = [
  'setAccessToken',
  'fetchYoutubePlaylists',
  'loginUser',
  'setError'
];

export default enhancedConnect([], mapDispatchToProps)(Login);
