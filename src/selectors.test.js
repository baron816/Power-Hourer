import * as selector from './selectors';
import { fromJS } from 'immutable';

describe('time', () => {
    const state = fromJS({
        clock: {
            time: 55
        }
    });

    it('should return the clock value', () => {
        expect(selector.time(state)).toEqual(55);
    });
});

describe('errors', () => {
    const state = fromJS({
        'error': {
            open: false,
            message: 'No error'
        }
    });
    
    it('should return the value of open', () => {
        expect(selector.open(state)).toBe(false);
    });
    
    it('should return the message', () => {
        expect(selector.message(state)).toEqual('No error');
    });
});

describe('playlist items', () => {
    const state = fromJS({
        playlistItems: {
            playlistItems: [
                {
                    _id: 1,
                    name: 'item 1'
                }, 
                {
                    _id: 2,
                    name: 'item 2'
                }
            ],
            playlistItemsIndex: 1,
            loaded: false
        }
    });
    
    it('should return the playlistItems', () => {
        expect(selector.playlistItems(state)).toEqual(fromJS([
            {
                _id: 1,
                name: 'item 1'
            },
            {
                _id: 2,
                name: 'item 2'
            }
        ]));
    });
    
    it('should return the index', () => {
        expect(selector.playlistItemsIndex(state)).toEqual(1);
    });

    
    it('should return the item', () => {
        expect(selector.video(state)).toEqual(fromJS({
            _id: 2,
            name: 'item 2'
        }));
    });
    
    it('should autoplay', () => {
        expect(selector.autoplay(state)).toEqual(1);
    });
    
    it('should not autoplay if first item', () => {
        const thisState = state.setIn(['playlistItems', 'playlistItemsIndex'], 0);
        expect(selector.autoplay(thisState)).toEqual(0);
    });
    
    it('should return the state of loaded', () => {
        expect(selector.loaded(state)).toBe(false)
    });
    
    it('should returns the playlist item id', () => {
        expect(selector.playlistItemId(state)).toEqual(2);
    });
    
});

describe('playlists', () => {
    const state = fromJS({
        playlists: {
            currentPlaylist: 'serverPlaylists',
            playlistIndex: 1,
            publicPlaylists: [
                {
                    _id: 1,
                    name: 'public list 1',
                    exposed: true
                }
            ],
            serverPlaylists: [
                {
                    _id: 1,
                    name: 'server list1',
                    exposed: false
                }, 
                {
                    _id: 2,
                    name: 'server list2',
                    exposed: true,
                    defaultStart: 43,
                    defaultLength: 55
                },
                {
                    _id: 3,
                    name: 'server list3',
                    exposed: true
                }
            ],
            youtubePlaylists: [
                {
                    _id: 1,
                    name: 'youtube list 1',
                    exposed: false
                }
            ],
            publicPlaylistPage: 2,
            publicPlaylistPageCount: 3
        }
    });

    it('should return the current playlist', () => {
        expect(selector.currentPlaylist(state)).toEqual('serverPlaylists');
    });
    
    it('should return the index', () => {
        expect(selector.playlistIndex(state)).toEqual(1);
    });
    
    it('should return the public playlists', () => {
        expect(selector.publicPlaylists(state)).toEqual(fromJS([
            {
                _id: 1,
                name: 'public list 1',
                exposed: true
            }
        ]));
    });
    
    it('should return the public playlist page', () => {
        expect(selector.publicPlaylistPage(state)).toEqual(2);
    });
    
    it('should return the number of pages', () => {
        expect(selector.publicPlaylistPageCount(state)).toEqual(3);
    });
    
    it('should return the server playlists', () => {
        expect(selector.serverPlaylists(state)).toEqual(fromJS([
            {
                _id: 1,
                name: 'server list1',
                exposed: false
            },
            {
                _id: 2,
                name: 'server list2',
                exposed: true,
                defaultStart: 43,
                defaultLength: 55
            },
            {
                _id: 3,
                name: 'server list3',
                exposed: true
            }
        ]));
    });
    
    it('should return the youtube playlists', () => {
        expect(selector.youtubePlaylists(state)).toEqual(fromJS([
            {
                _id: 1,
                name: 'youtube list 1',
                exposed: false
            }
        ]));
    });
    
    it('should return the selected playlist', () => {
        expect(selector.selectedPlaylist(state)).toEqual(fromJS({
            _id: 2,
            name: 'server list2',
            exposed: true,
            defaultStart: 43,
            defaultLength: 55
        }));
    });

    it('should return the exposed', () => {
        expect(selector.playlistExposed(state)).toBe(true)
    });
    
    it('should return the default start', () => {
        expect(selector.defaultStart(state)).toEqual(43);
    });
    
    it('should return the default length', () => {
        expect(selector.defaultLength(state)).toEqual(55);
    });
    
    it('should returns the playlist id', () => {
        expect(selector.playlistId(state)).toEqual(2);
    });
    
});


