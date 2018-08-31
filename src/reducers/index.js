import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import CENSUS_RECEIVED from './censusReducer';
import locationReducer from './locationReducer';
import personReducer from './personReducer';
import appReducer from './appReducer';


export const rootReducer = combineReducers({
    form: formReducer,
    census: CENSUS_RECEIVED,
    locations: locationReducer,
    persons: personReducer,
    app: appReducer
});