import fetch from 'isomorphic-fetch';

import { PERSONS_RECEIVED, PERSON_DELETED, PERSON_ADDED } from 'constants/person_actions';
import { setLoading, resetLoading, setErrorPage } from 'actions/app'

export const receiveItems = (items) => ({
    type: PERSONS_RECEIVED, items
})
export const deleteItem = (index) => ({
    type: PERSON_DELETED, index
})
export const addItem = (item) => ({
    type: PERSON_ADDED, item
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
