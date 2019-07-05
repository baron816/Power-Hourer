import { createEnhancedConnect } from 'react-redux-props-helper';
import * as selectors from './selectors';
import * as actions from './actions';

export default createEnhancedConnect(selectors, actions);
