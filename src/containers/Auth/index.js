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
  AsyncStorage,
  Image,
  ImageBackground,
  ScrollView,
  NativeModules
} from 'react-native'

import Modal from 'react-native-modal'
import { Actions, ActionConst } from 'react-native-router-flux'
import { RightButton } from '../../components/RightButton'
import Micon from 'react-native-vector-icons/MaterialIcons'
import Ficon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { globalStyle } from '../../constants/GlobalStyleSheet.js'
import { App_Constant } from '../../constants/Costant.js'
import Icon from 'react-native-vector-icons/Ionicons'
import { strings } from '../../constants/strings'
import { AboutModal } from '../../constants/Modal'
const { height, width } = Dimensions.get('window')
const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height
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
export default class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      abc: 'a',
      lol: '',
      abc: '',
      languageModal: false,
      batteryLevel: null
    }
  }
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
  componentWillMount() {
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
    debugger
    this.setState({ abc: 'a' })
    AsyncStorage.setItem('name', '')
    AsyncStorage.setItem('createQuesId', '')
    AsyncStorage.setItem('againQuesCheck', '')
    AsyncStorage.setItem('answeredQuestionArray', '')
  }

  componentDidMount() {
    NativeModules.BatteryStatus.test(info => {
      // 0 unknown, 1 unplegged, 2 charging, 3 full

      const level = Math.ceil(info.state)
      if (level == 1) {
        NativeModules.BatteryStatus.updateBatteryLevel(info => {
          //console.log(i fo.level)
          const level = Math.ceil(info.level)
          if (level <= -30) {
            //alert('Battery low.Please connect to power socket.')
          } else if (level <= 30) {
            alert(strings.lowBattery)
          } else {
            // alert("----------"+level)
          }
          this.setState({ batteryLevel: level })
        })
      }
    })
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ECEFF1',
          alignItems: 'center'
        }}>
        <Modal isVisible={this.state.languageModal}>
          <View style={{ backgroundColor: '#fff', borderRadius: 20 }}>
            <View>
              <View style={{ flexDirection: 'row', padding: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
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
        <ImageBackground
          style={{
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT / 2,
            marginTop: WINDOW_HEIGHT / 10,
            opacity: 0.15,
            position: 'absolute'
          }}
          source={require('../../images/patients.png')}
        />
        <View
          style={{
            paddingTop: 25,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: WINDOW_WIDTH
          }}>
          <View>
            <AboutModal />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: WINDOW_WIDTH
            }}>
            <TouchableOpacity
              style={{
                marginLeft: 10,
                flexDirection: 'row',
                borderBottomColor: 'grey',
                // borderBottomWidth: 1,
                alignItems: 'center'
              }}
              onPress={() => this.hideShowModel()}>
              <View>
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
                {/* <View>
                  <Text style={{ color: 'grey', fontWeight: 'bold' }}>
                    {languageName}
                  </Text>
                </View> */}
              </View>
              <Icon
                name="ios-arrow-down"
                size={20}
                color="grey"
                style={{ marginLeft: 5, marginTop: 4 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: 'transparent'
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{}} source={require('../../images/Vector.png')} />

            <Text style={{ fontSize: 40, marginLeft: 20, color: 'grey' }}>
              {strings.authScreenStrring1}
            </Text>
          </View>
          <View style={{ margin: WINDOW_HEIGHT / 20 }}>
            <Text
              style={{
                fontSize: 70,
                marginLeft: 20,
                color: 'grey',
                fontWeight: 'bold'
              }}>
              {strings.authScreenStrring2}
            </Text>
          </View>
          <View>
            <Text style={styles.indexTextAlert}>
              {strings.authScreenStrring3}
            </Text>
          </View>
          <View>
            <Text style={styles.indexTextAlert}>
              {strings.authScreenStrring4}
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: WINDOW_HEIGHT / 18,
            backgroundColor: 'transparent'
          }}>
          <View>
            <Text style={styles.indexText}>{strings.authScreenStrring5} </Text>
          </View>
          <View>
            <Text style={styles.indexText}>{strings.authScreenStrring6}</Text>
          </View>
          <View>
            <Text style={styles.indexText}> {strings.authScreenStrring7}</Text>
          </View>
        </View>
        <TouchableOpacity
          disabled={this.state.loadingAuth}
          onPress={() => {
            Actions.QRCodeAuth({ routePage: 'PersonalDetail' })
          }}>
          <View style={[styles.buttonDesign, { flexDirection: 'row' }]}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 40,

                color: 'grey'
              }}>
              {strings.authScreenStrring8}
            </Text>
            <Image
              style={{ marginLeft: 30 }}
              source={require('../../images/logo.png')}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={this.state.loadingAuth}
          onPress={() => {
            Actions.CenturySelection()
          }}>
          <View style={[styles.buttonDesign, { flexDirection: 'row' }]}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 40,

                color: 'grey'
              }}>
              {strings.authScreenStrring9}
            </Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
            disabled={this.state.loadingAuth}
            onPress={() => {
              Actions.StaffSection()
            }}>
            <View style={[styles.buttonDesign, { flexDirection: 'row' }]}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 40,

                  color: 'grey'
                }}>
                STAFF SECTION
              </Text>
            </View>
          </TouchableOpacity> */}
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
  indexTextAlert: {
    fontSize: 40,
    color: 'red'
  },
  indexText: {
    fontSize: 40,
    color: 'grey'
  },
  buttonDesign: {
    width: WINDOW_WIDTH / 1.3,
    height: WINDOW_HEIGHT / 10,
    borderRadius: 10,
    margin: WINDOW_WIDTH / 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'grey',
    shadowOffset: { height: 10, width: 0 }
  }
})
