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
import Modal from 'react-native-modal'
import UserInactivity from 'react-native-user-inactivity'
import { Actions, ActionConst } from 'react-native-router-flux'
import { LogoutModal, AboutModal } from '../../constants/Modal'
import DropdownAlert from 'react-native-dropdownalert'
import { RightButton } from '../../components/RightButton'
import { strings } from '../../constants/strings'
import Micon from 'react-native-vector-icons/MaterialIcons'
import Ficon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { globalStyle } from '../../constants/GlobalStyleSheet.js'
import { App_Constant } from '../../constants/Costant.js'
import Icon from 'react-native-vector-icons/Ionicons'
import Accordion from 'react-native-collapsible/Accordion'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loader from 'react-native-modal-loader'
import {
  getQues,
  clearQuesData,
  getDiseaseList,
  getHomeScreenList
} from '../../actions/QuesActions/QuesActions'
import { login, loginResponse } from '../../actions/authActions/loginActions'
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
    bankidResponseCheck: BankIdReducer.bankidResponseCheck,
    homeScreenList: QuesReducer.homeScreenList,
    isLoading: QuesReducer.isLoading,
    homeScreenFail: QuesReducer.homeScreenFail
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getQues,
      clearQuesData,
      login,
      loginResponse,
      getHomeScreenList,
      getDiseaseList
    },
    dispatch
  )
}

var getValue = ''
/**
 * @userQues: this array is used to store questions form server.
 */
var userQues = []
/**
 * @language: this variable is used to store the selected language .
 */
var language = ''

/**
 * @language: this variable is used to store the selected language name .
 */

var languageName = 'English'
var flag = require('../../images/flagBritish.png')
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
var SECTIONS = []

