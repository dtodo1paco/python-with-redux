import {
    RESET_ERRORS, SET_ERROR_PAGE, SET_ERROR_MODAL,
    SET_LOADING, RESET_LOADING,
    SHOW_MODAL, HIDE_MODAL
    } from 'constants/app'

export const resetErrors = () => ({
    type: RESET_ERRORS
})

export const setErrorPage = (err) => ({
    type: SET_ERROR_PAGE,
    err
})
export const setErrorModal = (err) => ({
    type: SET_ERROR_MODAL,
    err
})

export const setLoading = () => ({
    type: SET_LOADING
})
export const resetLoading = () => ({
    type: RESET_LOADING
})

export const showModal = () => ({
    type: SHOW_MODAL
})
export const hideModal = () => ({
    type: HIDE_MODAL
})


