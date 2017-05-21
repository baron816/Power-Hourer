import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import {
  SERVER_URL
} from '../epics';

import {
  LOGIN_USER,
} from '../actionCreators';

import {
  fetchServerPlaylistsFulfilled,
  setServerId,
  setError
 } from '../actions';

export function createUserEpic(action$) {
  return action$.ofType(LOGIN_USER)
    .mergeMap(function ({payload: googleId}) {
      return ajax.post(SERVER_URL + 'users', JSON.stringify({googleId}), {'Content-Type': 'application/json'})
        .mergeMap(({response}) => [setServerId(response._id), fetchServerPlaylistsFulfilled(response.playlists)])
        .catch(() => {
          return setError('Faild to create user');
        });
    });
}