const toNumber = str => Number(str)
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: '',
      activeSections: [],
      test: true,
      userDetails: '',
      abc: '',
      languageModal: false,
      active: true,
      text: '180000',
      loaderLoading: true
    }
  }
  onAction = active => {
    if (active) {
      console.log(active)
    } else {
      debugger
      if (Actions.currentScene == 'HomeScreen') {
        AsyncStorage.setItem('name', '')
        AsyncStorage.setItem('createQuesId', '')
        AsyncStorage.setItem('againQuesCheck', '')
        AsyncStorage.setItem('answeredQuestionArray', '')
        Actions.root1({ type: ActionConst.RESET })
      }
    }
  }

  _renderHeader = section => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 66,
              height: 58,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Image
              style={{
                marginRight: 15,
                width: WINDOW_WIDTH / 15,
                height: WINDOW_HEIGHT / 20
              }}
              source={{
                uri: section.diseaseImage
              }}
            />
          </View>
          <View style={styles.header}>
            <Text style={styles.headerText}>{section.title[language]}</Text>
            <Text style={styles.headerSubText}>
              {section.subTitle[language]}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {section.count > 0 ? (
            <View
              style={{
                width: WINDOW_WIDTH / 23,
                height: WINDOW_HEIGHT / 27,
                margin: WINDOW_WIDTH / 30,
                backgroundColor: '#83BFBC',
                padding: 10,
                borderRadius: 20,
                alignItems: 'center'
              }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                {section.count}
              </Text>
            </View>
          ) : (
            <View />
          )}
          <Icon style={{}} name={section.image} size={25} color="grey" />
        </View>
      </View>
    )
  }

  startQuestionnaire(value) {
    if (value) {
      var valueArr = {
        title: value.title.en,
        _id: value._id
      }
      Actions.PersonalDetail({ apiValue: valueArr })
    } else {
      this.dropdown.alertWithType(
        'success',
        strings.notification,
        strings.dataNotFound
      )
    }
  }
  _renderContent = section => {
    this.state.dataSource = ds.cloneWithRows(section.content)
    return (
      <View style={{}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData => (
            <TouchableOpacity onPress={() => this.startQuestionnaire(rowData)}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <Image
                    style={{ width: 66, height: 58, marginRight: 15 }}
                    source={require('../../images/send.png')}
                  />
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      {rowData.title[language]}
                    </Text>
                  </View>
                </View>
                {rowData.hide ? (
                  <View
                    style={{
                      width: WINDOW_WIDTH / 23,
                      height: WINDOW_HEIGHT / 27,
                      margin: WINDOW_WIDTH / 30,
                      backgroundColor: '#83BFBC',
                      padding: 10,
                      borderRadius: 20,
                      alignItems: 'center'
                    }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                      {rowData.hide}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
                <Icon
                  style={{}}
                  name="ios-arrow-forward"
                  size={25}
                  color="grey"
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
  componentWillMount() {
    AsyncStorage.getItem('answeredQuestionArray').then(
      value => (getValue = value)
    )
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

    // this.props.getDiseaseList()
    for (i = 0; i < SECTIONS.length; i++) {
      SECTIONS[i].image = 'ios-arrow-forward'
    }
    this.setState({ abc: 'abc' })

    AsyncStorage.getItem('name').then(value =>
      this.setState({ userDetails: JSON.parse(value) })
    )

    this.setState({ loaderLoading: true })
    this.props.getHomeScreenList()
  }

  componentWillReceiveProps(Props) {
    if (Props.homeScreenList) {
      if (getValue) {
        SECTIONS = Props.homeScreenList
        var value = JSON.parse(getValue)
        for (i = 0; i < value.length; i++) {
          for (j = 0; j < SECTIONS.length; j++) {
            SECTIONS[j].count = 0
            for (k = 0; k < SECTIONS[j].content.length; k++) {
              if (value[i] == SECTIONS[j].content[k]._id) {
                SECTIONS[j].content[k].hide = 1
                this.setState({
                  dataSource: ds.cloneWithRows(SECTIONS[0].content),
                  loaderLoading: false
                })
              }
              if (SECTIONS[j].content[k].hide == 1) {
                SECTIONS[j].count = SECTIONS[j].count + 1
              }
            }
          }
        }
        // value.push(answeredQuestionId)
        // AsyncStorage.setItem('answeredQuestionArray', JSON.stringify(value))
      } else {
        SECTIONS = Props.homeScreenList
        this.setState({
          dataSource: ds.cloneWithRows(SECTIONS[0].content),
          loaderLoading: false
        })
      }
    } else if (Props.homeScreenFail) {
      this.setState({ loaderLoading: false })
    }
  }

  _updateSections = activeSections => {
    if (activeSections.length) {
      for (i = 0; i < SECTIONS.length; i++) {
        if (i == activeSections) {
          SECTIONS[i].image = 'ios-arrow-down'
        } else {
          SECTIONS[i].image = 'ios-arrow-forward'
        }
      }
    } else {
      for (i = 0; i < SECTIONS.length; i++) {
        SECTIONS[i].image = 'ios-arrow-forward'
      }
    }
    this.setState({ activeSections })
  }
  componentWillUnmount() {}
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
    this.setState({ abc: 'a' })
  }

  hideShowModel() {
    this.setState({ languageModal: !this.state.languageModal })
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
            backgroundColor: '#fff',
            flex: 1
          }}>
          <Loader loading={this.state.loaderLoading} color="#61666B" />
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
                      style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
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
                            color="#008FAC"
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
                  // disabled={this.props.loading}
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
              flex: 0,
              paddingTop: 25,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: WINDOW_WIDTH
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <AboutModal />
              <View
                style={
                  {
                    // paddingBottom: 10,
                    // flexDirection: 'row',
                    // alignItems: 'center',
                    // justifyContent: 'space-between',
                    // width: WINDOW_WIDTH
                  }
                }>
                <TouchableOpacity
                  style={{
                    marginLeft: 10,
                    flexDirection: 'row',
                    borderBottomColor: 'grey',
                    //   borderBottomWidth: 1,
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
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Text style={{ color: 'grey', fontSize: 20, fontWeight: 'bold' }}>
                {this.state.userDetails.firstName} {''}
                {this.state.userDetails.lastName}
              </Text>
              <Text style={{ color: 'grey', fontSize: 20, fontWeight: 'bold' }}>
                {this.state.userDetails.ssn}
              </Text>
            </View>
            <View>
              <LogoutModal />
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#ECEFF1',
              padding: WINDOW_HEIGHT / 50,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {strings.homeScreenString1}{' '}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              padding: WINDOW_HEIGHT / 40
            }}>
            <Text>{this.props.test}</Text>
            <ScrollView>
              <Accordion
                underlayColor={'white'}
                sections={SECTIONS}
                activeSections={this.state.activeSections}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
              />
            </ScrollView>
            <DropdownAlert ref={ref => (this.dropdown = ref)} />
          </View>
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
  indexTextAlert: {
    fontSize: 40,
    color: 'red'
  },
  indexText: {
    fontSize: 40,
    color: 'grey'
  },
  buttonDesign: {
    width: WINDOW_WIDTH / 1.2,
    height: WINDOW_HEIGHT / 10,
    borderRadius: 10,
    margin: WINDOW_WIDTH / 40,
    backgroundColor: '#30C2FF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'grey'
  },
  headerSubText: {
    fontSize: 15,
    color: 'grey'
  },
  header: {
    paddingBottom: WINDOW_HEIGHT / 80,
    paddingTop: WINDOW_HEIGHT / 80,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: WINDOW_WIDTH
  },
  section: {
    paddingBottom: WINDOW_HEIGHT / 80,
    paddingTop: WINDOW_HEIGHT / 80,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: WINDOW_WIDTH
  },
  sectionText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'grey',
    marginBottom: WINDOW_HEIGHT / 100,
    marginTop: WINDOW_HEIGHT / 100
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
