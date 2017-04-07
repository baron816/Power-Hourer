import {
  SET_ACCESS_TOKEN
} from './actionCreators';

export function setAccessToken(token) {
  return {
    type: SET_ACCESS_TOKEN,
    token
  };
}
