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
  AsyncStorage
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
import { globalStyle } from '../../constants/GlobalStyleSheet.js'
import { languageList } from '../../constants/language'
import { CheckBox } from 'react-native-elements'
import { Input } from 'native-base'
import { Actions, ActionConst } from 'react-native-router-flux'
import { RightButton } from '../../components/RightButton'
import SplashScreen from 'react-native-splash-screen'
import Icon from 'react-native-vector-icons/Ionicons'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getQues } from '../../actions/QuesActions/QuesActions'
import {
  login,
  loginResponse,
  clearQRData
} from '../../actions/authActions/loginActions'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader'
import Modal from 'react-native-modal'
import { NetworkInfo } from 'react-native-network-info'
import { NativeModules, AppState } from 'react-native'
import QRCode from 'react-native-qrcode'
import { strings } from '../../constants/strings'
import DropdownAlert from 'react-native-dropdownalert'
const { height, width } = Dimensions.get('window')
const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height

const mapStateToProps = ({ QuesReducer, BankIdReducer }) => {
  return {
    quesDetails: QuesReducer.quesDetails,
    bankIdToken: BankIdReducer.bankIdToken,
    autoStartToken: BankIdReducer.autoStartToken,
    bankIdResponse: BankIdReducer.bankIdResponse,
    bankidResponseCheck: BankIdReducer.bankidResponseCheck,
    loaderCheck: BankIdReducer.loaderCheck,
    internetCheck: BankIdReducer.internetCheck
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getQues,
      login,
      loginResponse,
      clearQRData
    },
    dispatch
  )
}

var outputArr = {}

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
class QRCodeAuth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phnNo: '',
      homeNo: '',
      email: '',
      selectedColor: '#87D791',
      test: '',
      checked: true,
      botReply: false,
      submitForm: false,
      fname: '',
      backBtnValidation: true,
      backBtnOpacity: 'gray',
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
      routeDirection: this.props.routePage
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
    // NetworkInfo.getIPAddress(ip => {
    //   console.log(ip)
    // })

    // // Get IPv4 IP
    // NetworkInfo.getIPV4Address(ipv4 => {
    //   console.log(ipv4)
    // })

    // // Get Broadcast
    // NetworkInfo.getBroadcast(address => {
    //   console.log(address)
    // })

    // // Get SSID
    // NetworkInfo.getSSID(ssid => {
    //   console.log(ssid)
    // })1

    // // Get BSSID
    // NetworkInfo.getBSSID(ssid => {
    //   console.log(ssid)
    // })

    let url2 =
      'https://app.bankid.com/?autostarttoken=' +
      token +
      '&redirect=iqform://?orderRef=' +
      orderRef

    console.log(NativeModules, url2, 'NativeModulesNativeModules')

    var CalendarManager = NativeModules.CalendarManager

    CalendarManager.checkBankRoll(url2)
  }

  /**
   * @componentDidMount: Represents the life cycle. As soon as the render method has been executed the componentDidMount function is called.
   */
  componentDidMount() {
    Keyboard.dismiss()
    SplashScreen.hide()
    this.setState({ botReply: true })
    AppState.addEventListener('change', this._handleAppStateChange)
  }
  /**
   * @componentWillMount:- Represents the life cycle.componentWillMount is called before the render method is executed
   */
  componentWillMount() {
    Actions.refresh({ right: RightButton(Actions.LongAnswerType) })
    this.bankIdToken()
    this.props.clearQRData()
  }

  /**
   * @componentWillReceiveProps: Represents the life cycle.componentWillReceiveProps is only called when the props have changed and when this is not an initial rendering.
   * Note: This function is used to get data from API hit and distribute for further use.
   */
  componentWillReceiveProps(Props) {
    debugger
    if (Props.loaderCheck) {
      if (Props.internetCheck) {
        this.dropdown.alertWithType(
          'error',
          strings.noInternet,
          strings.noInternetString
        )
        setTimeout(() => {
          Actions.pop()
        }, 4000)
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
      debugger

      this.asyncCallFun()

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
      //   alert(JSON.stringify(Props.bankIdResponse))
    }
  }

  async asyncCallFun() {
    debugger

    const userDetails = await fetch(
      'https://auth.daking.se/bankid/collect/' + this.state.orderRef
    )

    const userDetailsJSON = await userDetails.json()
    if (userDetailsJSON.http_status) {
      // alert(userDetailsJSON.http_status)
      this.asyncCallFun()
    } else {
      // alert(JSON.stringify(userDetailsJSON))
      AsyncStorage.setItem('name', JSON.stringify(userDetailsJSON))
      if (this.state.routeDirection == 'PersonalDetail') {
        Actions.root({ type: ActionConst.RESET })
      } else {
        Actions.root3({ type: ActionConst.RESET })
      }
    }
    // this.setState({ data: userDetailsJSON })
    // console.log('userDetailsJSON', userDetailsJSON)
  }

  /**
   * @render: Represents the UI interface of the app
   */
  render() {
    return (
      <View
        style={{
          flex: 1,

          backgroundColor: '#ECEFF1'
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            paddingTop: WINDOW_HEIGHT / 30,
            paddingBottom: WINDOW_HEIGHT / 50
          }}>
          <TouchableOpacity
            style={{ flexDirection: 'row' }}
            onPress={() => {
              this.setState({ QRtext: '' })
              Actions.pop()
            }}>
            <Icon
              style={{ paddingLeft: 10 }}
              name="ios-arrow-back"
              size={25}
              color="#008FAC"
            />
            <Text style={{ fontSize: 20, color: '#83BFBC', marginLeft: 10 }}>
              {strings.back}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <View style={{ margin: WINDOW_HEIGHT / 30 }}>
              <Image
                style={{ width: WINDOW_WIDTH, height: WINDOW_HEIGHT / 2.2 }}
                source={require('../../images/patients.png')}
              />
            </View>
            <Text style={styles.textDesign}>{strings.qrAuthScreenString1}</Text>
            <Text style={styles.textDesign}>
              {strings.qrAuthScreenString2}{' '}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ECEFF1'
            }}>
            <View>
              <Bubbles size={this.state.bubbleSize} color="#57d3f2" />
            </View>
            <View style={{ margin: WINDOW_HEIGHT / 50 }}>
              <QRCode
                value={this.state.QRtext}
                size={this.state.QRSize}
                bgColor="black"
                fgColor="white"
              />
            </View>
          </View>
        </View>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </View>

      // </View>
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

    paddingTop: 10,
    paddingBottom: 10,
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
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QRCodeAuth)
