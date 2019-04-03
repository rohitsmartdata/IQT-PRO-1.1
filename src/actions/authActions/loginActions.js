import { LOGIN } from '../../models/types'
import { Actions } from 'react-native-router-flux'
import { AsyncStorage, Alert } from 'react-native'
import { SERVER_URL, LOCAL_URL } from './../../models/types.js'
import { BANKId_URL, PERSONAL_NO_URL } from '../../auth/indexApi'

export const GET_BANKID_SUCCESS = 'GET_BANKID_success'
export const GET_BANKID_FAIL = 'GET_BANKID_fail'
export const GET_BANKID_RESPONSE_SUCCESS = 'GET_BANKID_RESPONSE_success'
export const GET_BANKID_RESPONSE_FAIL = 'GET_BANKID_RESPONSE_fail'
export const GET_PERSONAL_NO_SUCCESS = 'GET_PERSONAL_NO_success'
export const GET_PERSONAL_NO_FAIL = 'GET_PERSONAL_NO_fail'
export const GET_STAFF_DETAIL_SUCCESS = 'GET_STAFF_DETAIL_success'
export const NO_INTERNET_CONNECTION = 'NO_INTERNET_connection'
export const No_BANK_ID_TOKEN = 'No_BANK_ID_token '
export const GET_STAFF_DETAIL_FAIL = 'GET_STAFF_DETAIL_fail'
export const LOGOUT_SUCCESS = 'LOGOUT_success'
export const LOGOUT_FAIL = 'LOGOUT_fail'

export const login = () => {
  return function(dispatch) {
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(BANKId_URL, request)
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
            type: GET_BANKID_SUCCESS,
            abc: responseJson
          })
        }
      })
      .catch(error => {
        console.log(error)
        // alert(error)

        dispatch({
          type: GET_BANKID_FAIL
        })
      })
  }
}

export const loginResponse = urlString => {
  return function(dispatch) {
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(urlString, request)
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
            type: GET_BANKID_RESPONSE_SUCCESS,
            bankidResponse: responseJson
          })
        }
      })
      .catch(error => {
        console.log(error)
        alert('Please auth through BankId App' + error)
        dispatch({
          type: GET_BANKID_RESPONSE_FAIL
        })
      })
  }
}

export const personalNoLogin = (value, containerPage) => {
  debugger
  return function(dispatch) {
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch(PERSONAL_NO_URL + value, request)
      .then(function(response) {
        console.log('REsponse', response)
        // if (response.status !== 200) {
        //   alert('You have entered wrong Personal Number')
        // }
        return response.json()
      })
      .then(responseJson => {
        if (containerPage == 'PersonalNumber') {
          if (responseJson.http_status) {
            // throw new Error(responseJson.message)
            // alert('Please enter correct Personal No')
            dispatch({
              type: GET_PERSONAL_NO_FAIL
            })
          } else {
            dispatch({
              type: GET_PERSONAL_NO_SUCCESS,
              abc: responseJson
            })
          }
        } else {
          if (responseJson.http_status) {
            // throw new Error(responseJson.message)
            // alert('Please enter correct Personal No')
            dispatch({
              type: GET_STAFF_DETAIL_FAIL
            })
          } else {
            dispatch({
              type: GET_STAFF_DETAIL_SUCCESS,
              abc: responseJson
            })
          }
        }
      })
      .catch(error => {
        console.log(error)
        dispatch({
          type: NO_INTERNET_CONNECTION
        })
      })
  }
}

export const logout = apiValue => {
  return function(dispatch) {
    const request = {
      method: 'PUT',

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
            type: LOGOUT_SUCCESS,
            logoutResponse: responseJson
          })
        }
      })
      .catch(error => {
        console.log(error)
        alert(error)
        dispatch({
          type: LOGOUT_FAIL
        })
      })
  }
}
export const clearQRData = () => {
  return {
    type: No_BANK_ID_TOKEN
  }
}
