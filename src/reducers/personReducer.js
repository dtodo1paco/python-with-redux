const initialState = {
    items: [],
}

import { PERSONS_RECEIVED, PERSON_DELETED, PERSON_ADDED } from 'constants/person_actions';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PERSONS_RECEIVED:
            return Object.assign({}, state, {
                items: action.items,
            })
        case PERSON_DELETED:
            return Object.assign({}, state, {
                items: [
                    ...state.items.slice(0, action.index),
                    ...state.items.slice(action.index + 1)
                ],
            })
        case PERSON_ADDED:
            return Object.assign({}, state, {
                items: [...state.items, action.item],
            })
        default:
            return state;
    }
}


export default reducer;