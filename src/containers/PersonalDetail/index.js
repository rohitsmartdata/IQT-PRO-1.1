import React, { Component } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native'
import {
  Card,
  Item,
  List,
  ListItem,
  Spinner,
  Tab,
  Tabs,
  Thumbnail,
  Button
} from 'native-base'
import UserInactivity from 'react-native-user-inactivity'
import { globalStyle } from '../../constants/GlobalStyleSheet.js'
import { CheckBox } from 'react-native-elements'
import { Input } from 'native-base'
import { Actions, ActionConst } from 'react-native-router-flux'
import { RightButton } from '../../components/RightButton'
import SplashScreen from 'react-native-splash-screen'
import Icon from 'react-native-vector-icons/Ionicons'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { strings } from '../../constants/strings'
import {
  createQues,
  clearQuesData,
  saveQues,
  getQues,
  addForm
} from '../../actions/QuesActions/QuesActions'
import { login, loginResponse } from '../../actions/authActions/loginActions'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader'
import Modal from 'react-native-modal'
import { NetworkInfo } from 'react-native-network-info'
import { NativeModules, AppState } from 'react-native'
import QRCode from 'react-native-qrcode'
import { LogoutModal, AboutModal } from '../../constants/Modal.js'
import CalendarPicker from 'react-native-calendar-picker'
import { DateSelection } from '../DateSelection/index'
import countriesData from '../../constants/countries.json'

import DropdownAlert from 'react-native-dropdownalert'
const { height, width } = Dimensions.get('window')
const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height

const toNumber = str => Number(str)
const mapStateToProps = ({ QuesReducer, BankIdReducer }) => {
  return {
    quesDetails: QuesReducer.quesDetails,
    saveQuesDetails: QuesReducer.saveQuesDetails,
    addFormQuesDetails: QuesReducer.addFormQuesDetails,
    createQuesDetails: QuesReducer.createQuesDetails,
    bankIdToken: BankIdReducer.bankIdToken,
    autoStartToken: BankIdReducer.autoStartToken,
    bankIdResponse: BankIdReducer.bankIdResponse,
    bankidResponseCheck: BankIdReducer.bankidResponseCheck,
    loaderCheck: QuesReducer.loaderCheck,
    internetCheck: QuesReducer.internetCheck,
    createQuesCheckPopPage: QuesReducer.createQuesCheckPopPage
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createQues,
      getQues,
      saveQues,
      clearQuesData,
      login,
      loginResponse,
      addForm
    },
    dispatch
  )
}
/**
 * @quesDeails: this variable is used to store all question's array form api.
 */
var quesDetails
/**
 * @userQues: this array is used to store questions form server.
 */
var userQues = []

/**
 * @showQues: this array is used to show questions to user one by one.
 */
var showQues = []

/**
 * @userQues: this array is used to store sub questions form server.
 */
var subUserQues = []

/**
 * @showQues: this array is used to show sub questions to user one by one.
 */
var subShowQues = []
/**
 * @userQuesArrIndex: this variable represents the index of question for users.
 * By default index is 0
 */
var userQuesArrIndex = 0

/**
 * @previousAnsArr: this array is used to store the previous answered question with result.
 */

var previousAnsArr = []
/**
 * @language: this variable is used to store the selected language .
 */
var language = ''

/**
 * @language: this variable is used to store the selected language name .
 */



export var answeredQuestionId = '1'

var languageName = ''
var flag = require('../../images/flagBritish.png')
/**
 * @outputArr:Represents an array represents output of snomed code.
 */
