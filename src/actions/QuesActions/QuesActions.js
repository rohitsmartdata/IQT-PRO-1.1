import { QUES_URL } from '../../auth/indexApi'
import { Alert } from 'react-native'
import {
  CREATE_DISEASE_LIST,
  CREATE_HOMESCREEN_LIST
} from '../../auth/indexApi'
export const CREATE_QUES_SUCCESS = 'CREATE_QUES_success'
export const CREATE_QUES_FAIL = 'CREATE_QUES_fail'
export const GET_QUES_SUCCESS = 'GET_QUES_success'
export const GET_QUES_FAIL = 'GET_QUES_fail'
export const SAVE_QUES_SUCCESS = 'SAVE_QUES_success'
export const SAVE_QUES_FAIL = 'SAVE_QUES_fail'
export const CREATE_HOMESCREEN_SUCCESS = 'CREATE_HOMESCREEN_success'
export const CREATE_HOMESCREEN_FAIL = 'CREATE_HOMESCREEN_fail'
export const NO_INTERNET_CONNECTION = 'NO_INTERNET_connection'
export const CLEAR_QUES_DATA = 'CLEAR_QUES_data'

export const ADDFORM_QUES_SUCCESS = 'ADDFORM_QUES_success'
export const ADDFORM_QUES_FAIL = 'ADDFORM_QUES_fail'

export const createQues = requestJSON => {
  return function(dispatch) {
    const request = {
      method: 'POST',
      body: requestJSON,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(CREATE_DISEASE_LIST, request)
      .then(function(response) {
        console.log('REsponse', response)
        if (response.status !== 200) {
          throw new Error(response.json())
        }
        return response.json()
      })
      .then(responseJson => {
        if (responseJson._id == '') {
          throw new Error(responseJson.message)
        } else {
          dispatch({
            type: CREATE_QUES_SUCCESS,
            payload: responseJson
          })
        }
      })
      .catch(error => {
        console.log(error)

        dispatch({
          type: CREATE_QUES_FAIL
        })
      })
  }
}

export const addForm = requestJSON => {
  return function(dispatch) {
    const request = {
      method: 'POST',
      body: requestJSON,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(CREATE_DISEASE_LIST, request)
      .then(function(response) {
        console.log('REsponse', response)
        if (response.status !== 200) {
          throw new Error(response.json())
        }
        return response.json()
      })
      .then(responseJson => {
        if (responseJson._id == '') {
          throw new Error(responseJson.message)
        } else {
          dispatch({
            type: ADDFORM_QUES_SUCCESS,
            addFormQuesDetails: responseJson
          })
        }
      })
      .catch(error => {
        console.log(error)

        dispatch({
          type: ADDFORM_QUES_FAIL
        })
      })
  }
}

export const getQues = apiValue => {
  return function(dispatch) {
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(apiValue, request)
      .then(function(response) {
        console.log('REsponse', response)
        if (response.status !== 200) {
          throw new Error(response.json())
        }
        return response.json()
      })
      .then(responseJson => {
        if (responseJson._id == '') {
          throw new Error(responseJson.message)
        } else {
          dispatch({
            type: GET_QUES_SUCCESS,
            getQuesPayload: responseJson
          })
        }
      })
      .catch(error => {
        console.log(error)

        dispatch({
          type: GET_QUES_FAIL
        })
      })
  }
}

export const saveQues = (requestJSON, apiValue) => {
  return function(dispatch) {
    const request = {
      method: 'PUT',
      body: requestJSON,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(apiValue, request)
      .then(function(response) {
        console.log('REsponse', response)
        if (response.status !== 200) {
          throw new Error(response.json())
        }
        return response.json()
      })
      .then(responseJson => {
        if (responseJson._id == '') {
          throw new Error(responseJson.message)
        } else {
          dispatch({
            type: SAVE_QUES_SUCCESS,
            saveQuesPayload: responseJson
          })
        }
      })
      .catch(error => {
        console.log(error)

        dispatch({
          type: SAVE_QUES_FAIL
        })
      })
  }
}

export const getHomeScreenList = requestJSON => {
  return function(dispatch) {
    const request = {
      method: 'GET',
      body: requestJSON,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(CREATE_HOMESCREEN_LIST, request)
      .then(function(response) {
        console.log('REsponse', response)
        if (response.status !== 200) {
          throw new Error(response.json())
        }
        return response.json()
      })
      .then(responseJson => {
        if (responseJson._id == '') {
          throw new Error(responseJson.message)
        } else {
          dispatch({
            type: CREATE_HOMESCREEN_SUCCESS,
            payload: responseJson
          })
        }
      })
      .catch(error => {
        console.log(error)

        dispatch({
          type: CREATE_HOMESCREEN_FAIL
        })
      })
  }
}

export const clearQuesData = () => {
  return {
    type: CLEAR_QUES_DATA
  }
}
