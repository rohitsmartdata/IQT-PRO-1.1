import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  TextInput,
  FlatList
} from 'react-native'
import DropdownAlert from 'react-native-dropdownalert'
import { Actions } from 'react-native-router-flux'
import { RightButton } from '../../components/RightButton'
import Micon from 'react-native-vector-icons/MaterialIcons'
import Ficon from 'react-native-vector-icons/FontAwesome'
import {
  login,
  loginResponse,
  personalNoLogin
} from '../../actions/authActions/loginActions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { globalStyle } from '../../constants/GlobalStyleSheet.js'
import { App_Constant } from '../../constants/Costant.js'
import Icon from 'react-native-vector-icons/Ionicons'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loader from 'react-native-modal-loader'
import { strings } from '../../constants/strings'
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
    isLoading: BankIdReducer.isLoading,
    loaderCheck: BankIdReducer.loaderCheck,
    internetCheck: BankIdReducer.internetCheck
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

var valueArr = [
  { value: 'X', color: '#83BFBC' },
  { value: 'X', color: '#83BFBC' },
  { value: 'X', color: '#83BFBC' },
  { value: 'X', color: '#83BFBC' },
  { value: 'X', color: '#83BFBC' },
  { value: 'X', color: '#83BFBC' },
  { value: 'X', color: '#83BFBC' },
  { value: 'X', color: '#83BFBC' },
  { value: 'X', color: '#83BFBC' },
  { value: 'X', color: '#83BFBC' },
  { value: 'X', color: '#83BFBC' },
  { value: 'X', color: '#83BFBC' }
]
var valueArrIndex = 2
var currentDateData = new Date()
var currentYear = currentDateData.getFullYear().toString()
var currentMonth = ''
var currentDate = ''
class PersonalNumber extends Component {
  constructor(props) {
    super(props)
    this.state = {
      abc: 'abc',
      loading: false
    }
  }
  enterPersonalNo(value) {
    if (value == '<') {
      if (valueArrIndex > 2) {
        valueArrIndex--
        valueArr.splice(valueArrIndex, 1, { value: 'X', color: '#83BFBC' })
        this.setState({ abc: 'red' })
      }
    } else {
      if (valueArrIndex < 12) {
        switch (valueArrIndex) {
          case 2:
            if (this.props.centuryNo == '2000') {
              if (value <= currentYear[2]) {
                this.updateResult(value)
              } else {
                this.dropdown.alertWithType(
                  'error',
                  strings.personalNumber,
                  strings.personalNumberString
                )
              }
            } else {
              this.updateResult(value)
            }
            break
          case 3:
            if (this.props.centuryNo == '2000') {
              if (valueArr[valueArrIndex - 1].value == currentYear[2]) {
                if (value <= currentYear[3]) {
                  this.updateResult(value)
                } else {
                  this.dropdown.alertWithType(
                    'error',
                    strings.personalNumber,
                    strings.personalNumberString
                  )
                }
              } else {
                if (value <= parseInt(currentYear[2] + currentYear[3])) {
                  this.updateResult(value)
                } else {
                  this.dropdown.alertWithType(
                    'error',
                    strings.personalNumber,
                    strings.personalNumberString
                  )
                }
              }
            } else {
              this.updateResult(value)
            }
            break
          case 4:
            if (
              parseInt(
                valueArr[0].value +
                  valueArr[1].value +
                  valueArr[2].value +
                  valueArr[3].value
              ) == currentYear
            ) {
              this.monthCheckIndex1Fun(currentMonth[0], value)
            } else {
              this.monthCheckIndex1Fun(1, value)
            }
            break
          case 5:
            if (
              parseInt(
                valueArr[0].value +
                  valueArr[1].value +
                  valueArr[2].value +
                  valueArr[3].value
              ) == currentYear
            ) {
              this.monthCheckIndex2Fun(currentMonth[1], currentMonth, value)
            } else {
              this.monthCheckIndex2Fun(2, 12, value)
            }

            break
          case 6:
            var days = this.getDays()
            if (
              parseInt(
                valueArr[0].value +
                  valueArr[1].value +
                  valueArr[2].value +
                  valueArr[3].value
              ) == currentYear &&
              parseInt(valueArr[4].value + valueArr[5].value) == currentMonth
            ) {
              this.dateCheckIndex1Fun(currentDate[0], value)
            } else {
              this.dateCheckIndex1Fun(days[0], value)
            }

            break
          case 7:
            var days = this.getDays()
            if (
              parseInt(
                valueArr[0].value +
                  valueArr[1].value +
                  valueArr[2].value +
                  valueArr[3].value
              ) == currentYear &&
              parseInt(valueArr[4].value + valueArr[5].value) == currentMonth
            ) {
              this.dateCheckIndex2Fun(currentDate, value)
            } else {
              this.dateCheckIndex2Fun(days, value)
            }
            break

          case 11:
            if (value == 'R') {
              this.updateResult(value)
              var ssn = ''
              for (i = 0; i < valueArr.length; i++) {
                ssn = ssn + valueArr[i].value
              }
              this.setState({ loading: true })
              this.props.personalNoLogin(ssn, 'PersonalNumber')
            } else {
              this.updateResult(value)
              this.validSsn()
            }
            break
          default:
            if (value != 'R') {
              this.updateResult(value)
            } else {
              this.dropdown.alertWithType(
                'error',
                strings.personalNumber,
                strings.personalNumberString
              )
            }
        }
      }
    }
  }
  validSsn() {
    var ssn = ''
    // remove century, 2 first digits
    for (i = 2; i < valueArr.length; i++) {
      ssn = ssn + valueArr[i].value
    }

    var sum = 0
    var total = 0
    var count = 0
    for (i = 0; i < ssn.length; i++) {
      sum = parseInt(ssn[i])

      if (count % 2 == 0) {
        sum *= 2
        if (sum > 9) {
          let sumString = sum
          let characters = sumString.toString()
          sum = parseInt(characters[0]) + parseInt(characters[1])
        }
      }
      total += sum
      count += 1
    }

    let totalString = total.toString()
    let lastDigit = totalString[totalString.length - 1]
    let control = parseInt(lastDigit)
    if (control == 0) {
      var ssnSuccess = ''
      for (i = 0; i < valueArr.length; i++) {
        ssnSuccess = ssnSuccess + valueArr[i].value
      }
      this.setState({ loading: true })
      this.props.personalNoLogin(ssnSuccess, 'PersonalNumber')
      return true
    }

    valueArrIndex--
    valueArr.splice(valueArrIndex, 1, { value: 'X', color: '#83BFBC' })
    this.setState({ abc: 'red' })
    this.dropdown.alertWithType(
      'error',
      strings.personalNumber,
      strings.personalNumberString
    )
    return false
  }

