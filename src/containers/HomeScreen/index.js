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
import {
  getQues,
  clearQuesData,
  getDiseaseList
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
    bankidResponseCheck: BankIdReducer.bankidResponseCheck
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getQues,
      clearQuesData,
      login,
      loginResponse,
      getDiseaseList
    },
    dispatch
  )
}
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
    languages: { en: 'English', sv: 'Engelska' },
    code: 'en',
    status: true,
    flagImage: require('../../images/flagBritish.png')
  },

  {
    languages: { en: 'Swedish', sv: 'Svenska' },
    code: 'sv',
    status: false,
    flagImage: require('../../images/flagSwedish.png')
  }
]
const SECTIONS = [
  {
    title: { en: 'Airways', sv: 'Luftvägar' },
    subTitle: {
      en: 'Common cold, pneumonia, cough, allergy',
      sv: 'Förkylning, lunginflammation, hosta, allergi'
    },
    content: [
      {
        _id: '576786F6-C37B-4E9D-9E7D-78E73D8969F7',
        title: { en: 'Airways Problems ', sv: 'Luftvägsproblem' }
      },
      {
        _id: '2D3839AB-C151-4F9E-A693-2A07353F499C',
        title: {
          en: 'COPD Chronic Obtructive Pulmonary Disease',
          sv: 'KOL (Kronisk Obstruktiv Lungsjukdom)'
        }
      },
      {
        _id: '5B0E5E3C-3BA5-4D69-A083-19F8B87BED46',
        title: { en: 'Nose Problems', sv: 'Näsproblem' }
      },
      {
        _id: 'E4D9E502-D364-46B9-8F34-F113D74F293E',
        title: { en: 'Throat Problems', sv: 'Halsproblem' }
      }
    ],
    image: 'ios-arrow-forward',
    diseaseImage: require('../../images/airways.png')
  },
  {
    title: { en: 'Circulatory System', sv: 'Hjärta, blodtryck' },
    subTitle: { en: 'Heart, Blood Pressure', sv: 'Hjärta, blodtryck' },
    content: [
      {
        _id: '0A7E6AA9-106F-460A-B41B-CC0CA45D887C',
        title: { en: 'Heart Problems', sv: 'Hjärtproblem' },
        tags: ['1 Building']
      }
    ],
    image: 'ios-arrow-forward',
    diseaseImage: require('../../images/circulatory_system.png')
  },
  {
    title: { en: 'Digestive System', sv: 'Mag-tarm kanalen' },
    subTitle: {
      en: 'Hearburn, Stomach ache, Diarrhoea',
      sv: 'Halsbränna, magsmärta, diarre'
    },
    content: [
      {
        _id: '0657EFF5-E98B-4143-A116-2C9B731268F9',
        title: { en: 'Stomach Problems', sv: 'Magproblem' }
      },
      {
        _id: 'D7361E1C-8A39-4AFC-85A2-23D4C39DA9A3',
        title: { en: 'Heart Burn', sv: 'Halsbränna' }
      }
    ],
    image: 'ios-arrow-forward',
    diseaseImage: require('../../images/digestive_system.png')
  },
  {
    title: { en: 'Ear', sv: 'Öra' },
    subTitle: {
      en: 'Ear Infection, Hearing problems',
      sv: 'Öroninflammation, hörselproblem'
    },
    content: [
      {
        _id: '173F6DB4-911D-4F5D-94E4-AF6A7EE98EC9',
        title: { en: 'Ear Problems', sv: 'Öronproblem' }
      }
    ],
    image: 'ios-arrow-forward',
    diseaseImage: require('../../images/ear.png')
  },
  {
    title: { en: 'Eye', sv: 'Ögon' },
    subTitle: {
      en: 'Eye Infections, Visual Problems',
      sv: 'Ögoninfektioner, synproblem'
    },
    content: [
      {
        _id: '93B68D5E-E6FC-4BB5-9D98-BC6978733713',
        title: { en: 'Eyes Problems', sv: 'Ögonproblem' }
      }
    ],
    image: 'ios-arrow-forward',
    diseaseImage: require('../../images/eye.png')
  },
  {
    title: { en: 'Genitourinary System', sv: 'Urinvägarna' },
    subTitle: {
      en: 'Urinary tract infections, Lower genital problems',
      sv: 'Urinvägsproblem, underlivsproblem'
    },
    content: [
      {
        _id: 'E6CC56A3-9223-4AE1-A36F-9D3DD7742EF4',
        title: { en: 'Urinary Problems', sv: 'Urinvägsproblem' }
      }
    ],
    image: 'ios-arrow-forward',
    diseaseImage: require('../../images/genitourinary_system.png')
  },
  {
    title: { en: 'Mental and Behavioral', sv: 'Psykiska besvär' },
    subTitle: {
      en: 'Stress, Crisis, Depression, Anxiety',
      sv: 'Stress, kris, depression, oro'
    },
    content: [
      {
        _id: '47657290-655A-49F4-B125-2EA46BF3F925',
        title: { en: 'KEDS', sv: 'KEDS' }
      },
      {
        _id: '0773395C-3607-4F2D-BF04-E18EB595ED9D',
        title: { en: 'MADRS ', sv: 'MADRS' }
      },
      {
        _id: 'FF44E95F-CE1C-42A6-BD9F-B812462EFB0D',
        title: { en: 'WAI ', sv: 'WAI' }
      }
    ],
    image: 'ios-arrow-forward',
    diseaseImage: require('../../images/m_and_b.png')
  },
  {
    title: { en: 'Metabolic Disease', sv: 'Ämnesomsättningssjukdomar' },
    subTitle: {
      en: 'Diabetes, Thyroid disease',
      sv: 'Diabetes, sköldskörtelproblem'
    },
    content: [
      {
        _id: '87946FF2-5352-4C8C-A4CD-3EFDB1CB668A',
        title: { en: 'Diabetes Problems', sv: 'Diabetes' }
      }
    ],
    image: 'ios-arrow-forward',
    diseaseImage: require('../../images/metabolic_disease.png')
  },
  {
    title: { en: 'Muscules and Sceleton', sv: 'Muskler, rygg och skelett' },
    subTitle: {
      en: 'Ex neck, Shoulder, Arms, Back, Hips, Knee, Foot ',
      sv: 'ex nacke, axlar, armar, rygg, höfter, knän & fötter'
    },
    content: [
      {
        _id: '38CCD30D-303F-42B9-8140-4646E70EC543',
        title: { en: 'Neck Problems', sv: 'Nackproblem' }
      },
      {
        _id: '12206680-20B5-4323-86C9-4C23CF0C36D7',
        title: { en: 'Shoulder Problems', sv: 'Skulderproblem' }
      },

      {
        _id: 'DC380CD1-AEA0-4099-92B4-F2D8F81674AA',
        title: { en: 'Lower back Problems', sv: 'Ländryggsproblem ' }
      },

      {
        _id: '2D0D6C81-9041-469C-A018-D25185C1AD89',
        title: { en: 'Knee Problems', sv: 'Knäproblem' }
      },
      {
        _id: '3EFD9D07-7012-4ED2-BF81-24C723DD640E',
        title: { en: 'Foot Problems', sv: 'Fotproblem' }
      }
    ],
    image: 'ios-arrow-forward',
    diseaseImage: require('../../images/m_and_s.png')
  },
  {
    title: { en: 'Skin', sv: 'Hud' },
    subTitle: {
      en: 'Ex moles, Infections, Excema, Rashes, Acne',
      sv: 'Ex hudförändringar, hudinfektioner, eksem, utslag & finnar'
    },
    content: [
      {
        _id: 'F76DD502-0BED-415B-A0E5-78B30C1427FF',
        title: { en: 'Skin Problems', sv: 'Hudproblem' }
      }
    ],
    image: 'ios-arrow-forward',
    diseaseImage: require('../../images/skin.png')
  },
  {
    title: { en: 'Other', sv: 'Andra åkommor' },
    subTitle: {
      en: 'Medical Certificates, Vaccinations, etc',
      sv: 'Intyg & vaccinationer'
    },
    content: [
      {
        _id: '12D94E24-6EC1-4454-94A0-53F8130742E2',
        title: {
          en: 'RVN Health Form',
          sv: 'RVN hälsoformulär'
        }
      }
    ],
    image: 'ios-arrow-forward',
    diseaseImage: require('../../images/send.png')
  }
]

const toNumber = str => Number(str)
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: ds.cloneWithRows(SECTIONS[0].content),
      activeSections: [],
      test: true,
      userDetails: '',
      abc: '',
      languageModal: false,
      active: true,
      text: '180000'
    }
  }
  onAction = active => {
    if (active) {
      console.log(active)
    } else {
      if (Actions.currentScene == 'HomeScreen') {
        AsyncStorage.setItem('name', '')
        AsyncStorage.setItem('createQuesId', '')
        AsyncStorage.setItem('againQuesCheck', '')
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
            <Image style={{ marginRight: 15 }} source={section.diseaseImage} />
          </View>
          <View style={styles.header}>
            <Text style={styles.headerText}>{section.title[language]}</Text>
            <Text style={styles.headerSubText}>
              {section.subTitle[language]}
            </Text>
          </View>
        </View>

        <Icon style={{}} name={section.image} size={25} color="grey" />
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
