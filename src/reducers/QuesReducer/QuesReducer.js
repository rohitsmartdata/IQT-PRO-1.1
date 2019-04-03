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
import { answeredQuestionId } from '../../containers/PersonalDetail/index'
import {
  CREATE_QUES_SUCCESS,
  CREATE_QUES_FAIL,
  CLEAR_QUES_DATA,
  GET_QUES_SUCCESS,
  GET_QUES_FAIL,
  SAVE_QUES_SUCCESS,
  SAVE_QUES_FAIL,
  ADDFORM_QUES_SUCCESS,
  ADDFORM_QUES_FAIL,
  CREATE_HOMESCREEN_SUCCESS,
  CREATE_HOMESCREEN_FAIL,
  NO_INTERNET_CONNECTION
} from '../../actions/QuesActions/QuesActions'

const INITIAL_STATE = {
  createQuesDetails: [],
  quesDetails: [],
  diseaseList: [],
  addFormQuesDetails: []
}
var getValue = ''
export default function(state = INITIAL_STATE, action) {
  AsyncStorage.getItem('answeredQuestionArray').then(
    value => (getValue = value)
  )
  switch (action.type) {
    case CREATE_QUES_SUCCESS:
      AsyncStorage.setItem('createQuesId', action.payload._id)
      return {
        ...state,
        createQuesDetails: action.payload,
        internetCheck: false,
        loaderCheck: Math.random(),
        createQuesCheckPopPage: false
      }
    case CREATE_QUES_FAIL:
      return {
        ...state,
        isLoading: false,
        internetCheck: true,
        loaderCheck: Math.random(),
        createQuesCheckPopPage: true
      }

    case ADDFORM_QUES_SUCCESS:
      // AsyncStorage.setItem('createQuesId', action.payload._id)
      return {
        ...state,
        addFormQuesDetails: action.addFormQuesDetails,
        internetCheck: false,
        loaderCheck: Math.random(),
        createQuesCheckPopPage: false
      }
    case ADDFORM_QUES_FAIL:
      return {
        ...state,
        isLoading: false,
        internetCheck: true,
        loaderCheck: Math.random(),
        createQuesCheckPopPage: false
      }

    case GET_QUES_SUCCESS:
      return {
        ...state,
        quesDetails: action.getQuesPayload,
        createQuesDetails: '',
        saveQuesDetails: '',
        addFormQuesDetails: '',
        internetCheck: false,
        loaderCheck: Math.random(),
        createQuesCheckPopPage: false
      }

    case GET_QUES_FAIL:
      return {
        ...state,
        isLoading: false,
        internetCheck: true,
        loaderCheck: Math.random(),
        createQuesCheckPopPage: false
      }

    case SAVE_QUES_SUCCESS:
      if (action.saveQuesPayload.id) {
        return {
          ...state,
          saveQuesDetails: action.saveQuesPayload,
          quesDetails: '',
          internetCheck: false,
          loaderCheck: Math.random(),
          createQuesCheckPopPage: false
        }
      } else {
        debugger

        var answeredQuestionArray = [answeredQuestionId]

        if (getValue) {
          var value = JSON.parse(getValue)
          value.push(answeredQuestionId)
          AsyncStorage.setItem('answeredQuestionArray', JSON.stringify(value))
        } else {
          AsyncStorage.setItem(
            'answeredQuestionArray',
            JSON.stringify(answeredQuestionArray)
          )
        }

        Actions.root2({ type: ActionConst.RESET })
        return {
          ...state,
          internetCheck: false,
          loaderCheck: Math.random(),
          createQuesCheckPopPage: false
        }
      }

    case SAVE_QUES_FAIL:
      return {
        ...state,
        isLoading: false,
        internetCheck: true,
        loaderCheck: Math.random(),
        createQuesCheckPopPage: false
      }
    case CLEAR_QUES_DATA:
      return {
        ...state,
        quesDetails: '',
        internetCheck: false,
        loaderCheck: Math.random(),
        createQuesCheckPopPage: false
      }
    case NO_INTERNET_CONNECTION:
      return {
        ...state,
        internetCheck: true,
        loaderCheck: Math.random(),
        createQuesCheckPopPage: false
      }
    case CREATE_HOMESCREEN_SUCCESS:
      return {
        ...state,
        homeScreenList: action.payload,
        internetCheck: false,
        isLoading: false
      }

    case CREATE_HOMESCREEN_FAIL:
      return {
        ...state,
        homeScreenFail: false,
        internetCheck: true
      }

    default:
      return state
  }
}