var outputArr = {}
var languageList = [
  {
    languages: { en: 'English', sv: 'English' },
    code: 'en',
    status: true,
    flagImage: require('../../images/flagBritish.png')
  },

  {
    languages: { en: 'Svenska', sv: 'Svenska' },
  
    code: 'sv',
    status: false,
    flagImage: require('../../images/flagSwedish.png')
  }
]
var nestedArrCheck = []
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dateFormat = 'YYYY-MM-DD'
const minDate = new Date()
class PersonalDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: ds.cloneWithRows(userQues),
      dataSource1: ds.cloneWithRows(userQues),
      dataSource2: ds.cloneWithRows(userQues),
      phnNo: '',
      homeNo: '',
      email: '',
      selectedColor: '#61666B',
      test: '',
      checked: true,
      botReply: false,
      submitForm: false,
      fname: '',
      backBtnValidation: true,
      backBtnOpacity: '#fff',
      quesDetailsCheck: true,
      subQuesCheck: false,
      btnValidation: true,
      message: '',
      languageModal: false,
      sublabelCheckUi: true,
      switchBtnValue: false,
      timeValue: 0,
      pointerEvents: 'auto',
      switchBtnValueCheck: true,
      autoStartToken: 'abc',
      bubbleSize: 0,
      orderRef: '',
      appState: AppState.currentState,
      bankIdForegroungCheck: false,
      opacity: 1,
      loadingAuth: false,
      QRtext: '',
      QRSize: 0,
      apiValue: this.props.apiValue,
      userDetails: '',
      quesId: '',
      createQuesId: '',
      againQuesCheck: '',
      active: true,
      text: '180000',
      nestedArrCheckBool: '',
      nestedArrCheckStringStatus: '',
      selectedStartDate: 'YYYY/MM/DD',
      calendarModel: false,
      severSelectedStartDate: 'YYYY/MM/DD',
      data: countriesData.data,
      selected: ''
    }
    this.onDateChange = this.onDateChange.bind(this)
    this._renderItem = this._renderItem.bind(this)
    this.searchCountry = this.searchCountry.bind(this)
  }

  /**
   * @onDateChange: This function performs actions on change in date from calendar.
   * @param {represents the latest date we receive from calendar} date
   */
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
      severSelectedStartDate: date.toString()
    })
    showQues[0].status = date.toString()
    userQues[userQuesArrIndex - 1].status = date.toString()
    this.btnValidation()
  }
  /**
   * @formatDate: This function is used to format global date.
   * @param {represents the global format of date  } date
   */
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  /**
   *
   * @selectDate: This function represents the action performed on click from calendar
   */
  selectDate() {
    
    if (this.state.selectedStartDate == 'YYYY/MM/DD') {
      this.dropdown.alertWithType(
        'success',
        strings.notification,
        strings.selectDate
      )
    } else {
      var date = this.formatDate(this.state.selectedStartDate.toString())

      this.setState({ calendarModel: false, selectedStartDate: date })
    }
  }
  _selectedItem(item) {
    this.setState({ selected: item })
    showQues[0].status = item.name
    userQues[userQuesArrIndex - 1].status = item.name
    this.btnValidation()
  }

  _renderItem(item, index) {
    return (
      <TouchableOpacity
        onPress={() => this._selectedItem(item)}
        style={globalStyle.row}>
        <View style={globalStyle.radioButton}>
          {item === this.state.selected ? (
            <Icon name="ios-radio-button-on" size={25} color="#83BFBC" />
          ) : (
            <Icon
              name="ios-radio-button-off-outline"
              size={25}
              color="#94989C"
            />
          )}
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={globalStyle.optionText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  searchCountry(search) {
    
    if (search === '') {
      this.setState({ data: countriesData.data })
    } else {
      let data = []
      countriesData.data.map((item, index) => {
        let strng = item.name.toLowerCase()
        var countryString = false
        for (i = 0; i < search.length; i++) {
          var countryData = item.name.toLowerCase()
          var enterData = search.toLowerCase()
          if (countryData[i] == enterData[i]) {
            countryString = true
          } else {
            countryString = false
            break
          }
        }
        // if (item.name.toLowerCase().search(search.toLowerCase()) != -1)
        if (countryString) {
          data.push(item)
        }
      })
      this.setState({ data: data })
    }
  }
  onAction = active => {
    if (active) {
    } else {
      debugger
      if (Actions.currentScene == 'PersonalDetail') {
        AsyncStorage.setItem('name', '')
        AsyncStorage.setItem('createQuesId', '')
        AsyncStorage.setItem('againQuesCheck', '')
        AsyncStorage.setItem('answeredQuestionArray', '')
        Actions.root1({ type: ActionConst.RESET })
      }
    }
  }
  /**
   * @banIdAuth: this function is user for authentication of user through bank iD
   */

  bankIdToken() {
    this.setState({
      bubbleSize: 15,
      opacity: 0,
      loadingAuth: true
    })
    this.props.login()
  }

  bankIdAuth(token, orderRef) {
    let url2 =
      'https://app.bankid.com/?autostarttoken=' +
      token +
      '&redirect=iqform://?orderRef=' +
      orderRef
    var CalendarManager = NativeModules.CalendarManager

    CalendarManager.checkBankRoll(url2)
  }

  /**
   * @previousAnsArrFun:  this function conssts of functionality to store/push previous question with ans to previousAnsArr array.
   */
  previousAnsArrFun() {
    if (userQues.length == 1 || userQues.length == 0) {
    } else {
      if (userQuesArrIndex >= 2) {
        previousAnsArr.pop()
        switch (userQues[userQuesArrIndex - 2].type) {
          case 'multiselect':
          case 'compoundcheckbox':
          case 'select':
          case 'radio':
          case 'compoundradio':
            previousAnsArr.push({
              uuid: userQues[userQuesArrIndex - 2].uuid,

              options: userQues[userQuesArrIndex - 2].options,
              label: userQues[userQuesArrIndex - 2].label,
              help: userQues[userQuesArrIndex - 2].help,
              id: userQues[userQuesArrIndex - 2].id,
              subType: userQues[userQuesArrIndex - 2].subType,
              type: userQues[userQuesArrIndex - 2].type,
              sublabels: userQues[userQuesArrIndex - 2].sublabels
            })
            break

          case 'input':
            previousAnsArr.push({
              uuid: userQues[userQuesArrIndex - 2].uuid,
              label: userQues[userQuesArrIndex - 2].label,
              help: userQues[userQuesArrIndex - 2].help,
              id: userQues[userQuesArrIndex - 2].id,
              status: userQues[userQuesArrIndex - 2].status,
              quesType: userQues[userQuesArrIndex - 2].quesType,
              subType: userQues[userQuesArrIndex - 2].subType,
              type: userQues[userQuesArrIndex - 2].type,
              sublabels: userQues[userQuesArrIndex - 2].sublabels
            })
            break
          case 'datepicker':
            previousAnsArr.push({
              uuid: userQues[userQuesArrIndex - 2].uuid,
              label: userQues[userQuesArrIndex - 2].label,
              help: userQues[userQuesArrIndex - 2].help,
              id: userQues[userQuesArrIndex - 2].id,
              status: userQues[userQuesArrIndex - 2].status,
              quesType: userQues[userQuesArrIndex - 2].quesType,
              subType: userQues[userQuesArrIndex - 2].subType,
              type: userQues[userQuesArrIndex - 2].type,
              sublabels: userQues[userQuesArrIndex - 2].sublabels
            })
            break
          case 'countries':
            previousAnsArr.push({
              uuid: userQues[userQuesArrIndex - 2].uuid,
              label: userQues[userQuesArrIndex - 2].label,
              help: userQues[userQuesArrIndex - 2].help,
              id: userQues[userQuesArrIndex - 2].id,
              status: userQues[userQuesArrIndex - 2].status,
              quesType: userQues[userQuesArrIndex - 2].quesType,
              subType: userQues[userQuesArrIndex - 2].subType,
              type: userQues[userQuesArrIndex - 2].type,
              sublabels: userQues[userQuesArrIndex - 2].sublabels
            })
            break
        }

        this.setState({
          dataSource2: ds.cloneWithRows(previousAnsArr[0].sublabels)
        })
      } else {
        previousAnsArr.pop()
      }
    }
  }

  /**
   * @nextQues: This function reperents the functionality of next button for further questions in the app.
   */

  nextQues() {
    this.setState({ selectedStartDate: 'YYYY/MM/DD' })
    if (this.state.subQuesCheck) {
    } else {
      if (userQues.length > userQuesArrIndex) {
        this.setState({
          botReply: true,
          btnValidation: true,
          pointerEvents: 'none'
        })

        setTimeout(() => {
          this.setState({ botReply: false })

          this.showQuesFun(userQues)
          this.previousAnsArrFun()
          this.backButtonValidation()
          this.btnValidation()
          this.setState({
            message: '',
            pointerEvents: 'auto',
            severSelectedStartDate: 'YYYY/MM/DD'
          })
        }, 2000)
      } else {
        if (this.state.switchBtnValue) {
          this.submitForm()
        }
      }
    }
  }

  /**
   * @backButtonValidation: This function represents the validation to show or hide back button.
   */

  backButtonValidation() {
    if (userQuesArrIndex == '1') {
      this.setState({ backBtnOpacity: '#fff', backBtnValidation: true })
    } else {
      this.setState({ backBtnOpacity: '#61666B', backBtnValidation: false })
    }
  }

  /**
   * @backQues: This function represents the functionality of Back button to go back to last answered question.
   */

  backQues() {
    this.setState({ botReply: true })

    setTimeout(() => {
      userQuesArrIndex = userQuesArrIndex - 2

      if (userQues.length - 1 == userQuesArrIndex) {
        this.setState({ submitForm: true })
      } else {
        this.setState({ submitForm: false })
      }
      this.setState({ botReply: false })
      this.showQuesFun(userQues)
      this.previousAnsArrFun()
      this.btnValidation()
      this.backButtonValidation()
    }, 2000)
  }

  /**
   *
   * @param {Represents the index of sublabels} index1
   * @param {Represents the index of options} index2
   * @param {Represents the sublabel array } subData
   * @sublabelCheckboxFun: This function is called when clicked from sublabel's checkbox.
   */
  sublabelCheckboxFun(index1, index2, subData) {
    showQues[0].sublabels[index1].options[index2].status = !subData[index2]
      .status

    showQues
    this.setState({ dataSource1: ds.cloneWithRows(showQues[0].sublabels) })
    this.btnValidation()
  }

  /**
   *
   * @param {Represents the index of sublabels} index1
   * @param {Represents the index of options} index2
   * @param {Represents the sublabel array } subData
   * @sublabelCheckboxFun: This function is called when clicked from sublabel's radio-button.
   */
  sublabelRadiobtnFun(index1, index2, subData) {
    for (let i = 0; i < showQues[0].sublabels[index1].options.length; i++) {
      if (i == index2) {
        showQues[0].sublabels[index1].options[i].status = true
      } else {
        showQues[0].sublabels[index1].options[i].status = false
      }
    }

    showQues
    this.setState({ dataSource1: ds.cloneWithRows(showQues[0].sublabels) })
    this.btnValidation()
  }

  /**
   *
   * @param {Represents the index of selected checkbox} index
   * @param {Represents the array of checkbox question} subData
   *
   * @checkboxFun : This function represents the check-box functionality of selected checkbox and to get further sub-questions for that selected checkbox.
   */
  checkboxFun(index, subData) {
    showQues[0].options[index].status = !subData[index].status

    this.setState({ dataSource: ds.cloneWithRows(showQues) })
    if (subData[index].status) {
      if (subData[index].questions.length > 0) {
        //  this.setState({ subQuesCheck: true })

        for (i = subData[index].questions.length - 1; i >= 0; i--) {
          if (
            subData[index].questions[i].type == 'input' ||
            subData[index].questions[i].type == 'datepicker' ||
            subData[index].questions[i].type == 'countries'
          ) {
            if (subData[index].questions[i].status) {
              userQues.splice(userQuesArrIndex, 0, {
                uuid: subData[index].questions[i].uuid,
                outputId:
                  userQues[userQuesArrIndex - 1].uuid +
                  '_' +
                  subData[index].key,
                subQues: true,
                label: subData[index].questions[i].label,
                help: subData[index].questions[i].help,
                status: subData[index].questions[i].status,
                quesType: subData[index].questions[i].quesType,
                id: subData[index].questions[i].id,
                subType: subData[index].questions[i].subType,
                type: subData[index].questions[i].type,
                sublabels: []
              })
            } else {
              userQues.splice(userQuesArrIndex, 0, {
                uuid: subData[index].questions[i].uuid,
                outputId:
                  userQues[userQuesArrIndex - 1].uuid +
                  '_' +
                  subData[index].key,
                subQues: true,
                label: subData[index].questions[i].label,
                help: subData[index].questions[i].help,
                status: '',
                quesType: 'subQues',
                id: subData[index].questions[i].id,
                subType: subData[index].questions[i].subType,
                type: subData[index].questions[i].type,
                sublabels: []
              })
            }
          } else {
            var localOptions = []
            var subLabelArr = []
            var sublabelCheckUi = true

            if (subData[index].questions[i].sublabels) {
              sublabelCheckUi = true
              for (
                let l = 0;
                l < subData[index].questions[i].sublabels.length;
                l++
              ) {
                if (
                  subData[index].questions[i].sublabels[l].label.en ==
                  subData[index].questions[i].options[0].value.en
                ) {
                  sublabelCheckUi = false
                } else {
                }
              }

              if (sublabelCheckUi) {
                for (
                  let k = 0;
                  k < subData[index].questions[i].sublabels.length;
                  k++
                ) {
                  let localOptions = []
                  for (
                    j = 0;
                    j < subData[index].questions[i].options.length;
                    j++
                  ) {
                    var localOptionsValue = {
                      sct: '',
                      questions: [],
                      key: '',
                      value: '',
                      status: '',
                      quesType: ''
                    }
                    localOptionsValue.sct =
                      subData[index].questions[i].options[j].sct
                    localOptionsValue.key =
                      subData[index].questions[i].options[j].key
                    localOptionsValue.value =
                      subData[index].questions[i].options[j].value
                    ;(localOptionsValue.status = false),
                      (localOptionsValue.quesType = 'subQues')

                    if (subData[index].questions[i].options[j].questions) {
                      localOptionsValue.questions =
                        subData[index].questions[i].options[j].questions
                    }
                    localOptions.push(localOptionsValue)
                  }
                  subLabelArr.push({
                    label: subData[index].questions[i].sublabels[k].label,
                    id: subData[index].questions[i].sublabels[k].id,
                    sct: subData[index].questions[i].sublabels[k].sct,
                    options: localOptions
                  })
                }
              } else {
                for (
                  j = 0;
                  j < subData[index].questions[i].options.length;
                  j++
                ) {
                  var localOptionsValue = {
                    sct: '',
                    questions: [],
                    key: '',
                    value: '',
                    status: '',
                    quesType: ''
                  }
                  localOptionsValue.sct =
                    subData[index].questions[i].options[j].sct
                  localOptionsValue.key =
                    subData[index].questions[i].options[j].key
                  localOptionsValue.value =
                    subData[index].questions[i].options[j].value
                  ;(localOptionsValue.status = false),
                    (localOptionsValue.quesType = 'subQues')

                  if (subData[index].questions[i].options[j].questions) {
                    localOptionsValue.questions =
                      subData[index].questions[i].options[j].questions
                  }
                  localOptions.push(localOptionsValue)
                }
              }
            } else {
              for (j = 0; j < subData[index].questions[i].options.length; j++) {
                var localOptionsValue = {
                  sct: '',
                  questions: [],
                  key: '',
                  value: '',
                  status: '',
                  quesType: ''
                }
                localOptionsValue.sct =
                  subData[index].questions[i].options[j].sct
                localOptionsValue.key =
                  subData[index].questions[i].options[j].key
                localOptionsValue.value =
                  subData[index].questions[i].options[j].value
                ;(localOptionsValue.status = false),
                  (localOptionsValue.quesType = 'subQues')

                if (subData[index].questions[i].options[j].questions) {
                  localOptionsValue.questions =
                    subData[index].questions[i].options[j].questions
                }
                localOptions.push(localOptionsValue)
              }
            }

            switch (subData[index].questions[i].type) {
              case 'multiselect':
              case 'compoundcheckbox':
              case 'select':
              case 'radio':
              case 'compoundradio':
                userQues.splice(userQuesArrIndex, 0, {
                  uuid: subData[index].questions[i].uuid,
                  outputId:
                    userQues[userQuesArrIndex - 1].uuid +
                    '_' +
                    subData[index].key,
                  subQues: true,
                  options: localOptions,
                  label: subData[index].questions[i].label,
                  help: subData[index].questions[i].help,
                  id: subData[index].questions[i].id,
                  subType: subData[index].questions[i].subType,
                  type: subData[index].questions[i].type,
                  sublabels: subLabelArr
                })
                break

              case 'input':
                if (subData[index].questions[i].status) {
                  userQues.splice(userQuesArrIndex, 0, {
                    uuid: subData[index].questions[i].uuid,
                    outputId:
                      userQues[userQuesArrIndex - 1].uuid +
                      '_' +
                      subData[index].key,
                    subQues: true,
                    label: subData[index].questions[i].label,
                    help: subData[index].questions[i].help,
                    id: subData[index].questions[i].id,
                    status: subData[index].questions[i].status,
                    quesType: subData[index].questions[i].quesType,
                    subType: subData[index].questions[i].subType,
                    type: subData[index].questions[i].type,
                    sublabels: subLabelArr
                  })
                } else {
                  userQues.splice(userQuesArrIndex, 0, {
                    uuid: subData[index].questions[i].uuid,
                    outputId:
                      userQues[userQuesArrIndex - 1].uuid +
                      '_' +
                      subData[index].key,
                    subQues: true,
                    label: subData[index].questions[i].label,
                    help: subData[index].questions[i].help,
                    id: subData[index].questions[i].id,
                    status: '',
                    quesType: 'subQues',
                    subType: subData[index].questions[i].subType,
                    type: subData[index].questions[i].type,
                    sublabels: subLabelArr
                  })
                }
                break
              case 'datepicker':
                if (subData[index].questions[i].status) {
                  userQues.splice(userQuesArrIndex, 0, {
                    uuid: subData[index].questions[i].uuid,
                    outputId:
                      userQues[userQuesArrIndex - 1].uuid +
                      '_' +
                      subData[index].key,
                    subQues: true,
                    label: subData[index].questions[i].label,
                    help: subData[index].questions[i].help,
                    id: subData[index].questions[i].id,
                    status: subData[index].questions[i].status,
                    quesType: subData[index].questions[i].quesType,
                    subType: subData[index].questions[i].subType,
                    type: subData[index].questions[i].type,
                    sublabels: subLabelArr
                  })
                } else {
                  userQues.splice(userQuesArrIndex, 0, {
                    uuid: subData[index].questions[i].uuid,
                    outputId:
                      userQues[userQuesArrIndex - 1].uuid +
                      '_' +
                      subData[index].key,
                    subQues: true,
                    label: subData[index].questions[i].label,
                    help: subData[index].questions[i].help,
                    id: subData[index].questions[i].id,
                    status: '',
                    quesType: 'subQues',
                    subType: subData[index].questions[i].subType,
                    type: subData[index].questions[i].type,
                    sublabels: subLabelArr
                  })
                }
                break
              case 'countries':
                if (subData[index].questions[i].status) {
                  userQues.splice(userQuesArrIndex, 0, {
                    uuid: subData[index].questions[i].uuid,
                    outputId:
                      userQues[userQuesArrIndex - 1].uuid +
                      '_' +
                      subData[index].key,
                    subQues: true,
                    label: subData[index].questions[i].label,
                    help: subData[index].questions[i].help,
                    id: subData[index].questions[i].id,
                    status: subData[index].questions[i].status,
                    quesType: subData[index].questions[i].quesType,
                    subType: subData[index].questions[i].subType,
                    type: subData[index].questions[i].type,
                    sublabels: subLabelArr
                  })
                } else {
                  userQues.splice(userQuesArrIndex, 0, {
                    uuid: subData[index].questions[i].uuid,
                    outputId:
                      userQues[userQuesArrIndex - 1].uuid +
                      '_' +
                      subData[index].key,
                    subQues: true,
                    label: subData[index].questions[i].label,
                    help: subData[index].questions[i].help,
                    id: subData[index].questions[i].id,
                    status: '',
                    quesType: 'subQues',
                    subType: subData[index].questions[i].subType,
                    type: subData[index].questions[i].type,
                    sublabels: subLabelArr
                  })
                }
                break
            }
          }
        }
      } else {
        this.setState({ subQuesCheck: false })
      }
    } else {
      if (subData[index].questions.length > 0) {
        for (i = 0; i < userQues.length; i++) {
          for (j = 0; j < subData[index].questions.length; j++) {
            if (userQues[i].uuid == subData[index].questions[j].uuid) {
              if (subData[index].questions[j].options) {
                for (
                  let k = 0;
                  k < subData[index].questions[j].options.length;
                  k++
                ) {
                  if (subData[index].questions[j].options[k].questions) {
                    for (
                      let l = 0;
                      l <
                      subData[index].questions[j].options[k].questions.length;
                      l++
                    ) {
                      for (let i = 0; i < userQues.length; i++) {
                        if (
                          userQues[i].uuid ==
                          subData[index].questions[j].options[k].questions[l]
                            .uuid
                        ) {
                          userQues.splice(i, 1)
                        }
                      }
                    }
                  } else {
                  }
                }
              }
              userQues.splice(i, 1)
            }
          }
        }
      } else {
      }
    }

    this.setState({ email: '' })
    this.btnValidation()
    if (this.state.switchBtnValueCheck) {
      if (this.state.switchBtnValue) {
        setTimeout(() => {
          this.setState({ switchBtnValueCheck: true })
          if (this.state.btnValidation) {
          } else {
            this.btnValidation()
            this.nextQues()
          }
        }, this.state.timeValue * 1000)
      } else {
        this.btnValidation()
      }
    }
    this.setState({ switchBtnValueCheck: false })
  }

  /**
   *
   * @param {Represents the index of selected radio button} index
   * @param {Represents the array of radio button question} subData
   *
   * @radioBtnFun:  This function represents the radio button functionality of selected checkbox and to get further sub-questions for that selected radio button.
   */
  radioBtnFun(index, subData) {
    // this.setState({ btnValidation: false })
    for (let i = 0; i < subData.length; i++) {
      if (i == index) {
        showQues[0].options[i].status = true

        if (subData[index].questions.length > 0) {
          //  this.setState({ subQuesCheck: true })

          for (let i = subData[index].questions.length - 1; i >= 0; i--) {
            if (
              subData[index].questions[i].type == 'input' ||
              subData[index].questions[i].type == 'datepicker' ||
              subData[index].questions[i].type == 'countries'
            ) {
              if (subData[index].questions[i].status) {
                userQues.splice(userQuesArrIndex, 0, {
                  uuid: subData[index].questions[i].uuid,
                  outputId:
                    userQues[userQuesArrIndex - 1].uuid +
                    '_' +
                    subData[index].key,
                  subQues: true,
                  label: subData[index].questions[i].label,
                  help: subData[index].questions[i].help,
                  status: subData[index].questions[i].status,
                  quesType: subData[index].questions[i].quesType,
                  id: subData[index].questions[i].id,
                  subType: subData[index].questions[i].subType,
                  type: subData[index].questions[i].type,
                  sublabels: []
                })
              } else {
                userQues.splice(userQuesArrIndex, 0, {
                  uuid: subData[index].questions[i].uuid,
                  outputId:
                    userQues[userQuesArrIndex - 1].uuid +
                    '_' +
                    subData[index].key,
                  subQues: true,
                  label: subData[index].questions[i].label,
                  help: subData[index].questions[i].help,
                  status: '',
                  quesType: 'subQues',
                  id: subData[index].questions[i].id,
                  subType: subData[index].questions[i].subType,
                  type: subData[index].questions[i].type,
                  sublabels: []
                })
              }
            } else {
              var localOptions = []
              var subLabelArr = []
              var sublabelCheckUi = true

              if (subData[index].questions[i].sublabels) {
                sublabelCheckUi = true
                for (
                  let l = 0;
                  l < subData[index].questions[i].sublabels.length;
                  l++
                ) {
                  if (
                    subData[index].questions[i].sublabels[l].label.en ==
                    subData[index].questions[i].options[0].value.en
                  ) {
                    sublabelCheckUi = false
                  } else {
                  }
                }

                if (sublabelCheckUi) {
                  for (
                    let k = 0;
                    k < subData[index].questions[i].sublabels.length;
                    k++
                  ) {
                    let localOptions = []
                    for (
                      let j = 0;
                      j < subData[index].questions[i].options.length;
                      j++
                    ) {
                      var localOptionsValue = {
                        sct: '',
                        questions: [],
                        key: '',
                        value: '',
                        status: '',
                        quesType: ''
                      }
                      localOptionsValue.sct =
                        subData[index].questions[i].options[j].sct
                      localOptionsValue.key =
                        subData[index].questions[i].options[j].key
                      localOptionsValue.value =
                        subData[index].questions[i].options[j].value
                      ;(localOptionsValue.status = false),
                        (localOptionsValue.quesType = 'subQues')

                      if (subData[index].questions[i].options[j].questions) {
                        localOptionsValue.questions =
                          subData[index].questions[i].options[j].questions
                      } else {
                      }
                      localOptions.push(localOptionsValue)
                    }

                    subLabelArr.push({
                      label: subData[index].questions[i].sublabels[k].label,
                      id: subData[index].questions[i].sublabels[k].id,
                      sct: subData[index].questions[i].sublabels[k].sct,
                      options: localOptions
                    })
                  }
                } else {
                  for (
                    let j = 0;
                    j < subData[index].questions[i].options.length;
                    j++
                  ) {
                    var localOptionsValue = {
                      sct: '',
                      questions: [],
                      key: '',
                      value: '',
                      status: '',
                      quesType: ''
                    }
                    localOptionsValue.sct =
                      subData[index].questions[i].options[j].sct
                    localOptionsValue.key =
                      subData[index].questions[i].options[j].key
                    localOptionsValue.value =
                      subData[index].questions[i].options[j].value
                    ;(localOptionsValue.status = false),
                      (localOptionsValue.quesType = 'subQues')

                    if (subData[index].questions[i].options[j].questions) {
                      localOptionsValue.questions =
                        subData[index].questions[i].options[j].questions
                    } else {
                    }
                    localOptions.push(localOptionsValue)
                  }
                }
              } else {
                for (
                  let j = 0;
                  j < subData[index].questions[i].options.length;
                  j++
                ) {
                  var localOptionsValue = {
                    sct: '',
                    questions: [],
                    key: '',
                    value: '',
                    status: '',
                    quesType: ''
                  }
                  localOptionsValue.sct =
                    subData[index].questions[i].options[j].sct
                  localOptionsValue.key =
                    subData[index].questions[i].options[j].key
                  localOptionsValue.value =
                    subData[index].questions[i].options[j].value
                  ;(localOptionsValue.status = false),
                    (localOptionsValue.quesType = 'subQues')

                  if (subData[index].questions[i].options[j].questions) {
                    localOptionsValue.questions =
                      subData[index].questions[i].options[j].questions
                  } else {
                  }
                  localOptions.push(localOptionsValue)
                }
              }

              switch (subData[index].questions[i].type) {
                case 'multiselect':
                case 'compoundcheckbox':
                case 'select':
                case 'radio':
                case 'compoundradio':
                  userQues.splice(userQuesArrIndex, 0, {
                    uuid: subData[index].questions[i].uuid,
                    outputId:
                      userQues[userQuesArrIndex - 1].uuid +
                      '_' +
                      subData[index].key,
                    subQues: true,

                    options: localOptions,
                    label: subData[index].questions[i].label,
                    help: subData[index].questions[i].help,
                    id: subData[index].questions[i].id,
                    subType: subData[index].questions[i].subType,
                    type: subData[index].questions[i].type,
                    sublabels: subLabelArr
                  })
                  break

                case 'input':
                  if (subData[index].questions[i].status) {
                    userQues.splice(userQuesArrIndex, 0, {
                      uuid: subData[index].questions[i].uuid,
                      outputId:
                        userQues[userQuesArrIndex - 1].uuid +
                        '_' +
                        subData[index].key,
                      subQues: true,
                      label: subData[index].questions[i].label,
                      help: subData[index].questions[i].help,
                      id: subData[index].questions[i].id,
                      status: subData[index].questions[i].status,
                      quesType: subData[index].questions[i].quesType,
                      subType: subData[index].questions[i].subType,
                      type: subData[index].questions[i].type,
                      sublabels: subLabelArr
                    })
                  } else {
                    userQues.splice(userQuesArrIndex, 0, {
                      uuid: subData[index].questions[i].uuid,
                      outputId:
                        userQues[userQuesArrIndex - 1].uuid +
                        '_' +
                        subData[index].key,
                      subQues: true,
                      label: subData[index].questions[i].label,
                      help: subData[index].questions[i].help,
                      id: subData[index].questions[i].id,
                      status: '',
                      quesType: 'subQues',
                      subType: subData[index].questions[i].subType,
                      type: subData[index].questions[i].type,
                      sublabels: subLabelArr
                    })
                  }
                  break
                case 'datepicker':
                  if (subData[index].questions[i].status) {
                    userQues.splice(userQuesArrIndex, 0, {
                      uuid: subData[index].questions[i].uuid,
                      outputId:
                        userQues[userQuesArrIndex - 1].uuid +
                        '_' +
                        subData[index].key,
                      subQues: true,
                      label: subData[index].questions[i].label,
                      help: subData[index].questions[i].help,
                      id: subData[index].questions[i].id,
                      status: subData[index].questions[i].status,
                      quesType: subData[index].questions[i].quesType,
                      subType: subData[index].questions[i].subType,
                      type: subData[index].questions[i].type,
                      sublabels: subLabelArr
                    })
                  } else {
                    userQues.splice(userQuesArrIndex, 0, {
                      uuid: subData[index].questions[i].uuid,
                      outputId:
                        userQues[userQuesArrIndex - 1].uuid +
                        '_' +
                        subData[index].key,
                      subQues: true,
                      label: subData[index].questions[i].label,
                      help: subData[index].questions[i].help,
                      id: subData[index].questions[i].id,
                      status: '',
                      quesType: 'subQues',
                      subType: subData[index].questions[i].subType,
                      type: subData[index].questions[i].type,
                      sublabels: subLabelArr
                    })
                  }
                  break
                case 'countries':
                  if (subData[index].questions[i].status) {
                    userQues.splice(userQuesArrIndex, 0, {
                      uuid: subData[index].questions[i].uuid,
                      outputId:
                        userQues[userQuesArrIndex - 1].uuid +
                        '_' +
                        subData[index].key,
                      subQues: true,
                      label: subData[index].questions[i].label,
                      help: subData[index].questions[i].help,
                      id: subData[index].questions[i].id,
                      status: subData[index].questions[i].status,
                      quesType: subData[index].questions[i].quesType,
                      subType: subData[index].questions[i].subType,
                      type: subData[index].questions[i].type,
                      sublabels: subLabelArr
                    })
                  } else {
                    userQues.splice(userQuesArrIndex, 0, {
                      uuid: subData[index].questions[i].uuid,
                      outputId:
                        userQues[userQuesArrIndex - 1].uuid +
                        '_' +
                        subData[index].key,
                      subQues: true,
                      label: subData[index].questions[i].label,
                      help: subData[index].questions[i].help,
                      id: subData[index].questions[i].id,
                      status: '',
                      quesType: 'subQues',
                      subType: subData[index].questions[i].subType,
                      type: subData[index].questions[i].type,
                      sublabels: subLabelArr
                    })
                  }
                  break
              }
            }
          }
        } else {
        }

        if (userQues.length - 1 == userQuesArrIndex) {
          this.setState({ submitForm: true })
        } else {
          this.setState({ submitForm: false })
        }
      } else {
        showQues[0].options[i].status = false
        this.setState({ subQuesCheck: false })
        if (subData[i].questions.length > 0) {
          for (let k = 0; k < subData.length; k++) {
            for (let i = 0; i < userQues.length; i++) {
              for (let j = 0; j < subData[k].questions.length; j++) {
                if (userQues[i].uuid == subData[k].questions[j].uuid) {
                  if (index == k) {
                  } else {
                    if (subData[k].questions[j].options) {
                      for (
                        let l = 0;
                        l < subData[k].questions[j].options.length;
                        l++
                      ) {
                        if (subData[k].questions[j].options[l].questions) {
                          for (
                            let m = 0;
                            m <
                            subData[k].questions[j].options[l].questions.length;
                            m++
                          ) {
                            for (let i = 0; i < userQues.length; i++) {
                              if (
                                userQues[i].uuid ==
                                subData[k].questions[j].options[l].questions[m]
                                  .uuid
                              ) {
                                userQues.splice(i, 1)
                              }
                            }
                          }
                        } else {
                        }
                      }
                    }
                    userQues.splice(i, 1)
                  }
                } else {
                }
              }
            }
          }
        } else {
        }
      }
    }
    userQues
    userQuesArrIndex
    if (this.state.switchBtnValue) {
      this.btnValidation()
      this.nextQues()
    } else {
      this.btnValidation()
    }
    this.setState({ dataSource: ds.cloneWithRows(showQues) })
  }

  /**
   * @btnValidation: This function represents the validation for (Back,Next and Submit) buttons according to questions.
   */
  btnValidation() {
    var loopCheck = false
    if (
      showQues[0].type == 'input' ||
      showQues[0].type == 'datepicker' ||
      showQues[0].type == 'countries'
    ) {
      if (showQues[0].status) {
        this.setState({ btnValidation: false })
        if (userQues.length == userQuesArrIndex) {
          this.setState({ submitForm: true })
        } else {
          this.setState({ submitForm: false })
        }
      } else {
        this.setState({ btnValidation: true })
      }
    } else {
      if (showQues[0].sublabels.length > 0) {
        for (let i = 0; i < showQues[0].sublabels.length; i++) {
          if (loopCheck) {
            break
          } else {
          }
          for (j = 0; j < showQues[0].sublabels[i].options.length; j++) {
            if (showQues[0].sublabels[i].options[j].status) {
              this.setState({ btnValidation: false })
              if (userQues.length == userQuesArrIndex) {
                this.setState({ submitForm: true })
              } else {
                this.setState({ submitForm: false })
              }

              loopCheck = true
              break
            } else {
              this.setState({ btnValidation: true })
            }
          }
        }
      } else {
        for (i = 0; i < showQues[0].options.length; i++) {
          if (showQues[0].options[i].status) {
            this.setState({ btnValidation: false })
            if (userQues.length == userQuesArrIndex) {
              this.setState({ submitForm: true })
            } else {
              this.setState({ submitForm: false })
            }
            break
          } else {
            this.setState({ btnValidation: true })
          }
        }
      }
    }
  }

  /**
   *
   * @param {Represents the value from input field} text
   * @param {Represents the array of input question} subData
   *
   * @inputFun: This function represents the functionality of input filed question
   */
  inputFun(text, subData) {
    this.setState({ message: text })
    showQues[0].status = text
    userQues[userQuesArrIndex - 1].status = text
    this.setState({ phnNo: 'a' })
    this.btnValidation()
  }

  checkOutputArrfun(i) {
    if (nestedArrCheck.length == 0) {
      nestedArrCheck.push(userQues[i].outputId)
    } else {
      var nestedArrCheckLoop = nestedArrCheck.length
      for (let j = 0; j < nestedArrCheck.length; j++) {
        var nestedArrCheckString = nestedArrCheck[j]
        var userQuesString = userQues[i].outputId
        if (nestedArrCheckString != userQuesString) {
          if (userQuesString.length > 37) {
            for (let k = 0; k < userQuesString.length; k++) {
              if (nestedArrCheckString[k] == userQuesString[k]) {
                this.state.nestedArrCheckStringStatus = false
              } else {
                if (k >= 37) {
                  this.state.nestedArrCheckStringStatus = true
                  this.state.nestedArrCheckBool = true
                } else {
                  this.state.nestedArrCheckStringStatus = false

                  this.state.nestedArrCheckBool = false
                }
                break
              }
            }
            if (this.state.nestedArrCheckStringStatus) {
              nestedArrCheck.splice(j, nestedArrCheck.length - j)
              this.state.nestedArrCheckBool = false
            } else {
              this.state.nestedArrCheckBool = false
            }
          }
        } else {
          if (nestedArrCheck[j] == userQues[i].outputId) {
            this.state.nestedArrCheckBool = true
            if (j < nestedArrCheck.length - 1) {
              nestedArrCheck.splice(j + 1, nestedArrCheck.length - (j + 1))
            } else {
            }
          } else {
          }
        }
      }
      if (this.state.nestedArrCheckBool) {
      } else {
        nestedArrCheck.push(userQues[i].outputId)
        this.state.nestedArrCheckBool = false
      }
    }
  }

  /**
   * @submitForm: This function represents the functionlity of submition of questionnaire.
   */
  submitForm() {
    for (let i = 0; i < userQues.length; i++) {
      if (userQues[i].outputId) {
        this.checkOutputArrfun(i)
        switch (nestedArrCheck.length) {
          case 1:
            if (this.state.nestedArrCheckBool) {
              var outputValue = this.selectQuesType('array', i)
              outputArr[nestedArrCheck[nestedArrCheck.length - 1]][
                userQues[i].uuid
              ] = outputValue
              this.state.nestedArrCheckBool = false
            } else {
              var outputValue = this.selectQuesType('nestedArray', i)
              outputArr[nestedArrCheck[nestedArrCheck.length - 1]] = {
                [userQues[i].uuid]: outputValue
              }
            }
            break
          case 2:
            if (this.state.nestedArrCheckBool) {
              var outputValue = this.selectQuesType('array', i)
              outputArr[nestedArrCheck[nestedArrCheck.length - 2]][
                nestedArrCheck[nestedArrCheck.length - 1]
              ][userQues[i].uuid] = outputValue
              this.state.nestedArrCheckBool = false
            } else {
              var outputValue = this.selectQuesType('nestedArray', i)
              outputArr[nestedArrCheck[nestedArrCheck.length - 2]][
                nestedArrCheck[nestedArrCheck.length - 1]
              ] = { [userQues[i].uuid]: outputValue }
            }
            break
          case 3:
            if (this.state.nestedArrCheckBool) {
              var outputValue = this.selectQuesType('array', i)
              outputArr[nestedArrCheck[nestedArrCheck.length - 3]][
                nestedArrCheck[nestedArrCheck.length - 2]
              ][nestedArrCheck[nestedArrCheck.length - 1]][
                userQues[i].uuid
              ] = outputValue
              this.state.nestedArrCheckBool = false
            } else {
              var outputValue = this.selectQuesType('nestedArray', i)
              outputArr[nestedArrCheck[nestedArrCheck.length - 3]][
                nestedArrCheck[nestedArrCheck.length - 2]
              ][nestedArrCheck[nestedArrCheck.length - 1]] = {
                [userQues[i].uuid]: outputValue
              }
            }
            break
          case 4:
            if (this.state.nestedArrCheckBool) {
              var outputValue = this.selectQuesType('array', i)
              outputArr[nestedArrCheck[nestedArrCheck.length - 4]][
                nestedArrCheck[nestedArrCheck.length - 3]
              ][nestedArrCheck[nestedArrCheck.length - 2]][
                nestedArrCheck[nestedArrCheck.length - 1]
              ][userQues[i].uuid] = outputValue
              this.state.nestedArrCheckBool = false
            } else {
              var outputValue = this.selectQuesType('nestedArray', i)
              outputArr[nestedArrCheck[nestedArrCheck.length - 4]][
                nestedArrCheck[nestedArrCheck.length - 3]
              ][nestedArrCheck[nestedArrCheck.length - 2]][
                nestedArrCheck[nestedArrCheck.length - 1]
              ] = { [userQues[i].uuid]: outputValue }
              // { ' userQues[i].uuid': 'userQues[i].uuid' }
            }
            break

            break
            break
          default:
        }
      } else {
        if (nestedArrCheck.length == 0) {
        } else {
          nestedArrCheck = []
        }

        var outputValue = this.selectQuesType('array', i)

        outputArr[userQues[i].uuid] = outputValue
      }
    }

    var finalOutputArray = outputArr

    outputArr = {}
    nestedArrCheck = []
    userQues = []
    showQues = []
    previousAnsArr = []

    userQuesArrIndex = 0
    this.setState({ dataSource: ds.cloneWithRows(showQues) })
    this.setState({ submitForm: false })

    this.setState({ quesDetailsCheck: true })
    this.setState({ botReply: true })
    this.setState({ backBtnOpacity: '#fff', backBtnValidation: true })
    this.submitButtonFun(finalOutputArray)
  }
  selectQuesType(type, i) {
    switch (userQues[i].type) {
      case 'compoundradio':
        var compoundradioArr = {}
        for (let j = 0; j < userQues[i].sublabels.length; j++) {
          for (let k = 0; k < userQues[i].sublabels[j].options.length; k++) {
            if (userQues[i].sublabels[j].options[k].status) {
              compoundradioArr[userQues[i].sublabels[j].id] =
                userQues[i].sublabels[j].options[k].key
              break
            } else {
              compoundradioArr[userQues[i].sublabels[j].id] = 'null'
            }
          }
        }
        return compoundradioArr
        break
      case 'select':
        for (let j = 0; j < userQues[i].options.length; j++) {
          if (userQues[i].options[j].status) {
            return userQues[i].options[j].key
          }
        }
        break
      case 'radio':
        for (let j = 0; j < userQues[i].options.length; j++) {
          if (userQues[i].options[j].status) {
            return userQues[i].options[j].key
          }
        }
        break
      case 'multiselect':
        var multiselectArr = {}
        for (let j = 0; j < userQues[i].options.length; j++) {
          if (userQues[i].options[j].status) {
            multiselectArr[userQues[i].options[j].key] =
              userQues[i].options[j].status
          } else {
            multiselectArr[userQues[i].options[j].key] =
              userQues[i].options[j].status
          }
        }
        return multiselectArr
        break
      case 'compoundcheckbox':
        var compoundcheckboxArr = {}
        for (let j = 0; j < userQues[i].sublabels.length; j++) {
          for (let k = 0; k < userQues[i].sublabels[j].options.length; k++) {
            var mergedKey =
              userQues[i].sublabels[j].id +
              '_' +
              userQues[i].sublabels[j].options[k].key
            if (userQues[i].sublabels[j].options[k].status) {
              compoundcheckboxArr[mergedKey] =
                userQues[i].sublabels[j].options[k].status
            } else {
              compoundcheckboxArr[mergedKey] = 'null'
            }
          }
        }
        return compoundcheckboxArr

        break

      case 'input':
        return userQues[i].status
        break
      case 'datepicker':
        return userQues[i].status
        break
      case 'countries':
        return userQues[i].status
        break
      default:
        break
    }
  }
  submitButtonFun(value) {
    answeredQuestionId = this.state.quesId
    
    this.setState({ btnValidation: true })
    this.props.saveQues(
      JSON.stringify(value),
      'https://iqtriage.daking.se/questionnaire/' +
        this.state.createQuesId +
        '/' +
        this.state.quesId
    )
  }
  /**
   * @componentDidMount: Represents the life cycle. As soon as the render method has been executed the componentDidMount function is called.
   */
  componentDidMount() {
    Keyboard.dismiss()
    SplashScreen.hide()
    this.setState({ botReply: true })
    this.nextQues()
    AppState.addEventListener('change', this._handleAppStateChange)
  }
  /**
   * @componentWillMount:- Represents the life cycle.componentWillMount is called before the render method is executed
   */
  componentWillMount() {
    
    this.props.apiValue
    for (i = 0; i < languageList.length; i++) {
      if (languageList[i].code == strings.getLanguage()) {
        languageList[i].status = true
        language = languageList[i].code
        languageName = languageList[i].languages[strings.getLanguage()]
        flag = languageList[i].flagImage
      } else {
        languageList[i].status = false
      }
    }
    this.setState({ abc: 'a' })
    AsyncStorage.getItem('againQuesCheck').then(value =>
      this.setState({ againQuesCheck: value })
    )
    AsyncStorage.getItem('name').then(value => this.userDetails(value))
  }
  userDetails(result) {
    this.setState({ userDetails: JSON.parse(result) })
    this.props.clearQuesData()

    if (this.state.againQuesCheck) {
      var requestJSON = {
        pId: this.state.userDetails._id,
        forms: [
          {
            id: this.state.apiValue._id,
            title: this.state.apiValue.title
          }
        ]
      }

      this.props.addForm(JSON.stringify(requestJSON))
    } else {
      var requestJSON = {
        pId: this.state.userDetails._id,
        forms: [
          {
            id: 'CCD91FE8-78E8-420D-9424-AF7BD4CF3F05',
            title: 'ICD R Fever'
          },

          {
            id: this.state.apiValue._id,
            title: this.state.apiValue.title
          }
        ]
      }

      this.props.createQues(JSON.stringify(requestJSON))
    }
  }
  componentWillUnmount() {
    quesDetails

    userQues = []

    showQues = []

    subUserQues = []

    subShowQues = []

    userQuesArrIndex = 0

    previousAnsArr = []

    language = ''

    languageName = ''

    outputArr = {}
    nestedArrCheck = []
  }
  /**
   * @componentWillReceiveProps: Represents the life cycle.componentWillReceiveProps is only called when the props have changed and when this is not an initial rendering.
   * Note: This function is used to get data from API hit and distribute for further use.
   */
  componentWillReceiveProps(Props) {
    if (Props.loaderCheck) {
      if (Props.internetCheck) {
        
        this.dropdown.alertWithType(
          'error',
          strings.noInternet,
          strings.noInternetString
        )
        if (Props.createQuesCheckPopPage) {
          setTimeout(() => {
            Actions.root({ type: ActionConst.RESET })
          }, 4000)
        }
      }
    }
    if (Props.timeValue) {
      this.setState({
        switchBtnValue: Props.switchBtnValue,
        timeValue: Props.timeValue
      })
    } else {
      this.setState({ switchBtnValue: false, timeValue: 0 })
    }

    if (Props.createQuesDetails._id) {
      this.setState({ createQuesId: Props.createQuesDetails._id })
      
      this.props.getQues(
        'https://iqtriage.daking.se/questionnaire/' +
          Props.createQuesDetails._id +
          '/' +
          Props.createQuesDetails.forms[0].id +
          '/all'
      )
    } else {
    }
    if (Props.addFormQuesDetails._id) {
      this.setState({ createQuesId: Props.addFormQuesDetails._id })
      
      this.props.getQues(
        'https://iqtriage.daking.se/questionnaire/' +
          Props.addFormQuesDetails._id +
          '/' +
          Props.addFormQuesDetails.forms[
            Props.addFormQuesDetails.forms.length - 1
          ].id +
          '/all'
      )
    } else {
    }
    if (Props.saveQuesDetails) {
      this.setState({
        createQuesId: Props.saveQuesDetails.id,
        quesId: Props.saveQuesDetails.form_id
      })
     
      quesDetails

      userQues = []

      showQues = []

      subUserQues = []

      subShowQues = []

      userQuesArrIndex = 0

      previousAnsArr = []

      // language = 'en'

      // languageName = 'English'

      outputArr = {}
      nestedArrCheck = []
      
      this.props.getQues(
        'https://iqtriage.daking.se/questionnaire/' +
          Props.saveQuesDetails.id +
          '/' +
          Props.saveQuesDetails.form_id +
          '/all'
      )
    } else {
    }

    if (Props.quesDetails.questions) {
      if (this.state.quesDetailsCheck) {
        this.setState({ quesId: Props.quesDetails._id })
        this.setState({ botReply: false })
        quesDetails = Props.quesDetails.questions
        for (i = 0; i < Props.quesDetails.questions.length; i++) {
          var localOptions = []
          var subLabelArr = []
          var sublabelCheckUi = true

          if (Props.quesDetails.questions[i].sublabels) {
            sublabelCheckUi = true
            for (
              let l = 0;
              l < Props.quesDetails.questions[i].sublabels.length;
              l++
            ) {
              if (
                Props.quesDetails.questions[i].sublabels[l].label.en ==
                Props.quesDetails.questions[i].options[0].value.en
              ) {
                sublabelCheckUi = false
              } else {
              }
            }

            if (sublabelCheckUi) {
              for (
                let k = 0;
                k < Props.quesDetails.questions[i].sublabels.length;
                k++
              ) {
                let localOptions = []
                for (
                  j = 0;
                  j < Props.quesDetails.questions[i].options.length;
                  j++
                ) {
                  var localOptionsValue = {
                    sct: '',
                    questions: [],
                    key: '',
                    value: '',
                    status: '',
                    quesType: 'ques'
                  }
                  localOptionsValue.sct =
                    Props.quesDetails.questions[i].options[j].sct
                  localOptionsValue.key =
                    Props.quesDetails.questions[i].options[j].key
                  localOptionsValue.value =
                    Props.quesDetails.questions[i].options[j].value

                  localOptionsValue.status = false
                  localOptionsValue.quesType = 'ques'

                  if (Props.quesDetails.questions[i].options[j].questions) {
                    localOptionsValue.questions =
                      Props.quesDetails.questions[i].options[j].questions
                  }
                  localOptions.push(localOptionsValue)
                }
                subLabelArr.push({
                  label: Props.quesDetails.questions[i].sublabels[k].label,
                  id: Props.quesDetails.questions[i].sublabels[k].id,
                  sct: Props.quesDetails.questions[i].sublabels[k].sct,
                  options: localOptions
                })
              }
            } else {
              for (
                j = 0;
                j < Props.quesDetails.questions[i].options.length;
                j++
              ) {
                var localOptionsValue = {
                  sct: '',
                  questions: [],
                  key: '',
                  value: '',
                  status: '',
                  quesType: 'ques'
                }
                localOptionsValue.sct =
                  Props.quesDetails.questions[i].options[j].sct
                localOptionsValue.key =
                  Props.quesDetails.questions[i].options[j].key
                localOptionsValue.value =
                  Props.quesDetails.questions[i].options[j].value

                localOptionsValue.status = false
                localOptionsValue.quesType = 'ques'

                if (Props.quesDetails.questions[i].options[j].questions) {
                  localOptionsValue.questions =
                    Props.quesDetails.questions[i].options[j].questions
                }
                localOptions.push(localOptionsValue)
              }
            }
          } else if (Props.quesDetails.questions[i].options) {
            for (
              j = 0;
              j < Props.quesDetails.questions[i].options.length;
              j++
            ) {
              var localOptionsValue = {
                sct: '',
                questions: [],
                key: '',
                value: '',
                status: '',
                quesType: 'ques'
              }
              localOptionsValue.sct =
                Props.quesDetails.questions[i].options[j].sct
              localOptionsValue.key =
                Props.quesDetails.questions[i].options[j].key
              localOptionsValue.value =
                Props.quesDetails.questions[i].options[j].value

              localOptionsValue.status = false
              localOptionsValue.quesType = 'ques'

              if (Props.quesDetails.questions[i].options[j].questions) {
                localOptionsValue.questions =
                  Props.quesDetails.questions[i].options[j].questions
              }
              localOptions.push(localOptionsValue)
            }
          } else {
          }

          switch (Props.quesDetails.questions[i].type) {
            case 'multiselect':
            case 'compoundcheckbox':
            case 'select':
            case 'radio':
            case 'compoundradio':
              userQues.push({
                uuid: Props.quesDetails.questions[i].uuid,

                options: localOptions,
                label: Props.quesDetails.questions[i].label,
                help: Props.quesDetails.questions[i].help,
                id: Props.quesDetails.questions[i].id,
                subType: Props.quesDetails.questions[i].subType,
                type: Props.quesDetails.questions[i].type,
                sublabels: subLabelArr
              })
              break

            case 'input':
              userQues.push({
                uuid: Props.quesDetails.questions[i].uuid,
                status: '',
                quesType: 'ques',
                label: Props.quesDetails.questions[i].label,
                help: Props.quesDetails.questions[i].help,
                id: Props.quesDetails.questions[i].id,
                subType: Props.quesDetails.questions[i].subType,
                type: Props.quesDetails.questions[i].type,
                sublabels: subLabelArr
              })
              break
            case 'datepicker':
              userQues.push({
                uuid: Props.quesDetails.questions[i].uuid,
                status: '',
                quesType: 'ques',
                label: Props.quesDetails.questions[i].label,
                help: Props.quesDetails.questions[i].help,
                id: Props.quesDetails.questions[i].id,
                subType: Props.quesDetails.questions[i].subType,
                type: Props.quesDetails.questions[i].type,
                sublabels: subLabelArr
              })
              break
            case 'countries':
              userQues.push({
                uuid: Props.quesDetails.questions[i].uuid,
                status: '',
                quesType: 'ques',
                label: Props.quesDetails.questions[i].label,
                help: Props.quesDetails.questions[i].help,
                id: Props.quesDetails.questions[i].id,
                subType: Props.quesDetails.questions[i].subType,
                type: Props.quesDetails.questions[i].type,
                sublabels: subLabelArr
              })
              break
          }
        }

        this.showQuesFun(userQues)

        this.setState({ quesDetailsCheck: false })
      }
    }

    if (Props.bankIdToken.autoStartToken) {
      this.setState({
        orderRef: Props.bankIdToken.orderRef,
        bankIdForegroungCheck: true,
        bubbleSize: 0,
        opacity: 1,
        loadingAuth: false,
        QRtext: 'bankid:///?autostarttoken=' + Props.bankIdToken.autoStartToken,
        QRSize: 200
      })

      // this.asyncCallFun()

      // this.bankIdAuth(
      //   Props.bankIdToken.autoStartToken,
      //   Props.bankIdToken.orderRef
      // )
    }

    if (Props.bankidResponseCheck == false) {
      this.setState({
        bubbleSize: 0,
        opacity: 1,
        loadingAuth: false
      })
      this.setState({ bankIdForegroungCheck: false })
    }
    if (Props.bankIdResponse.birthDate) {
      // alert(JSON.stringify(Props.bankIdResponse))
    }
  }

  /**
   *
   * @param {userQues is an array which is having set of all question from api response.} userQues
   *
   * @showQuesFun: This function is used to show question dynamically through chatbot.
   */

  showQuesFun(userQues) {
    if (showQues.length == 0) {
      switch (userQues[userQuesArrIndex].type) {
        case 'multiselect':
        case 'compoundcheckbox':
        case 'select':
        case 'radio':
        case 'compoundradio':
          showQues.push({
            uuid: userQues[userQuesArrIndex].uuid,

            options: userQues[userQuesArrIndex].options,
            label: userQues[userQuesArrIndex].label,
            help: userQues[userQuesArrIndex].help,
            id: userQues[userQuesArrIndex].id,
            subType: userQues[userQuesArrIndex].subType,
            type: userQues[userQuesArrIndex].type,
            sublabels: userQues[userQuesArrIndex].sublabels
          })

          break

        case 'input':
          if (userQues[userQuesArrIndex].status) {
            showQues.push({
              uuid: userQues[userQuesArrIndex].uuid,
              label: userQues[userQuesArrIndex].label,
              help: userQues[userQuesArrIndex].help,
              status: userQues[userQuesArrIndex].status,
              quesType: userQues[userQuesArrIndex].quesType,
              id: userQues[userQuesArrIndex].id,
              subType: userQues[userQuesArrIndex].subType,
              type: userQues[userQuesArrIndex].type,
              sublabels: userQues[userQuesArrIndex].sublabels
            })
          } else {
            showQues.push({
              uuid: userQues[userQuesArrIndex].uuid,
              label: userQues[userQuesArrIndex].label,
              help: userQues[userQuesArrIndex].help,
              status: '',
              quesType: 'ques',
              id: userQues[userQuesArrIndex].id,
              subType: userQues[userQuesArrIndex].subType,
              type: userQues[userQuesArrIndex].type,
              sublabels: userQues[userQuesArrIndex].sublabels
            })
          }
          break
        case 'datepicker':
          if (userQues[userQuesArrIndex].status) {
            showQues.push({
              uuid: userQues[userQuesArrIndex].uuid,
              label: userQues[userQuesArrIndex].label,
              help: userQues[userQuesArrIndex].help,
              status: userQues[userQuesArrIndex].status,
              quesType: userQues[userQuesArrIndex].quesType,
              id: userQues[userQuesArrIndex].id,
              subType: userQues[userQuesArrIndex].subType,
              type: userQues[userQuesArrIndex].type,
              sublabels: userQues[userQuesArrIndex].sublabels
            })
          } else {
            showQues.push({
              uuid: userQues[userQuesArrIndex].uuid,
              label: userQues[userQuesArrIndex].label,
              help: userQues[userQuesArrIndex].help,
              status: '',
              quesType: 'ques',
              id: userQues[userQuesArrIndex].id,
              subType: userQues[userQuesArrIndex].subType,
              type: userQues[userQuesArrIndex].type,
              sublabels: userQues[userQuesArrIndex].sublabels
            })
          }
          break
        case 'countries':
          if (userQues[userQuesArrIndex].status) {
            showQues.push({
              uuid: userQues[userQuesArrIndex].uuid,
              label: userQues[userQuesArrIndex].label,
              help: userQues[userQuesArrIndex].help,
              status: userQues[userQuesArrIndex].status,
              quesType: userQues[userQuesArrIndex].quesType,
              id: userQues[userQuesArrIndex].id,
              subType: userQues[userQuesArrIndex].subType,
              type: userQues[userQuesArrIndex].type,
              sublabels: userQues[userQuesArrIndex].sublabels
            })
          } else {
            showQues.push({
              uuid: userQues[userQuesArrIndex].uuid,
              label: userQues[userQuesArrIndex].label,
              help: userQues[userQuesArrIndex].help,
              status: '',
              quesType: 'ques',
              id: userQues[userQuesArrIndex].id,
              subType: userQues[userQuesArrIndex].subType,
              type: userQues[userQuesArrIndex].type,
              sublabels: userQues[userQuesArrIndex].sublabels
            })
          }
          break
      }
    } else {
      showQues.pop()
      // for(i=0;i<userQues[userQuesArrIndex+1].options.length;i++)
      // {
      //     userQues[userQuesArrIndex+1].options[i].status=false
      // }

      switch (userQues[userQuesArrIndex].type) {
        case 'multiselect':
        case 'compoundcheckbox':
        case 'select':
        case 'radio':
        case 'compoundradio':
          showQues.push({
            uuid: userQues[userQuesArrIndex].uuid,

            options: userQues[userQuesArrIndex].options,
            label: userQues[userQuesArrIndex].label,
            help: userQues[userQuesArrIndex].help,
            id: userQues[userQuesArrIndex].id,
            subType: userQues[userQuesArrIndex].subType,
            type: userQues[userQuesArrIndex].type,
            sublabels: userQues[userQuesArrIndex].sublabels
          })

          break

        case 'input':
          if (userQues[userQuesArrIndex].status) {
            showQues.push({
              uuid: userQues[userQuesArrIndex].uuid,
              id: userQues[userQuesArrIndex].id,
              subType: userQues[userQuesArrIndex].subType,
              label: userQues[userQuesArrIndex].label,
              help: userQues[userQuesArrIndex].help,
              id: userQues[userQuesArrIndex].id,
              status: userQues[userQuesArrIndex].status,
              quesType: userQues[userQuesArrIndex].quesType,
              type: userQues[userQuesArrIndex].type,
              sublabels: userQues[userQuesArrIndex].sublabels
            })
          } else {
            showQues.push({
              uuid: userQues[userQuesArrIndex].uuid,
              status: '',
              quesType: 'ques',
              label: userQues[userQuesArrIndex].label,
              help: userQues[userQuesArrIndex].help,
              id: userQues[userQuesArrIndex].id,
              subType: userQues[userQuesArrIndex].subType,
              type: userQues[userQuesArrIndex].type,
              sublabels: userQues[userQuesArrIndex].sublabels
            })
          }
          break
        case 'datepicker':
          if (userQues[userQuesArrIndex].status) {
            showQues.push({
              uuid: userQues[userQuesArrIndex].uuid,
              id: userQues[userQuesArrIndex].id,
              subType: userQues[userQuesArrIndex].subType,
              label: userQues[userQuesArrIndex].label,
              help: userQues[userQuesArrIndex].help,
              id: userQues[userQuesArrIndex].id,
              status: userQues[userQuesArrIndex].status,
              quesType: userQues[userQuesArrIndex].quesType,
              type: userQues[userQuesArrIndex].type,
              sublabels: userQues[userQuesArrIndex].sublabels
            })
          } else {
            showQues.push({
              uuid: userQues[userQuesArrIndex].uuid,
              status: '',
              quesType: 'ques',
              label: userQues[userQuesArrIndex].label,
              help: userQues[userQuesArrIndex].help,
              id: userQues[userQuesArrIndex].id,
              subType: userQues[userQuesArrIndex].subType,
              type: userQues[userQuesArrIndex].type,
              sublabels: userQues[userQuesArrIndex].sublabels
            })
          }
          break
        case 'countries':
          if (userQues[userQuesArrIndex].status) {
            showQues.push({
              uuid: userQues[userQuesArrIndex].uuid,
              id: userQues[userQuesArrIndex].id,
              subType: userQues[userQuesArrIndex].subType,
              label: userQues[userQuesArrIndex].label,
              help: userQues[userQuesArrIndex].help,
              id: userQues[userQuesArrIndex].id,
              status: userQues[userQuesArrIndex].status,
              quesType: userQues[userQuesArrIndex].quesType,
              type: userQues[userQuesArrIndex].type,
              sublabels: userQues[userQuesArrIndex].sublabels
            })
          } else {
            showQues.push({
              uuid: userQues[userQuesArrIndex].uuid,
              status: '',
              quesType: 'ques',
              label: userQues[userQuesArrIndex].label,
              help: userQues[userQuesArrIndex].help,
              id: userQues[userQuesArrIndex].id,
              subType: userQues[userQuesArrIndex].subType,
              type: userQues[userQuesArrIndex].type,
              sublabels: userQues[userQuesArrIndex].sublabels
            })
          }
          break
      }
    }

    if (showQues[0].sublabels.length > 0) {
      this.setState({ dataSource1: ds.cloneWithRows(showQues[0].sublabels) })
    } else {
    }

    userQuesArrIndex = userQuesArrIndex + 1
    this.setState({ dataSource: ds.cloneWithRows(showQues) })
  }
  /**
   * @hideShowModel: This functions is used to show/hide model for selecting Languages
   */

  hideShowModel() {
    this.setState({ languageModal: !this.state.languageModal })
  }
  settingsPage() {
    Actions.Settings({
      switchBtnValue: this.state.switchBtnValue,
      timeValue: this.state.timeValue
    })
  }
  /**
   * @selectLanguage : This function fires when user select any language from language list.
   * @param {Represenths the indes of selected language} index
   */

  selectLanguage(index) {
    for (i = 0; i < languageList.length; i++) {
      if (i == index) {
        strings.setLanguage(languageList[index].code)
        languageList[i].status = true
        language = languageList[index].code
        languageName = languageList[index].languages[strings.getLanguage()]
        flag = languageList[index].flagImage
      } else {
        languageList[i].status = false
      }
    }
    this.setState({ homeNo: 'a' })
    this.setState({ dataSource1: ds.cloneWithRows(showQues[0].sublabels) })
    if (previousAnsArr.length > 0) {
      this.setState({
        dataSource2: ds.cloneWithRows(previousAnsArr[0].sublabels)
      })
    } else {
    }
  }

  /**
   * @render: Represents the UI interface of the app
   */
  render() {
    const { selectedStartDate } = this.state
    const startDate = selectedStartDate ? selectedStartDate.toString() : ''
    const { active, text } = this.state
    return (
      <UserInactivity
        timeForInactivity={toNumber(text)}
        checkInterval={1000}
        onAction={this.onAction}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <View
            pointerEvents={this.state.pointerEvents}
            style={{
              backgroundColor: '#fff',
              flex: 1
            }}>
            <Modal isVisible={this.state.languageModal}>
              <View style={{ backgroundColor: '#fff', borderRadius: 20 }}>
                <View>
                  <View style={{ flexDirection: 'row', padding: 20 }}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                      <Image
                        style={{
                          width: 66,
                          height: 58,
                          marginLeft: WINDOW_WIDTH / 20
                        }}
                        source={require('../../images/robot.png')}
                      />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-end'
                        }}>
                        <Image
                          style={{ position: 'absolute' }}
                          source={require('../../images/receive.png')}
                        />
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          maxWidth: WINDOW_WIDTH / 1.6,
                          backgroundColor: '#83BFBC',
                          overflow: 'hidden',
                          borderRadius: 25,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: 10
                        }}>
                        <Text
                          style={{
                            padding: 10,
                            fontSize: 17,
                            fontWeight: 'bold',
                            color: '#fff'
                          }}>
                          {strings.languageModalString1}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <FlatList
                    style={{ paddingTop: 10, marginBottom: 10 }}
                    ref={ref => (this.flatList = ref)}
                    keyExtractor={this._keyExtractor}
                    data={languageList}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderBottomColor: 'grey',
                          borderBottomWidth: 1
                        }}
                        onPress={() => this.selectLanguage(index)}>
                        <View style={globalStyle.radioButton}>
                          {item.status ? (
                            <Icon
                              name="ios-radio-button-on"
                              size={25}
                              color="#83BFBC"
                            />
                          ) : (
                            <Icon
                              name="ios-radio-button-off-outline"
                              size={25}
                              color="#94989C"
                            />
                          )}
                        </View>
                        <View style={globalStyle.optionsContainerView}>
                          <View
                            style={{
                              flexDirection: 'row',

                              alignItems: 'center'
                            }}>
                            <View>
                              <Image
                                style={{
                                  marginRight: 15,
                                  width: WINDOW_WIDTH / 20,
                                  height: WINDOW_HEIGHT / 40
                                }}
                                source={item.flagImage}
                              />
                            </View>
                            <View>
                              <Text
                                style={{
                                  margin: 10,
                                  fontWeight: 'bold',
                                  fontSize: 20,
                                  color: 'grey'
                                }}>
                                {item.languages[language]}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />

                  <TouchableOpacity
                    disabled={this.props.loading}
                    style={{
                      backgroundColor: '#61666B',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      width: WINDOW_WIDTH / 2,
                      height: 50,
                      margin: 20,
                      borderRadius: 30

                      // marginTop: 20
                    }}
                    onPress={() => this.hideShowModel()}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#fff',
                        fontWeight: 'bold'
                      }}>
                      {strings.submit}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View
              style={{
                paddingTop: 25,
                paddingBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: WINDOW_WIDTH
              }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AboutModal />
                </View>
                <TouchableOpacity
                  style={{
                    marginLeft: 10,
                    flexDirection: 'row',
                    borderBottomColor: 'grey',
                    //    borderBottomWidth: 1,
                    alignItems: 'center'
                  }}
                  onPress={() => this.hideShowModel()}>
                  <View>
                    <Image
                      style={{
                        marginRight: 5,
                        width: WINDOW_WIDTH / 20,
                        height: WINDOW_HEIGHT / 40
                      }}
                      source={flag}
                    />
                  </View>
                  {/* <Text style={{ color: 'grey', fontWeight: 'bold' }}>
                  {languageName}
                </Text> */}
                  <Icon
                    name="ios-arrow-down"
                    size={20}
                    color="grey"
                    style={{ marginLeft: 5, marginTop: 4 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text
                  style={{ color: 'grey', fontSize: 20, fontWeight: 'bold' }}>
                  {this.state.userDetails.firstName} {''}
                  {this.state.userDetails.lastName}
                </Text>
                <Text
                  style={{ color: 'grey', fontSize: 20, fontWeight: 'bold' }}>
                  {this.state.userDetails.ssn}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => this.settingsPage()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                    <Icon
                      name="ios-settings"
                      size={25}
                      color="grey"
                      style={{ marginTop: 4 }}
                    />
                    <Text
                      style={{
                        padding: 10,
                        color: 'grey',
                        fontWeight: 'bold'
                      }}>
                      {strings.settings}
                    </Text>
                  </View>
                </TouchableOpacity>
                <LogoutModal />
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <ScrollView
                ref={ref => (this.scrollView = ref)}
                onContentSizeChange={(contentWidth, contentHeight) => {
                  this.scrollView.scrollToEnd({ animated: true })
                }}
                style={{
                  backgroundColor: '#ECEFF1',
                  maxHeight: WINDOW_HEIGHT / 1.11
                }}>
                <FlatList
                  style={{ paddingTop: 10, marginBottom: 10 }}
                  ref={ref => (this.flatList = ref)}
                  keyExtractor={this._keyExtractor}
                  data={previousAnsArr}
                  renderItem={({ item, index }) => (
                    <View>
                      <View style={{ flexDirection: 'row' }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end'
                          }}>
                          <Image
                            style={{
                              width: 40,
                              height: 40,
                              marginLeft: WINDOW_WIDTH / 20
                            }}
                            source={require('../../images/robot.png')}
                          />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'flex-end'
                            }}>
                            <Image
                              style={{ position: 'absolute' }}
                              source={require('../../images/receive.png')}
                            />
                          </View>

                          <View
                            style={{
                              maxWidth: WINDOW_WIDTH / 1.25,
                              backgroundColor: '#83BFBC',
                              overflow: 'hidden',
                              borderRadius: 15,
                              marginTop: 20,
                              marginLeft: 9,
                              padding: 2.5
                            }}>
                            <Text
                              style={{
                                padding: 10,

                                fontWeight: 'bold',

                                color: '#fff'
                              }}>
                              {item.label[language]}
                            </Text>
                            {item.help[language] ? (
                              <Text
                                style={{
                                  padding: 10,

                                  fontWeight: 'bold',

                                  color: '#fff'
                                }}>
                                {item.help[language]}
                              </Text>
                            ) : (
                              <Text style={{ position: 'absolute' }} />
                            )}
                          </View>
                        </View>
                      </View>
                      {item.type == 'input' ||
                      item.type == 'datepicker' ||
                      item.type == 'countries' ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end'
                          }}>
                          <Image
                            style={{
                              width: 40,
                              height: 40,
                              opacity: 0,
                              marginLeft: WINDOW_WIDTH / 20
                            }}
                            source={require('../../images/robot.png')}
                          />
                          <View
                            style={{
                              maxWidth: WINDOW_WIDTH / 1.3,
                              backgroundColor: '#fff',
                              overflow: 'hidden',
                              borderRadius: 15,
                              marginTop: 5,
                              marginRight: 9.5,
                              alignItems: 'flex-end'
                            }}>
                            {item.type == 'input' ||
                            item.type == 'countries' ? (
                              <Text
                                style={{
                                  padding: 15,
                                  marginLeft: 10,
                                  fontWeight: 'bold',

                                  color: '#61666B'
                                }}>
                                {item.status}
                              </Text>
                            ) : (
                              <Text
                                style={{
                                  padding: 15,
                                  marginLeft: 10,
                                  fontWeight: 'bold',

                                  color: '#61666B'
                                }}>
                                {this.formatDate(item.status)}
                              </Text>
                            )}
                          </View>

                          <View
                            style={{
                              alignItems: 'flex-end',
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                              marginRight: 10,
                              marginTop: 10
                            }}>
                            <Image
                              style={{ position: 'absolute' }}
                              source={require('../../images/send.png')}
                            />
                          </View>
                        </View>
                      ) : item.sublabels.length > 0 ? (
                        <ListView
                          dataSource={this.state.dataSource2}
                          renderRow={(rowData, rowID, sectionID) => (
                            <FlatList
                              style={{ paddingTop: 10, marginBottom: 10 }}
                              ref={ref => (this.flatList = ref)}
                              keyExtractor={this._keyExtractor}
                              data={rowData.options}
                              renderItem={({ item, index }) => (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end'
                                  }}>
                                  {item.status ? (
                                    <View>
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          justifyContent: 'flex-end',
                                          alignItems: 'flex-end'
                                        }}>
                                        <Image
                                          style={{
                                            width: 40,
                                            height: 40,
                                            opacity: 0,
                                            marginLeft: WINDOW_WIDTH / 20
                                          }}
                                          source={require('../../images/robot.png')}
                                        />
                                        <View
                                          style={{
                                            maxWidth: WINDOW_WIDTH / 1.3,
                                            backgroundColor: '#fff',
                                            overflow: 'hidden',
                                            borderRadius: 15,
                                            marginTop: 5,
                                            marginRight: 9.5,
                                            flexDirection: 'row',
                                            alignItems: 'flex-end'
                                          }}>
                                          <Text
                                            style={{
                                              padding: 13,
                                              marginRight: 10,
                                              fontWeight: 'bold',

                                              color: '#61666B'
                                            }}>
                                            {rowData.label[language]}
                                            :- {item.value[language]}
                                          </Text>
                                        </View>

                                        <View
                                          style={{
                                            alignItems: 'flex-end',
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            marginRight: 10,
                                            marginTop: 10
                                          }}>
                                          <Image
                                            style={{ position: 'absolute' }}
                                            source={require('../../images/send.png')}
                                          />
                                        </View>
                                      </View>
                                    </View>
                                  ) : (
                                    <View />
                                  )}
                                </View>
                              )}
                            />
                          )}
                        />
                      ) : (
                        <FlatList
                          style={{ paddingTop: 10, marginBottom: 10 }}
                          ref={ref => (this.flatList = ref)}
                          keyExtractor={this._keyExtractor}
                          data={item.options}
                          renderItem={({ item, index }) => (
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end'
                              }}>
                              {item.status ? (
                                <View>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'flex-end',
                                      alignItems: 'flex-end'
                                    }}>
                                    <Image
                                      style={{
                                        width: 40,
                                        height: 40,
                                        opacity: 0,
                                        marginLeft: WINDOW_WIDTH / 20
                                      }}
                                      source={require('../../images/robot.png')}
                                    />
                                    <View
                                      style={{
                                        maxWidth: WINDOW_WIDTH / 1.3,
                                        backgroundColor: '#fff',
                                        overflow: 'hidden',
                                        borderRadius: 15,
                                        marginTop: 5,
                                        marginRight: 9.5,
                                        flexDirection: 'row',
                                        alignItems: 'flex-end'
                                      }}>
                                      <Text
                                        style={{
                                          padding: 13,
                                          marginRight: 10,
                                          fontWeight: 'bold',

                                          color: '#61666B'
                                        }}>
                                        {item.value[language]}
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        alignItems: 'flex-end',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        marginRight: 10,
                                        marginTop: 10
                                      }}>
                                      <Image
                                        style={{ position: 'absolute' }}
                                        source={require('../../images/send.png')}
                                      />
                                    </View>
                                  </View>
                                </View>
                              ) : (
                                <View />
                              )}
                            </View>
                          )}
                        />
                      )}
                    </View>
                  )}
                />

                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={(rowData, rowID, sectionID) => (
                    <View style={{ flex: 1, marginBottom: 30 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end'
                          }}>
                          <Image
                            style={{
                              width: 66,
                              height: 58,
                              marginLeft: WINDOW_WIDTH / 20
                            }}
                            source={require('../../images/robot.png')}
                          />
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'flex-end'
                            }}>
                            <Image
                              style={{ position: 'absolute' }}
                              source={require('../../images/receive.png')}
                            />
                          </View>
                          <View
                            style={{
                              maxWidth: WINDOW_WIDTH / 1.3,
                              backgroundColor: '#83BFBC',
                              overflow: 'hidden',
                              borderRadius: 25,
                              justifyContent: 'center',
                              // alignItems: 'center',
                              marginLeft: 10
                            }}>
                            <Text
                              style={{
                                padding: 10,
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: '#fff'
                              }}>
                              {rowData.label[language]}
                            </Text>
                            {rowData.help[language] ? (
                              <Text
                                style={{
                                  padding: 10,
                                  fontSize: 17,
                                  fontWeight: 'bold',
                                  color: '#fff'
                                }}>
                                {rowData.help[language]}
                              </Text>
                            ) : (
                              <Text style={{ position: 'absolute' }} />
                            )}
                          </View>
                        </View>
                      </View>
                      {rowData.sublabels.length > 0 ? (
                        <View>
                          {rowData.type == 'multiselect' ||
                          rowData.type == 'compoundcheckbox' ? (
                            <ListView
                              style={{
                                marginTop: 20,
                                backgroundColor: '#fff',
                                borderTopWidth: 1,
                                borderTopColor: 'grey'
                              }}
                              dataSource={this.state.dataSource1}
                              renderRow={(rowData1, rowID1, sectionID1) => (
                                <View>
                                  <Text
                                    style={{
                                      margin: 10,
                                      color: 'grey',
                                      fontWeight: 'bold',
                                      fontSize: 20
                                    }}>
                                    {rowData1.label[language]}
                                  </Text>
                                  <FlatList
                                    style={{
                                      paddingTop: 10,
                                      backgroundTopColor: 'grey',
                                      borderTopWidth: 1
                                    }}
                                    ref={ref => (this.flatList = ref)}
                                    keyExtractor={this._keyExtractor}
                                    data={rowData1.options}
                                    renderItem={({ item, index }) => (
                                      <CheckBox
                                        checkedColor={'#83BFBC'}
                                        onPress={() =>
                                          this.sublabelCheckboxFun(
                                            sectionID1,
                                            index,
                                            rowData1.options
                                          )
                                        }
                                        title={item.value[language]}
                                        containerStyle={{
                                          backgroundColor: 'transparent',
                                          borderColor: 'transparent',
                                          borderBottomColor: 'grey'
                                        }}
                                        checked={item.status}
                                      />
                                    )}
                                  />
                                </View>
                              )}
                            />
                          ) : rowData.type == 'compoundradio' ||
                          rowData.type == 'select' ||
                          rowData.type == 'radio' ? (
                            <ListView
                              style={{
                                marginTop: 20,
                                backgroundColor: '#fff',
                                borderTopWidth: 1,
                                borderTopColor: 'grey'
                              }}
                              dataSource={this.state.dataSource1}
                              renderRow={(rowData1, rowID1, sectionID1) => (
                                <View>
                                  <Text
                                    style={{
                                      margin: 10,
                                      color: 'grey',
                                      fontWeight: 'bold',
                                      fontSize: 20
                                    }}>
                                    {rowData1.label[language]}
                                  </Text>
                                  <FlatList
                                    style={{ paddingTop: 20, marginBottom: 20 }}
                                    ref={ref => (this.flatList = ref)}
                                    keyExtractor={this._keyExtractor}
                                    data={rowData1.options}
                                    renderItem={({ item, index }) => (
                                      <TouchableOpacity
                                        disabled={item.status}
                                        style={{
                                          flexDirection: 'row',
                                          borderBottomColor: 'grey',
                                          borderBottomWidth: 1
                                        }}
                                        onPress={() =>
                                          this.sublabelRadiobtnFun(
                                            sectionID1,
                                            index,
                                            rowData1.options
                                          )
                                        }>
                                        <View style={globalStyle.radioButton}>
                                          {item.status ? (
                                            <Icon
                                              name="ios-radio-button-on"
                                              size={25}
                                              color="#83BFBC"
                                            />
                                          ) : (
                                            <Icon
                                              name="ios-radio-button-off-outline"
                                              size={25}
                                              color="#94989C"
                                            />
                                          )}
                                        </View>
                                        <View
                                          style={
                                            globalStyle.optionsContainerView
                                          }>
                                          <Text>{item.value[language]}</Text>
                                        </View>
                                      </TouchableOpacity>
                                    )}
                                  />
                                </View>
                              )}
                            />
                          ) : (
                            <View />
                          )}
                        </View>
                      ) : (
                        <View style={{ flexDirection: 'column' }}>
                          {rowData.type == 'input' ? (
                            <View
                              style={{
                                marginTop: 20,
                                alignItems: 'center',
                                backgroundColor: '#fff'
                              }}>
                              {rowData.subType == 'number' ? (
                                <Input
                                  keyboardType={'numeric'}
                                  style={{
                                    color: 'grey',
                                    borderBottomColor: 'grey',
                                    borderBottomWidth: 1,
                                    width: WINDOW_WIDTH / 1.1
                                  }}
                                  // value={this.state.message}
                                  placeholder={strings.inputPlaceholder}
                                  value={rowData.status}
                                  placeholderTextColor="#aaaaaa"
                                  onChangeText={text =>
                                    this.inputFun(text, rowData)
                                  }
                                />
                              ) : (
                                <Input
                                  style={{
                                    color: 'grey',
                                    borderBottomColor: 'grey',
                                    borderBottomWidth: 1,
                                    width: WINDOW_WIDTH / 1.1
                                  }}
                                  // value={this.state.message}
                                  placeholder={strings.inputPlaceholder}
                                  value={rowData.status}
                                  placeholderTextColor="#aaaaaa"
                                  onChangeText={text =>
                                    this.inputFun(text, rowData)
                                  }
                                />
                              )}
                            </View>
                          ) : rowData.type == 'datepicker' ? (
                            <View
                              style={{
                                flex: 1
                              }}>
                              <Modal
                                isVisible={this.state.calendarModel}
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}>
                                <View
                                  style={{
                                    backgroundColor: '#fff',
                                    width: WINDOW_WIDTH / 1.5,
                                    padding: 30,
                                    borderRadius: 30
                                  }}>
                                  <CalendarPicker
                                    selectedDayColor="#73C2BE"
                                    selectedDayTextColor="white"
                                    onDateChange={this.onDateChange}
                                    width={WINDOW_WIDTH / 1.5}
                                    allowRangeSelection={false}
                                  />
                                  <View>
                                    <TouchableOpacity
                                      style={{}}
                                      onPress={() => this.selectDate()}>
                                      <View
                                        style={[
                                          styles.calendarButton,
                                          { backgroundColor: '#73C2BE' }
                                        ]}>
                                        <Text
                                          style={[
                                            styles.calendarText,
                                            { fontSize: 30, color: '#fff' }
                                          ]}>
                                          {strings.ok}
                                        </Text>
                                      </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                      style={{}}
                                      onPress={() =>
                                        this.setState({
                                          calendarModel: false,
                                          selectedStartDate: 'YYYY/MM/DD'
                                        })
                                      }>
                                      <View
                                        style={[
                                          styles.calendarButton,
                                          { backgroundColor: '#73C2BE' }
                                        ]}>
                                        <Text
                                          style={[
                                            styles.calendarText,
                                            { fontSize: 30, color: '#fff' }
                                          ]}>
                                          {strings.cancel}
                                        </Text>
                                      </View>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </Modal>
                              <View style={{ alignItems: 'flex-end' }}>
                                <TouchableOpacity
                                  style={{}}
                                  onPress={() =>
                                    this.setState({ calendarModel: true })
                                  }>
                                  <View style={styles.calendarButton}>
                                    {rowData.status ? (
                                      <Text style={styles.calendarText}>
                                        {this.formatDate(rowData.status)}
                                      </Text>
                                    ) : (
                                      <Text style={styles.calendarText}>
                                        {this.state.selectedStartDate}
                                      </Text>
                                    )}
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          ) : rowData.type == 'countries' ? (
                            <View
                              style={[
                                globalStyle.container,
                                { marginTop: 50 }
                              ]}>
                              <View style={styles.topView}>
                                <TextInput
                                  placeholder="Search..."
                                  style={globalStyle.optionText}
                                  returnKeyType="search"
                                  onChangeText={search =>
                                    this.searchCountry(search)
                                  }
                                />
                              </View>

                              {this.state.data &&
                              this.state.data.length === 0 ? (
                                <View style={styles.errorMsg}>
                                  <Text style={globalStyle.optionText}>
                                    {strings.noResultsFound}
                                  </Text>
                                </View>
                              ) : (
                                <View
                                  style={{
                                    borderBottomColor: 'grey',
                                    borderBottomWidth: 3
                                  }}>
                                  <FlatList
                                    style={{
                                      maxHeight: WINDOW_HEIGHT / 2
                                    }}
                                    scrollEnabled={true}
                                    data={this.state.data}
                                    extraData={this.state}
                                    keyboardShouldPersistTaps="handled"
                                    renderItem={({ item, index }) =>
                                      this._renderItem(item, index)
                                    }
                                  />
                                </View>
                              )}
                              <View
                                style={{ margin: 15, flexDirection: 'row' }}>
                                <Text
                                  style={{
                                    fontSize: 25,
                                    color: '#30C2FF',
                                    fontWeight: 'bold'
                                  }}>
                                  {strings.selectedCountry} :-
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 25,
                                    color: 'grey',
                                    fontWeight: 'bold'
                                  }}>
                                  {this.state.selected.name}
                                </Text>
                              </View>
                            </View>
                          ) : rowData.type == 'multiselect' ||
                          rowData.type == 'compoundcheckbox' ? (
                            <View>
                              <FlatList
                                style={{
                                  marginTop: 20,
                                  backgroundColor: '#fff',
                                  borderTopWidth: 1,
                                  borderTopColor: 'grey'
                                }}
                                ref={ref => (this.flatList = ref)}
                                keyExtractor={this._keyExtractor}
                                data={rowData.options}
                                renderItem={({ item, index }) => (
                                  <CheckBox
                                    checkedColor={'#83BFBC'}
                                    onPress={() =>
                                      this.checkboxFun(index, rowData.options)
                                    }
                                    title={item.value[language]}
                                    containerStyle={{
                                      backgroundColor: 'transparent',
                                      borderColor: 'transparent',
                                      borderBottomColor: 'grey'
                                    }}
                                    checked={item.status}
                                  />
                                )}
                              />
                            </View>
                          ) : rowData.type == 'compoundradio' ||
                          rowData.type == 'select' ||
                          rowData.type == 'radio' ? (
                            <FlatList
                              style={{
                                marginTop: 20,
                                marginBottom: 20,
                                backgroundColor: '#fff',
                                borderTopWidth: 1,
                                borderTopColor: 'grey'
                              }}
                              ref={ref => (this.flatList = ref)}
                              keyExtractor={this._keyExtractor}
                              data={rowData.options}
                              renderItem={({ item, index }) => (
                                <TouchableOpacity
                                  disabled={item.status}
                                  style={{
                                    flexDirection: 'row',
                                    borderBottomColor: 'grey',
                                    borderBottomWidth: 1
                                  }}
                                  onPress={() =>
                                    this.radioBtnFun(index, rowData.options)
                                  }>
                                  <View style={globalStyle.radioButton}>
                                    {item.status ? (
                                      <Icon
                                        name="ios-radio-button-on"
                                        size={25}
                                        color="#83BFBC"
                                      />
                                    ) : (
                                      <Icon
                                        name="ios-radio-button-off-outline"
                                        size={25}
                                        color="#94989C"
                                      />
                                    )}
                                  </View>
                                  <View
                                    style={globalStyle.optionsContainerView}>
                                    <Text>{item.value[language]}</Text>
                                  </View>
                                </TouchableOpacity>
                              )}
                            />
                          ) : (
                            <View />
                          )}
                        </View>
                      )}
                    </View>
                  )}
                />

                {this.state.submitForm ? (
                  // (true) ?
                  this.state.botReply ? (
                    <View
                      style={{
                        flexDirection: 'row'
                      }}>
                      <Image
                        style={{
                          width: 66,
                          height: 58,
                          marginLeft: WINDOW_WIDTH / 20
                        }}
                        source={require('../../images/robot.png')}
                      />
                      <View>
                        <Bubbles size={10} color="#83BFBC" />
                      </View>
                    </View>
                  ) : (
                    <View />
                  )
                ) : this.state.botReply ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                    <Image
                      style={{
                        width: 66,
                        height: 58,
                        marginLeft: WINDOW_WIDTH / 20
                      }}
                      source={require('../../images/robot.png')}
                    />
                    <View style={{ alignItems: 'center' }}>
                      <Bubbles size={10} color="#83BFBC" />
                    </View>
                  </View>
                ) : (
                  <View />
                )}
              </ScrollView>
            </View>
            {this.state.botReply ? (
              <View />
            ) : this.state.submitForm ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 7,
                  backgroundColor: '#fff'
                }}>
                <TouchableOpacity
                  disabled={this.state.backBtnValidation}
                  onPress={() => {
                    this.backQues()
                  }}
                  style={[
                    styles.quesButton,
                    {
                      width: WINDOW_WIDTH / 6,
                      height: WINDOW_HEIGHT / 20
                    }
                  ]}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}>
                    <Icon
                      name="ios-arrow-back"
                      size={30}
                      color={this.state.backBtnOpacity}
                      style={{ marginRight: 5, marginTop: 4 }}
                    />
                    <Text
                      style={{
                        color: this.state.backBtnOpacity,
                        fontSize: 23,
                        fontWeight: 'bold'
                      }}>
                      {' '}
                      {strings.back}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Actions.root({ type: ActionConst.RESET })
                  }}
                  style={[
                    styles.quesButton,
                    {
                      width: WINDOW_WIDTH / 5,
                      height: WINDOW_HEIGHT / 20
                    }
                  ]}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <Icon
                      name="ios-home"
                      size={30}
                      color={'#61666B'}
                      style={{ marginRight: 5 }}
                    />
                    <Text
                      style={{
                        color: '#61666B',
                        fontSize: 23,
                        fontWeight: 'bold'
                      }}>
                      {' '}
                      {strings.home}
                    </Text>
                  </View>
                </TouchableOpacity>
                {this.state.btnValidation ? (
                  <View
                    style={{
                      width: WINDOW_WIDTH / 7,
                      margin: 5,
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 20,
                      paddingRight: 20
                    }}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      this.submitForm()
                    }}
                    style={[
                      styles.quesButton,
                      {
                        width: WINDOW_WIDTH / 6.5,
                        height: WINDOW_HEIGHT / 20
                      }
                    ]}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                      <Text
                        style={{
                          color: '#61666B',
                          fontSize: 23,
                          disabled: true,
                          fontWeight: 'bold'
                        }}>
                        {' '}
                        {strings.next}
                      </Text>
                      <Icon
                        name="ios-arrow-forward"
                        size={30}
                        color="#61666B"
                        style={{ marginLeft: 7, marginTop: 4 }}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 7,
                  backgroundColor: '#fff'
                }}>
                <TouchableOpacity
                  disabled={this.state.backBtnValidation}
                  onPress={() => {
                    this.backQues()
                  }}
                  style={[
                    styles.quesButton,
                    {
                      width: WINDOW_WIDTH / 6,
                      height: WINDOW_HEIGHT / 20
                    }
                  ]}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <Icon
                      name="ios-arrow-back"
                      size={30}
                      color={this.state.backBtnOpacity}
                      style={{ marginRight: 5, marginTop: 4 }}
                    />
                    <Text
                      style={{
                        color: this.state.backBtnOpacity,
                        fontSize: 23,
                        fontWeight: 'bold'
                      }}>
                      {' '}
                      {strings.back}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Actions.root({ type: ActionConst.RESET })
                  }}
                  style={[
                    styles.quesButton,
                    {
                      width: WINDOW_WIDTH / 5,
                      height: WINDOW_HEIGHT / 20
                    }
                  ]}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                    <Icon
                      name="ios-home"
                      size={30}
                      color={'#61666B'}
                      style={{ marginRight: 5 }}
                    />
                    <Text
                      style={{
                        color: '#61666B',
                        fontSize: 23,
                        fontWeight: 'bold'
                      }}>
                      {' '}
                      {strings.home}
                    </Text>
                  </View>
                </TouchableOpacity>
                {this.state.btnValidation ? (
                  <View
                    style={{
                      width: WINDOW_WIDTH / 7,
                      margin: 5,
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 20,
                      paddingRight: 20
                    }}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      this.nextQues()
                    }}
                    style={[
                      styles.quesButton,
                      {
                        width: WINDOW_WIDTH / 7,
                        height: WINDOW_HEIGHT / 20
                      }
                    ]}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                      <Text
                        style={{
                          color: '#61666B',
                          fontSize: 23,
                          disabled: true,
                          fontWeight: 'bold'
                        }}>
                        {' '}
                        {strings.next}
                      </Text>
                      <Icon
                        name="ios-arrow-forward"
                        size={30}
                        color="#61666B"
                        style={{ marginLeft: 7, marginTop: 4 }}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}

            <DropdownAlert ref={ref => (this.dropdown = ref)} />
          </View>
        </KeyboardAvoidingView>
      </UserInactivity>
    )
  }
}