describe('root', () => {
    const state = fromJS({
        root: {
            callNext: false,
            showModal: true,
            accessToken: 'von2oielnalne',
            serverId: 'e2j82j0oinv'
        }
    });
    
    it('should return state of callNext', () => {
        expect(selector.callNext(state)).toBe(false);
    });
    
    it('should return state of modal', () => {
        expect(selector.showModal(state)).toBe(true);
    });
    
    it('should return the access token', () => {
        expect(selector.accessToken(state)).toEqual('von2oielnalne');
    });
    
    
    it('should return the serverId', () => {
        expect(selector.serverId(state)).toBe('e2j82j0oinv');
    });
    
});

describe('video', () => {
    var state = fromJS({
        playlists: {
            currentPlaylist: 'serverPlaylists',
            playlistIndex: 1,
            publicPlaylists: [
                {
                    _id: 1,
                    name: 'public list 1',
                    exposed: true
                }
            ],
            serverPlaylists: [
                {
                    _id: 1,
                    name: 'server list1',
                    exposed: false
                },
                {
                    _id: 2,
                    name: 'server list2',
                    exposed: true,
                    defaultStart: 43,
                    defaultLength: 55
                },
                {
                    _id: 3,
                    name: 'server list3',
                    exposed: true
                }
            ],
            youtubePlaylists: [
                {
                    _id: 1,
                    name: 'youtube list 1',
                    exposed: false
                }
            ],
        },
        playlistItems: {
            playlistItems: [
                {
                    _id: 1,
                    name: 'item 1'
                },
                {
                    _id: 2,
                    name: 'item 2',
                    startTime: 79,
                    videoLength: 88
                }
            ],
            playlistItemsIndex: 1
        }
    });

    it('should return the start time', () => {
        expect(selector.videoStart(state)).toEqual(79);
    });
    
    it('should return the video length', () => {
        expect(selector.videoLength(state)).toEqual(88);
    });
    
    it('should return the video end time', () => {
        expect(selector.videoEnd(state)).toEqual(167);
    });

});


describe('searchVideos', () => {
    const state = fromJS({
        searchVideos: {
            searchResults: [
                {
                    _id: 1,
                    name: 'found video 1'
                },
                {
                    _id: 2,
                    name: 'found video 2'
                },
                {
                    _id: 3,
                    name: 'found video 3'
                }
            ],
            nextPageToken: 'fo3un2ou108',
            searching: true
        }
    });

    
    it('should return the results', () => {
        expect(selector.searchResults(state)).toEqual(fromJS([
            {
                _id: 1,
                name: 'found video 1'
            },
            {
                _id: 2,
                name: 'found video 2'
            },
            {
                _id: 3,
                name: 'found video 3'
            }
        ]));
    });
    
    it('should return the page token', () => {
        expect(selector.nextPageToken(state)).toEqual('fo3un2ou108');
    });
    
    it('should return the state of searching', () => {
        expect(selector.searching(state)).toBe(true);
    });
    
    
    it('should return the item from the index', () => {
        expect(selector.selectedFromSearch(2)(state)).toEqual(fromJS({
            _id: 3,
            name: 'found video 3'
        }));
    });
    
});
