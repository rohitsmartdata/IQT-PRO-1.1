import { LOGIN } from '../../models/types'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  TextInput,
  FlatList,
  ListView,
  ScrollView,
  Image,
  AsyncStorage
} from 'react-native'
import { Actions, ActionConst } from 'react-native-router-flux'
import {
  GET_BANKID_SUCCESS,
  GET_BANKID_FAIL,
  GET_BANKID_RESPONSE_SUCCESS,
  GET_BANKID_RESPONSE_FAIL,
  GET_PERSONAL_NO_SUCCESS,
  GET_PERSONAL_NO_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  GET_STAFF_DETAIL_SUCCESS,
  NO_INTERNET_CONNECTION,
  No_BANK_ID_TOKEN,
  GET_STAFF_DETAIL_FAIL
} from '../../actions/authActions/loginActions'

const INITIAL_STATE = {
  bankIdToken: [],
  isLoading: false,
  bankIdResponse: [],
  staffUserResponse: []
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_BANKID_SUCCESS:
      debugger
      return {
        ...state,
        bankIdToken: action.abc,
        loaderCheck: Math.random(),
        bankidResponseCheck: true,
        internetCheck: false
      }
    case GET_BANKID_FAIL:
      debugger
      return {
        ...state,
        isLoading: false,
        loaderCheck: Math.random(),
        bankidResponseCheck: true,
        internetCheck: true
      }

    case GET_BANKID_RESPONSE_SUCCESS:
      return {
        ...state,
        bankIdResponse: action.bankidResponse,
        bankidResponseCheck: false,
        bankIdToken: '',
        loaderCheck: Math.random(),
        internetCheck: false
      }
    case GET_BANKID_RESPONSE_FAIL:
      return {
        ...state,
        isLoading: false,
        bankidResponseCheck: false,
        bankIdToken: '',
        loaderCheck: Math.random(),
        internetCheck: true
      }
    case LOGOUT_SUCCESS:
      debugger
      AsyncStorage.setItem('name', '')
      AsyncStorage.setItem('createQuesId', '')
      AsyncStorage.setItem('againQuesCheck', '')
      AsyncStorage.setItem('answeredQuestionArray', '')
      Actions.root1({ type: ActionConst.RESET })
      return {
        ...state,
        isLoading: false,
        logoutResponse: action.logoutResponse,
        bankIdToken: '',
        loaderCheck: Math.random(),
        internetCheck: false
      }
    case LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
        loaderCheck: Math.random(),
        internetCheck: true
      }
    case GET_PERSONAL_NO_SUCCESS:
      AsyncStorage.setItem('name', JSON.stringify(action.abc))

      Actions.root({ type: ActionConst.RESET })

      return {
        ...state,
        bankIdResponse: action.abc,
        bankidResponseCheck: false,
        bankIdToken: '',
        isLoading: false,
        internetCheck: false
      }
    case GET_PERSONAL_NO_FAIL:
      return {
        ...state,
        isLoading: false,
        loaderCheck: Math.random(),
        bankidResponseCheck: false,
        bankIdToken: '',
        personalNoLoader: false,
        internetCheck: false
      }
    case GET_STAFF_DETAIL_SUCCESS:
      AsyncStorage.setItem('name', JSON.stringify(action.abc))

      return {
        ...state,
        staffUserResponse: action.abc,
        internetCheck: false
      }
    case GET_STAFF_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        loaderCheck: Math.random(),
        internetCheck: false
      }
    case NO_INTERNET_CONNECTION:
      debugger
      return {
        ...state,
        loaderCheck: Math.random(),
        internetCheck: true
      }

    case No_BANK_ID_TOKEN:
      return {
        ...state,
        loaderCheck: Math.random(),
        bankIdToken: '',
        loaderCheck: false
      }
    default:
      return state
  }
}