  updateResult(value) {
    valueArr.splice(valueArrIndex, 1, {
      value: value,
      color: 'grey'
    })
    valueArrIndex = valueArrIndex + 1
    this.setState({ abc: 'red' })
  }
  monthCheckIndex1Fun(monthIndex, value) {
    if (value <= monthIndex) {
      this.updateResult(value)
    } else {
      this.dropdown.alertWithType(
        'error',
        strings.personalNumber,
        strings.personalNumberString
      )
    }
  }
  monthCheckIndex2Fun(value1, value2, value) {
    if (valueArr[valueArrIndex - 1].value == 1) {
      if (value <= value1) {
        this.updateResult(value)
      } else {
        this.dropdown.alertWithType(
          'error',
          strings.personalNumber,
          strings.personalNumberString
        )
      }
    } else {
      if (value <= parseInt(value2) && value != 0) {
        this.updateResult(value)
      } else {
        this.dropdown.alertWithType(
          'error',
          strings.personalNumber,
          strings.personalNumberString
        )
      }
    }
  }
  getDays() {
    return new Date(
      parseInt(
        valueArr[0].value +
          valueArr[1].value +
          valueArr[2].value +
          valueArr[3].value
      ),
      parseInt(valueArr[4].value + valueArr[5].value),
      0
    )
      .getDate()
      .toString()
  }
  dateCheckIndex1Fun(date, value) {
    if (value <= date) {
      this.updateResult(value)
    } else {
      this.dropdown.alertWithType(
        'error',
        strings.personalNumber,
        strings.personalNumberString
      )
    }
  }

