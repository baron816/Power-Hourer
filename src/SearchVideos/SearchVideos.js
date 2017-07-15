import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Star from 'material-ui/svg-icons/toggle/star';
import RaisedButton from 'material-ui/RaisedButton';

import {
  searchVideos,
  addVideoToServerPlaylist
} from '../actions';

import { makeProps } from '../utils';

import {
  searchResults,
  nextPageToken
} from '../selectors';

import './SearchVideos.css';

function SearchVideos(props) {
  const searchComponent = new React.Component(props);

  searchComponent.state = {
    searchTerm: ''
  };

  searchComponent.render = function () {
    return (
      <div id='searchVideos'>
        <TextField
          floatingLabelText='Search YouTube Videos'
          onChange={handleSearch}
        />

        <GridList
          cellHeight={180}
        >
        {searchComponent.props.searchResults.map((item, index) => (
          <GridItem
            item={item}
            index={index}
            key={item.get('videoId')}
          />
        ))}
        </GridList>
        <br/>
        {searchComponent.props.nextPageToken && <RaisedButton primary={true} label='Next' onClick={handleNext} />}
      </div>
    );
  };

  function handleSearch(event) {
    const term = event.target.value;
    searchComponent.setState({searchTerm: term});
    searchComponent.props.search(term);
  }

  function handleNext() {
    const term = searchComponent.state.searchTerm;
    searchComponent.props.search(term);
  }


  function GridItem(props) {
    const itemComponent = new React.Component(props);

    itemComponent.state = {
      added: false
    };

    itemComponent.render = function () {
      const { item, index } = itemComponent.props;
      return (
        <GridTile
          title={item.get('title')}
          actionIcon={
            <IconButton
              disabled={itemComponent.state.added}
              onClick={handleAdd(index)}>
              <Star color='white' />
            </IconButton>
          }
        >
          <img src={`https://i.ytimg.com/vi/${item.get('videoId')}/mqdefault.jpg`} alt='#' />
        </GridTile>
      );
    };

    function handleAdd(index) {
      return function () {
        itemComponent.setState({added: true});
        searchComponent.props.addVideo(index);
      };
    }

    return itemComponent;
  }

  return searchComponent;
}



const mapStateToProps = makeProps({searchResults, nextPageToken});

function mapDispatchToProps(dispatch) {
  function search(query) {
    dispatch(searchVideos(query));
  }

  function addVideo(index) {
    dispatch(addVideoToServerPlaylist(index));
  }

  return {
    search,
    addVideo
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchVideos);
