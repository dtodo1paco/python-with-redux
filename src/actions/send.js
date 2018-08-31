import { SEND_ITEMS_RESPONSE } from 'constants/send';
import { setLoading, resetLoading, setErrorModal } from 'actions/app'


import { addItem as addPersonToState } from 'actions/persons'
import { addItem as addLocationToState } from 'actions/locations'
export function addItem (model, item) {
    return function(dispatch) {
        let addItemToState;
        if (model === 'person') {
            dispatch(addPersonToState(item));
        } else if (model === 'location') {
            dispatch(addLocationToState(item));
        } else {
            console.error("Unable to find model with pathname: " + model);
        }
    }
}


export const receiveResponse = (items) => ({
    type: SEND_ITEMS_RESPONSE, items
})


export function sendData(url, data) {
    return function(dispatch) {
        const model = url.substring(0,url.length-1).substring(url.substring(0,url.length-1).lastIndexOf('/')+1);
        console.log("--- model: " + model);
        dispatch(setLoading())
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
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
                if (status >= 400) dispatch(setErrorModal(json))
                else {
                    dispatch(receiveResponse(json));
                    dispatch(addItem(model, JSON.parse(json.data)))
                }
            }, err => { dispatch(resetLoading());dispatch(setErrorModal(err))  })
    }
}