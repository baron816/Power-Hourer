import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Clock from './Clock';
import reducer from '../reducers';

const store = createStore(reducer);

function setup() {
    const enzymeWrapper = mount(<Provider store={store}><Clock /></Provider>);

    return {
        enzymeWrapper
    };
}

describe('Clock', () => {
    it('should render the component', () => {
        const { enzymeWrapper } = setup();

        var div = enzymeWrapper.find('div');

        expect(div.hasClass('Clock')).toBe(true);
        expect(div.first().text()).toBe('00');
    });
    
});


