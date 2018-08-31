import { DELETE_ITEM_RESPONSE } from 'constants/send';
import { setLoading, resetLoading, setErrorPage } from 'actions/app'

export const receiveResponse = (items) => ({
    type: DELETE_ITEM_RESPONSE, items
})
export function deleteItem(url, id) {
    return function(dispatch) {
        dispatch(setLoading())
        return fetch(url, {
            method: "DELETE",
            body: JSON.stringify({id: id}),
            headers: {
                    "Content-Type": "application/json"
                }
            })
        .then(response => response.json()
            .then(json => ({
                status: response.status,
                json
            })))
            .then(({ status, json }) => {
                dispatch(resetLoading());
                if (status >= 400) dispatch(setErrorPage(json))
                else dispatch(receiveResponse(json))
            }, err => { dispatch(resetLoading());dispatch(setErrorPage(err))  })
    }
}