import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import {
  SERVER_URL
} from '../epics';

import {
  CREATE_USER,
} from '../actionCreators';

import { setServerId } from '../actions';

export function createUserEpic(action$, store) {
  return action$.ofType(CREATE_USER)
    .mergeMap(function () {
      const state = store.getState();
      const user = JSON.stringify({
        googleId: state.getIn(['root', 'googleId']),
        username: state.getIn(['createUser', 'username'])
      });
      return ajax.post(SERVER_URL + 'users', user, {'Content-Type': 'application/json'})
        .map(({response}) => setServerId(response._id));
    });
}
