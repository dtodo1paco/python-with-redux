const initialState = {
    items: [],
}

import { LOCATIONS_RECEIVED, LOCATION_DELETED, LOCATION_ADDED } from 'constants/location_actions';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOCATIONS_RECEIVED:
            return Object.assign({}, state, {
                items: action.items.slice(),
            })
        case LOCATION_DELETED:
            return Object.assign({}, state, {
                items: state.items.filter( (item, index) => index !== action.index),
            })
        case LOCATION_ADDED:
            return Object.assign({}, state, {
                items: [...state.items, action.item],
            })
        default:
            return state;
    }
}

export default reducer;