import React, {Component} from 'react';
import { Actions } from 'react-native-router-flux'
import {
    StyleSheet,
    StatusBar,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,
} from 'react-native';

import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';

const {height, width} = Dimensions.get('window');


export default class DatePicker extends Component{

          constructor(props) {
           super(props);
           this.state = {
             selectedStartDate: new moment().format('YYYY-MM-DD'),
           };
           this.onDateChange = this.onDateChange.bind(this);
         }

         onDateChange(date) {
            this.setState({
            selectedStartDate: date.format('YYYY-MM-DD'),
            });
            console.log(this.state.selectedStartDate);
            console.log("Hello");

        }

        render(){

          const { selectedStartDate } = this.state;
          const startDate = selectedStartDate ? selectedStartDate.toString() : '';

          return (
          <View style={{flex:1, backgroundColor: 'white'}}>
              <StatusBar
                 backgroundColor="#BA7FBA"
                 barStyle="light-content"
               />

               <View style={styles.titleContainer}>
                    <Text style={styles.headerText}>
                           Which date did your earproblems begin?
                   </Text>
               </View>

               <View style={styles.titleContainer}>
                   <Text style={styles.DateText}>
                          {startDate}
                  </Text>
              </View>

              <View style={styles.calendarContainer}>
                <CalendarPicker
                   onDateChange= {(date)=>this.onDateChange(date)}
                />
              </View>
          </View>

        )
      }
}

const styles = StyleSheet.create({

  titleContainer: {
    flex:0.2,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth : 2,
    borderColor : 'black',
    padding : 10,
  },

  headerText: {
      fontSize: height * 0.03,
      fontWeight: 'bold',
      color: '#696E75'
  },

  DateText: {
    fontSize: 20,
    color:'#696E75',
    textAlign:'left',
    fontWeight: 'bold',
  },

  calendarContainer: {
    flex:0.6,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth : 2,
    borderColor : 'black',
    padding : 10,
  },

});
