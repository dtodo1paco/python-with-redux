import fetch from 'isomorphic-fetch';

import { LOCATIONS_RECEIVED, LOCATION_DELETED, LOCATION_ADDED } from 'constants/location_actions';
import { setLoading, resetLoading, setErrorPage } from 'actions/app'

export const receiveItems = (items) => ({
    type: LOCATIONS_RECEIVED, items
})
export const deleteItem = (index) => ({
    type: LOCATION_DELETED, index
})
export const addItem = (item) => ({
    type: LOCATION_ADDED, item
})

export function fetchData(query) {
    return function (dispatch) {

        dispatch(setLoading())
        return fetch(query)
            .then(response => response.json()
                .then(json => ({
                    status: response.status,
                    json
                })))
            .then(({ status, json }) => {
                dispatch(resetLoading())
                if (status >= 400) dispatch(setErrorPage(status))
                else {
                    dispatch(receiveItems(json.data));
                }
            }, err => {
                dispatch(resetLoading());
                dispatch(setErrorPage(err))
            })
    }
}
