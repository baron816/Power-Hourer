import { ajax } from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import { YOUTUBE_URL, YOUTUBE_API_KEY } from '../epics';

import {
  setError,
  searchVideosFulfilled
} from '../actions';

import {
  nextPageToken
} from '../selectors';

import {
  SEARCH_VIDEOS
} from '../actionCreators';

export function searchVideos(action$, store) {
  return action$.ofType(SEARCH_VIDEOS)
    .debounceTime(1000)
    .switchMap(({payload}) => {
      const nextPage = nextPageToken(store.getState());
      const next = nextPage ? `pageToken=${nextPage}&` : '';
      return ajax.getJSON(`${YOUTUBE_URL}search?part=snippet&order=viewCount&${next}type=video&maxResults=16&key=${YOUTUBE_API_KEY}&q=${payload}`)
        .map(function ({items, nextPageToken}) {
          const normalizedItems = items.map(function({
            id: {videoId},
            snippet: {
              thumbnails: {default: {url}},
              title
            }
          }) {
            return {
              videoId,
              thumbnail: url,
              title
            };
          });

          return searchVideosFulfilled(normalizedItems, nextPageToken);
        })
        .catch((err) => {
          console.error(err);
          return Observable.of(setError('Failed to Search for Videos'));
        });
    });
}
