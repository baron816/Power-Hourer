import React from 'react';
import PropTypes from 'prop-types';

import {GridList} from 'material-ui/GridList';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import GridItem from './GridItem';
import './SearchVideos.css';


export default function SearchVideosComponent(props) {
  return (
    <div id='searchVideos'>
      <TextField
        floatingLabelText='Search YouTube Videos'
        onChange={props.handleSearch}
      />

      <GridList
        cellHeight={180}
      >
      {props.searchResults.map((item, index) => (
        <GridItem
          {...props}
          item={item}
          index={index}
          key={item.get('videoId') || 'bad-video' + index}
        />
      ))}
      </GridList>
      <br/>
      {props.nextPageToken &&
        <RaisedButton
          primary={true}
          label='Next'
          onClick={props.handleNext}
        />
      }
    </div>
  );
}

SearchVideosComponent.propTypes = {
  searchResults: PropTypes.object.isRequired,
  nextPageToken: PropTypes.string,
  handleNext: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired
};
