import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/timeInterval';
import { Observable } from 'rxjs';

import {
  START_TIME,
  INCREMENT_TIME,
  END_TIME,
} from '../actionCreators';

export function incrementTime() {
  return {
    type: INCREMENT_TIME
  };
}

export function startTimeEpic(action$) {
  return action$.ofType(START_TIME)
    .mergeMap(function () {
      return Observable.timer(0, 1000)
      .timeInterval()
      .map(() => incrementTime())
      .takeUntil(action$.ofType(END_TIME));
    });
}
