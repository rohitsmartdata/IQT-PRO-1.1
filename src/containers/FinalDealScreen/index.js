import React, { Component } from 'react'
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
import UserInactivity from 'react-native-user-inactivity'
import { Actions, ActionConst } from 'react-native-router-flux'
import { RightButton } from '../../components/RightButton'
import Micon from 'react-native-vector-icons/MaterialIcons'
import { strings } from '../../constants/strings'
import Ficon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { globalStyle } from '../../constants/GlobalStyleSheet.js'
import { App_Constant } from '../../constants/Costant.js'
import Icon from 'react-native-vector-icons/Ionicons'
import Accordion from 'react-native-collapsible/Accordion'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getQues,
  clearQuesData,
  getDiseaseList,
  logout
} from '../../actions/authActions/loginActions'

const { height, width } = Dimensions.get('window')
const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height
const mapStateToProps = ({ QuesReducer, BankIdReducer }) => {
  return {
    quesDetails: QuesReducer.quesDetails,
    diseaseList: QuesReducer.diseaseList,
    bankIdToken: BankIdReducer.bankIdToken,
    autoStartToken: BankIdReducer.autoStartToken,
    bankIdResponse: BankIdReducer.bankIdResponse,
    bankidResponseCheck: BankIdReducer.bankidResponseCheck
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getQues,
      clearQuesData,

      getDiseaseList,
      logout
    },
    dispatch
  )
}
const toNumber = str => Number(str)
class FinalDealScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeSections: [],
      test: true,
      active: true,
      text: '180000'
    }
  }
  onAction = active => {
    if (active) {
      console.log(active)
    } else {
      debugger
      AsyncStorage.setItem('name', '')
      AsyncStorage.setItem('createQuesId', '')
      AsyncStorage.setItem('againQuesCheck', '')
      AsyncStorage.setItem('answeredQuestionArray', '')

      Actions.root1({ type: ActionConst.RESET })
    }
  }
  logout() {
    debugger
    AsyncStorage.getItem('createQuesId').then(value =>
      this.props.logout(
        'https://iqtriage.daking.se/questionnaire_complete/' + value
      )
    )
  }
  questionnaireScreenFun() {
    AsyncStorage.setItem('againQuesCheck', 'abc')
    Actions.root({ type: ActionConst.RESET })
  }
  render() {
    const { active, text } = this.state
    return (
      <UserInactivity
        timeForInactivity={toNumber(text)}
        checkInterval={1000}
        onAction={this.onAction}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#ECEFF1',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: 'grey',
              marginBottom: 15
            }}>
            {strings.finalScreenString1}
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: 'grey',
              marginBottom: 15
            }}>
            {strings.finalScreenString2}
          </Text>
          <TouchableOpacity onPress={() => this.questionnaireScreenFun()}>
            <View style={styles.buttonUi}>
              <Text style={styles.buttonText}>{strings.yes}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.logout()}>
            <View style={styles.buttonUi}>
              <Text style={styles.buttonText}>
                {strings.finalScreenString3}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </UserInactivity>
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
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'grey'
  },
  buttonUi: {
    backgroundColor: '#fff',
    width: WINDOW_WIDTH / 1.5,
    borderRadius: 10,
    padding: WINDOW_HEIGHT / 25,
    marginTop: WINDOW_HEIGHT / 30,
    alignItems: 'center',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'grey',
    shadowOffset: { height: 10, width: 0 }
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinalDealScreen)
