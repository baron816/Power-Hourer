import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Clock from '../Clock/Clock';

export default function VideoComponent(props) {
  return (
    <Card id='video'>
      <CardHeader
        title={props.video.get('title')}
        subtitle={<Clock />}
        actAsExpander={true}
        showExpandableButton={true}/>
      <CardMedia style={{justifyContent: 'center', display: 'flex'}}>
        <YouTube
          videoId={props.video.get('videoId')}
          opts={{
            height: '420',
            width: '670',
            playerVars: {
              start: props.videoStart,
              end: props.videoEnd,
              autoplay: props.autoplay,
              rel: 0
            }
          }}
          onEnd={props.handleVideoEnd}
          onPlay={props.changePlay(true)}
          onPause={props.changePlay(false)}
          onError={props.handleVideoError}
          id='main-video'
          ref={props.setVideoElement}
        />
      </CardMedia>
      <CardText expandable={true}>
        <TextField
          floatingLabelText='Video length'
          value={String(props.videoLength)}
          onChange={props.changeVidLen}
          type='number'
          step={5}
          min={5}
        />
        <br/>
        <TextField
          floatingLabelText='Video start time'
          value={String(props.videoStart)}
          onChange={props.changeVidStart}
          type='number'
          step={5}
          min={0}
        />
        <br/>
        <RaisedButton
          onClick={props.startNow}
          label='Set video start to now'
          primary={true}
        />
      </CardText>
    </Card>
  );
}

VideoComponent.propTypes = {
  video: PropTypes.object.isRequired,
  handleVideoEnd: PropTypes.func.isRequired,
  changePlay: PropTypes.func.isRequired,
  handleVideoError: PropTypes.func.isRequired,
  startNow: PropTypes.func.isRequired,
  videoLength: PropTypes.number.isRequired,
  videoStart: PropTypes.number.isRequired,
  videoEnd: PropTypes.number.isRequired,
  autoplay: PropTypes.number.isRequired,
  setVideoElement: PropTypes.func.isRequired
};
