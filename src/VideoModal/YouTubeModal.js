import YouTubeVideo from '../Video/YouTubeVideo';
import VideoModalHOC from './VideoModalHOC';

import {
  fetchYoutubePlaylistItems
} from '../actions';

export default VideoModalHOC(YouTubeVideo, fetchYoutubePlaylistItems);