  dateCheckIndex2Fun(date, value) {
    if (
      valueArr[valueArrIndex - 1].value != 0 &&
      valueArr[valueArrIndex - 1].value != date[0]
    ) {
      if (value <= parseInt(date)) {
        this.updateResult(value)
      } else {
        this.dropdown.alertWithType(
          'error',
          strings.personalNumber,
          strings.personalNumberString
        )
      }
    } else if (valueArr[valueArrIndex - 1].value == date[0]) {
      if (value <= date[1]) {
        this.updateResult(value)
      } else {
        this.dropdown.alertWithType(
          'error',
          strings.personalNumber,
          strings.personalNumberString
        )
      }
    } else {
      if (value != 0) {
        this.updateResult(value)
      } else {
        this.dropdown.alertWithType(
          'error',
          strings.personalNumber,
          strings.personalNumberString
        )
      }
    }
  }
  componentWillMount() {
    var checkCurrentMonth = (currentDateData.getMonth() + 1).toString()
    var checkCurrentDate = currentDateData.getDate().toString()

    if (checkCurrentMonth.length < 2) {
      currentMonth = '0' + checkCurrentMonth
    } else {
      currentMonth = checkCurrentMonth
    }
    if (checkCurrentDate.length < 2) {
      currentDate = '0' + checkCurrentDate
    } else {
      currentDate = checkCurrentDate
    }
    console.log(currentMonth + currentDate)
    valueArr[0].value = this.props.centuryNo[0]
    valueArr[0].color = 'grey'
    valueArr[1].value = this.props.centuryNo[1]
    valueArr[1].color = 'grey'
  }
  componentWillReceiveProps(Props) {
    if (Props.isLoading) {
    } else {
      if (Props.internetCheck) {
        this.dropdown.alertWithType(
          'error',
          strings.noInternet,
          strings.noInternetString
        )
      }
      if (Props.loaderCheck) {
        this.dropdown.alertWithType(
          'error',
          strings.personalNumber,
          strings.personalNumberString
        )
      }
      this.setState({ loading: false })
      valueArr = [
        { value: valueArr[0].value, color: 'grey' },
        { value: valueArr[1].value, color: 'grey' },
        { value: 'X', color: '#83BFBC' },
        { value: 'X', color: '#83BFBC' },
        { value: 'X', color: '#83BFBC' },
        { value: 'X', color: '#83BFBC' },
        { value: 'X', color: '#83BFBC' },
        { value: 'X', color: '#83BFBC' },
        { value: 'X', color: '#83BFBC' },
        { value: 'X', color: '#83BFBC' },
        { value: 'X', color: '#83BFBC' },
        { value: 'X', color: '#83BFBC' }
      ]
      valueArrIndex = 2
    }
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ECEFF1'
        }}>
        <Loader loading={this.state.loading} color="#61666B" />
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
              valueArr = [
                { value: 'X', color: '#83BFBC' },
                { value: 'X', color: '#83BFBC' },
                { value: 'X', color: '#83BFBC' },
                { value: 'X', color: '#83BFBC' },
                { value: 'X', color: '#83BFBC' },
                { value: 'X', color: '#83BFBC' },
                { value: 'X', color: '#83BFBC' },
                { value: 'X', color: '#83BFBC' },
                { value: 'X', color: '#83BFBC' },
                { value: 'X', color: '#83BFBC' },
                { value: 'X', color: '#83BFBC' },
                { value: 'X', color: '#83BFBC' }
              ]
              valueArrIndex = 2
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
        <View style={{ paddingTop: WINDOW_WIDTH / 10 }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ECEFF1',
              marginBottom: WINDOW_HEIGHT / 10
            }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'grey' }}>
              {strings.personalNumberScreenString1}
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ECEFF1',
            flexDirection: 'row'
          }}>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.fontTextSize}>Y</Text>
            <Text style={[styles.fontTextSize, { color: valueArr[0].color }]}>
              {valueArr[0].value}
            </Text>
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.fontTextSize}>Y</Text>
            <Text style={[styles.fontTextSize, { color: valueArr[1].color }]}>
              {valueArr[1].value}
            </Text>
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.fontTextSize}>Y</Text>
            <Text style={[styles.fontTextSize, { color: valueArr[2].color }]}>
              {valueArr[2].value}
            </Text>
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.fontTextSize}>Y</Text>
            <Text style={[styles.fontTextSize, { color: valueArr[3].color }]}>
              {valueArr[3].value}
            </Text>
          </View>
          <View style={{ marginLeft: 50 }}>
            <Text style={styles.fontTextSize}>M</Text>
            <Text style={[styles.fontTextSize, { color: valueArr[4].color }]}>
              {valueArr[4].value}
            </Text>
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.fontTextSize}>M</Text>
            <Text style={[styles.fontTextSize, { color: valueArr[5].color }]}>
              {valueArr[5].value}
            </Text>
          </View>
          <View style={{ marginLeft: 50 }}>
            <Text style={styles.fontTextSize}>D</Text>
            <Text style={[styles.fontTextSize, { color: valueArr[6].color }]}>
              {valueArr[6].value}
            </Text>
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.fontTextSize}>D</Text>
            <Text style={[styles.fontTextSize, { color: valueArr[7].color }]}>
              {valueArr[7].value}
            </Text>
          </View>
          <View style={{ marginLeft: 50 }}>
            <Text style={styles.fontTextSize}>N</Text>
            <Text style={[styles.fontTextSize, { color: valueArr[8].color }]}>
              {valueArr[8].value}
            </Text>
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.fontTextSize}>N</Text>
            <Text style={[styles.fontTextSize, { color: valueArr[9].color }]}>
              {valueArr[9].value}
            </Text>
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.fontTextSize}>N</Text>
            <Text style={[styles.fontTextSize, { color: valueArr[10].color }]}>
              {valueArr[10].value}
            </Text>
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.fontTextSize}>N</Text>
            <Text style={[styles.fontTextSize, { color: valueArr[11].color }]}>
              {valueArr[11].value}
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: WINDOW_HEIGHT / 50
          }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <TouchableOpacity
              onPress={() => {
                this.enterPersonalNo('1')
              }}>
              <View style={styles.personalNoBorderDesign}>
                <Text style={styles.personalNoTextDesign}>1</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.enterPersonalNo('4')
              }}>
              <View style={styles.personalNoBorderDesign}>
                <Text style={styles.personalNoTextDesign}>4</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.enterPersonalNo('7')
              }}>
              <View style={styles.personalNoBorderDesign}>
                <Text style={styles.personalNoTextDesign}>7</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.enterPersonalNo('<')
              }}>
              <View style={styles.personalNoBorderDesign}>
                <Icon
                  style={styles.personalNoTextDesign}
                  name="ios-arrow-back"
                  size={40}
                  color="#008FAC"
                />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <TouchableOpacity
              onPress={() => {
                this.enterPersonalNo('2')
              }}>
              <View style={styles.personalNoBorderDesign}>
                <Text style={styles.personalNoTextDesign}>2</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.enterPersonalNo('5')
              }}>
              <View style={styles.personalNoBorderDesign}>
                <Text style={styles.personalNoTextDesign}>5</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.enterPersonalNo('8')
              }}>
              <View style={styles.personalNoBorderDesign}>
                <Text style={styles.personalNoTextDesign}>8</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.enterPersonalNo('0')
              }}>
              <View style={styles.personalNoBorderDesign}>
                <Text style={styles.personalNoTextDesign}>0</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <TouchableOpacity
              onPress={() => {
                this.enterPersonalNo('3')
              }}>
              <View style={styles.personalNoBorderDesign}>
                <Text style={styles.personalNoTextDesign}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.enterPersonalNo('6')
              }}>
              <View style={styles.personalNoBorderDesign}>
                <Text style={styles.personalNoTextDesign}>6</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.enterPersonalNo('9')
              }}>
              <View style={styles.personalNoBorderDesign}>
                <Text style={styles.personalNoTextDesign}>9</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.enterPersonalNo('R')
              }}>
              <View style={styles.personalNoBorderDesign}>
                <Text style={styles.personalNoTextDesign}>R</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
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
    backgroundColor: '#FDA110'
  },
  fontTextSize: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'grey'
  },
  personalNoTextDesign: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'grey'
  },
  personalNoBorderDesign: {
    backgroundColor: '#fff',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
    margin: 10,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'grey',
    shadowOffset: { height: 10, width: 0 }
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalNumber)