/**
 * @styles: Represents the styling section
 */

const styles = StyleSheet.create({
  textInputContainer: {
    height: 80,
    backgroundColor: 'white',
    padding: 5,
    marginTop: 10
  },

  titleContainer: {
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderColor: 'black',
    padding: 10
  },

  title: {
    fontSize: 20,
    color: '#696E75',
    textAlign: 'left',
    fontWeight: 'bold'
  },

  textInputTitle: {
    fontSize: 15,
    color: 'black',
    textAlign: 'left'
  },

  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginTop: 10,
    padding: 10
  },
  calendarContainer: {
    flex: 0.7,
    paddingVertical: height * 0.02
  },

  quesButton: {
    margin: 5,

    overflow: 'hidden',

    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight: 'bold',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  },
  textDesign: {
    fontSize: 30,
    color: 'grey'
  },
  calendarDesign: {
    width: WINDOW_WIDTH / 2
  },
  calendarButton: {
    backgroundColor: '#fff',
    margin: 10,
    alignItems: 'center',
    borderRadius: 20
  },
  calendarText: {
    fontWeight: 'bold',
    color: 'grey',
    margin: 20
  },
  topView: {
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    justifyContent: 'center',
    paddingVertical: 10,
    borderColor: 'grey'
  },
  errorMsg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalDetail)
