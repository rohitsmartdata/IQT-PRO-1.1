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
  Switch
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
import { strings } from '../../constants/strings'
import { globalStyle } from '../../constants/GlobalStyleSheet.js'
import { CheckBox } from 'react-native-elements'
import { Input } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { RightButton } from '../../components/RightButton'
import SplashScreen from 'react-native-splash-screen'
import Triangle from 'react-native-triangle'
import SelectCountry from '../Selectcountry'
import DateSelection from '../DateSelection'
import SliderTypeAnswer from '../SliderTypeAnswer'
import RadioTypeAnswer from '../RadioTypeAnswer'
import RadioTypeAnswer2 from '../RadioTypeAnswer2'
import Icon from 'react-native-vector-icons/Ionicons'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DropdownAlert from 'react-native-dropdownalert'
import { getQues } from '../../actions/QuesActions/QuesActions'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader'
import Modal from 'react-native-modal'

const { height, width } = Dimensions.get('window')
const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height

const mapStateToProps = ({ QuesReducer }) => {
  return {
    quesDetails: QuesReducer.quesDetails
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getQues
    },
    dispatch
  )
}
var testVal = false

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      switchBtnValue: this.props.switchBtnValue,
      timeValue: this.props.timeValue
    }
  }

  switchToggleFun() {
    this.setState({ switchBtnValue: !this.state.switchBtnValue })
    if (this.state.switchBtnValue == false) {
      this.setState({ timeValue: 0 })
    }
  }
  setTime(value) {
    if (value == 'add') {
      if (this.state.timeValue < 60) {
        this.setState({ timeValue: this.state.timeValue + 1 })
      }
    } else {
      if (this.state.timeValue > 0) {
        this.setState({ timeValue: this.state.timeValue - 1 })
      }
    }
  }
  popPage() {
    debugger
    if (this.state.timeValue == 0 && this.state.switchBtnValue == true) {
      this.dropdown.alertWithType('info', 'Attention!', 'Please set time')
    } else {
      Actions.pop({
        refresh: {
          switchBtnValue: this.state.switchBtnValue,
          timeValue: this.state.timeValue
        }
      })
    }
  }
  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <View
          style={{
            paddingTop: 25,
            paddingBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: WINDOW_WIDTH,
            backgroundColor: '#fff'
          }}>
          <TouchableOpacity
            style={{ marginLeft: 10, flexDirection: 'row' }}
            onPress={() => this.popPage()}>
            <Icon
              name="ios-arrow-back"
              size={25}
              color="#008FAC"
              style={{ marginRight: 10, marginTop: 4 }}
            />
          </TouchableOpacity>

          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'grey', fontSize: 17 }}>
              {strings.settings}
            </Text>
          </View>
          <View>
            <Icon
              name="ios-settings"
              size={25}
              color="grey"
              style={{ marginRight: 10, marginTop: 4, opacity: 0 }}
            />
          </View>
        </View>
        <View style={{ backgroundColor: '#ECEFF1', flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            <Text
              style={{
                margin: 10,
                fontSize: 17,
                color: 'grey',
                fontWeight: 'bold'
              }}>
              {strings.settingsScreenString1}
            </Text>
            <Switch
              backgroundColor="#fff"
              borderRadius={17}
              onTintColor="#83BFBC"
              style={{ margin: 10 }}
              onValueChange={value => this.switchToggleFun()}
              value={this.state.switchBtnValue}
            />
          </View>
          {this.state.switchBtnValue ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20
              }}>
              <Text
                style={{
                  margin: 10,
                  fontSize: 17,
                  color: 'grey',
                  fontWeight: 'bold'
                }}>
                {strings.settingsScreenString2}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginRight: 10
                }}>
                <TouchableOpacity
                  style={styles.timerButton}
                  onPress={() => this.setTime('minus')}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 17,
                      marginLeft: 1,
                      marginRight: 1,
                      fontWeight: 'bold'
                    }}>
                    -
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: WINDOW_WIDTH / 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <Text style={{ fontSize: 20, color: 'grey' }}>
                    {this.state.timeValue}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.timerButton}
                  onPress={() => this.setTime('add')}>
                  <Text
                    style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View />
          )}
          <DropdownAlert ref={ref => (this.dropdown = ref)} />
        </View>
      </View>
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
  timerButton: {
    backgroundColor: '#83BFBC',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 20,
    fontSize: 20,
    overflow: 'hidden',
    color: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
