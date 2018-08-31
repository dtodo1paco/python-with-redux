import fetch from 'isomorphic-fetch';

import { CENSUS_RECEIVED } from 'constants/actions';

import { setLoading, resetLoading, setErrorPage } from 'actions/app'

export const receiveItems = (items) => ({
  type: CENSUS_RECEIVED, items
})

export function fetchData(query) {
    return function(dispatch) {
        dispatch(setLoading())
        return fetch(query)
            .then(response => response.json()
                .then(json => ({
                    status: response.status,
                    json
                })))
            .then(({ status, json }) => {
                dispatch(resetLoading());
                if (status >= 400) dispatch(setErrorPage(status))
                else {dispatch(receiveItems(json)); dispatch(resetLoading())}
            }, err => { dispatch(resetLoading());dispatch(setErrorPage(err))  })
    }
}
