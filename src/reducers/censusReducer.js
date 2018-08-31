const initialState = {
  items: [],
}

import { CENSUS_RECEIVED } from 'constants/actions';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CENSUS_RECEIVED:
      return Object.assign({}, state, {
        items: action.items,
      })
    default:
      return state;
  }
}

export default reducer;