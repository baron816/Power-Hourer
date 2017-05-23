import YouTubeVideo from '../Video/YouTubeVideo';
import VideoModalHOC from './VideoModalHOC';

import {
  fetchServerPlaylistItems
} from '../actions';

export default VideoModalHOC(YouTubeVideo, fetchServerPlaylistItems, 'publicPlaylists', 'playlistId');
