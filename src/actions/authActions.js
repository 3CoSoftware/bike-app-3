import axios from 'axios'
import { returnErrors } from './errorActions'

import { 
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from './types'

// GET CURRENT USER
export const loadUser = () => (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    })

    

    axios.get(`http://localhost:5000/auth/user`, tokenConfig(getState))
    .then(res => dispatch({
        type: USER_LOADED,
        payload: res.data 
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type: AUTH_ERROR
        })
    })
}

// REGISTER NEW USER
export const register = ({ username, password, units, lang }) => dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify({ username, password, units, lang })

    axios.post('http://localhost:5000/riders', body, config)
    .then(res => dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    })
    )
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
        dispatch({
            type: REGISTER_FAIL
        })
    })
}

// USER LOGIN 
export const login = ({ username, password }) => dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify({ username, password })

    axios.post('http://localhost:5000/auth', body, config)
    .then(res => dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    })
    )
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
        dispatch({
            type: LOGIN_FAIL
        })
    })
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}


// HELPER
// Setup config/headers and token 
export const tokenConfig = getState => {
    const token = getState().auth.token 

    const config = {
        headers: {
            "Content-type": "application/json",
        }
    }

    if(token) {
        config.headers['x-auth-token'] = token 
    }

    return config
}