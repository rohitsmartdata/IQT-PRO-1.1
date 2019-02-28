import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
  Image,
  AsyncStorage,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native'

import Loader from 'react-native-modal-loader'
import { Actions, ActionConst } from 'react-native-router-flux'
import { LogoutModal } from '../../constants/Modal'
import {
  login,
  loginResponse,
  personalNoLogin
} from '../../actions/authActions/loginActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RightButton } from '../../components/RightButton'
import Micon from 'react-native-vector-icons/MaterialIcons'
import Ficon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { globalStyle } from '../../constants/GlobalStyleSheet.js'
import { App_Constant } from '../../constants/Costant.js'
import Icon from 'react-native-vector-icons/Ionicons'
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
    staffUserResponse: BankIdReducer.staffUserResponse,
    isLoading: BankIdReducer.isLoading,
    loaderCheck: BankIdReducer.loaderCheck
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login,
      loginResponse,
      personalNoLogin
    },
    dispatch
  )
}
class StaffDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      abc: 'a',
      staffDetails: '',
      ssnInput: '',
      userDetails: '',
      loading: false
    }
  }
  componentWillMount() {
    AsyncStorage.getItem('name').then(value =>
      this.setState({ staffDetails: JSON.parse(value) })
    )
    console.log(this.state.staffDetails)
  }
  componentWillReceiveProps(Props) {
    debugger
    if (Props.staffUserResponse.firstName) {
      this.setState({ userDetails: Props.staffUserResponse, loading: false })
    } else {
      debugger
      this.dropdown.alertWithType('error', 'Error', 'Please enter valid SSN')
      this.setState({ loading: false })
    }
  }
  fetchDetail() {
    debugger
    this.setState({ userDetails: '', loading: true })
    var ssnInput = this.state.ssnInput
    if (ssnInput.length == 12) {
      this.props.personalNoLogin(ssnInput, 'StaffDetail')
      this.setState({ ssnInput: '' })
    } else {
      this.dropdown.alertWithType('error', 'Error', 'Please enter valid SSN')
      this.setState({ ssnInput: '', loading: false })
    }
  }
  activateUser() {
    if (this.state.userDetails.firstName) {
      Actions.root({ type: ActionConst.RESET })
    } else {
      this.dropdown.alertWithType('error', 'Error', 'Please fetch user details')
    }
  }
  passcodeLogin() {
    this.dropdown.alertWithType('success', 'Notification', 'Comming Soon')
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ECEFF1'
        }}>
        <KeyboardAvoidingView>
          <Loader loading={this.state.loading} color="#61666B" />
          <View style={{}}>
            <View
              style={{
                backgroundColor: '#fff',
                paddingTop: WINDOW_HEIGHT / 25,
                paddingBottom: WINDOW_HEIGHT / 60,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <View>
                <Text style={{ color: '#fff' }}>a</Text>
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text
                  style={{ color: 'grey', fontSize: 20, fontWeight: 'bold' }}>
                  {this.state.staffDetails.firstName} {''}
                  {this.state.staffDetails.lastName}
                </Text>
                <Text
                  style={{ color: 'grey', fontSize: 20, fontWeight: 'bold' }}>
                  {this.state.staffDetails.ssn}
                </Text>
              </View>
              <LogoutModal />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: WINDOW_HEIGHT / 40
              }}>
              <Text style={{ fontSize: 40, color: 'grey' }}>
                Cybemed 360 Staff Mode
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <View style={{ margin: WINDOW_HEIGHT / 40 }}>
                <Image
                  style={{ width: WINDOW_WIDTH, height: WINDOW_HEIGHT / 2.2 }}
                  source={require('../../images/patients.png')}
                />
              </View>
            </View>

            <View
              style={{
                marginTop: WINDOW_HEIGHT / 50,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text style={{ color: 'grey', fontSize: 25 }}>
                Fetch Person / Patient
              </Text>
              <View
                style={{
                  width: WINDOW_WIDTH / 3,
                  backgroundColor: '#C4C4C4',
                  height: WINDOW_HEIGHT / 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  margin: 20
                }}>
                <TextInput
                  style={{
                    width: WINDOW_WIDTH / 4.5,
                    color: '#fff',
                    margin: 10,
                    borderRadius: 10,
                    fontSize: 25
                  }}
                  maxLength={12}
                  onChangeText={text => this.setState({ ssnInput: text })}
                  value={this.state.ssnInput}
                  keyboardType={'numeric'}
                  placeholderTextColor={'#fff'}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => {
                    this.fetchDetail()
                  }}>
                  <View style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Fetch</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.activateUser()
                  }}>
                  <View style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>Activate</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: 30
                }}>
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
            </View>
          </View>
          <DropdownAlert ref={ref => (this.dropdown = ref)} />
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  centuryContainer: {
    marginBottom: WINDOW_HEIGHT / 15,
    height: WINDOW_HEIGHT / 10,
    width: WINDOW_WIDTH / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#30C2FF'
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 17,
    borderRadius: 15,
    margin: 10,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'grey',
    shadowOffset: { height: 10, width: 0 },
    width: WINDOW_WIDTH / 7
  },
  buttonText: {
    fontSize: 20,
    color: 'grey',
    fontWeight: 'bold'
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffDetail)
