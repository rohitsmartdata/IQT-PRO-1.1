import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CalendarPicker from 'react-native-calendar-picker'
import Modal from 'react-native-modal'
import { Actions } from 'react-native-router-flux'
import { RightButton } from '../../components/RightButton'
import moment from 'moment'
import { globalStyle } from '../../constants/GlobalStyleSheet.js'
import PersonalDetail from '../PersonalDetail/index'
const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height
const { height, width } = Dimensions.get('window')
const dateFormat = 'YYYY-MM-DD'
const minDate = new Date()
export class DateSelection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedStartDate: 'YYYY/MM/DD',
      calendarModel: false,
      severSelectedStartDate: 'YYYY/MM/DD'
    }
    this.onDateChange = this.onDateChange.bind(this)
  }

  onDateChange(date) {
    PersonalDetail.datePickerReponse(date)
    // this.Auth.setState({ lol: 'asa' })
    this.setState({
      selectedStartDate: date,
      severSelectedStartDate: date.toString()
    })
  }
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }
  selectDate() {
    debugger

    var date = this.formatDate(this.state.selectedStartDate.toString())

    this.setState({ calendarModel: false, selectedStartDate: date })
  }
  render() {
    const { selectedStartDate } = this.state
    const startDate = selectedStartDate ? selectedStartDate.toString() : ''
    return (
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
              <TouchableOpacity style={{}} onPress={() => this.selectDate()}>
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
                    Ok
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
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity
            style={{}}
            onPress={() => this.setState({ calendarModel: true })}>
            <View style={styles.calendarButton}>
              <Text style={styles.calendarText}>
                {this.state.severSelectedStartDate}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginTop: 100
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
  }
})
