import { combineReducers } from 'redux';
import questionItems from './questionItems';
import tabState from './tabState';
import userItem from './userReducer';

const reducers = combineReducers({
    user: userItem,
    questions : questionItems, 
    tab: tabState
})

export default reducers