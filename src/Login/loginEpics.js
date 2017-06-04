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
    .mergeMap(function ({payload: tokenId}) {
      return ajax.post(SERVER_URL + 'users', null,
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': tokenId
      })
        .mergeMap(({response}) => [setServerId(response.token), fetchServerPlaylistsFulfilled(response.playlists)])
        .catch(() => {
          return setError('Faild to create user');
        });
    });
}
