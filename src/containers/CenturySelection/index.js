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
import { Actions } from 'react-native-router-flux'
import { RightButton } from '../../components/RightButton'
import Micon from 'react-native-vector-icons/MaterialIcons'
import Ficon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { globalStyle } from '../../constants/GlobalStyleSheet.js'
import { App_Constant } from '../../constants/Costant.js'
import Icon from 'react-native-vector-icons/Ionicons'
import { strings } from '../../constants/strings'
const { height, width } = Dimensions.get('window')
const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height
export default class CenturySelection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      abc: 'a'
    }
  }

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
        <View style={{ paddingTop: WINDOW_WIDTH / 10 }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ECEFF1',
              marginBottom: WINDOW_HEIGHT / 90
            }}>
            <Text style={{ fontSize: 35, color: 'grey' }}>
              {strings.centuryScreenString1}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ECEFF1',
              marginBottom: WINDOW_HEIGHT / 10
            }}>
            <Text style={{ fontSize: 35, color: 'grey' }}>
              {strings.centuryScreenString2}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ECEFF1',
              marginBottom: WINDOW_HEIGHT / 10
            }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'grey' }}>
              {strings.centuryScreenString3}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ECEFF1'
            }}>
            <TouchableOpacity
              style={styles.centuryContainer}
              onPress={() => {
                Actions.PersonalNumber({
                  centuryNo: '1900'
                })
              }}>
              <View>
                <Text
                  style={{ fontSize: 40, fontWeight: 'bold', color: 'grey' }}>
                  1900
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.centuryContainer}
              onPress={() => {
                Actions.PersonalNumber({
                  centuryNo: '2000'
                })
              }}>
              <View>
                <Text
                  style={{ fontSize: 40, fontWeight: 'bold', color: 'grey' }}>
                  2000
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: '#fff',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'grey',
    shadowOffset: { height: 10, width: 0 }
  }
})
