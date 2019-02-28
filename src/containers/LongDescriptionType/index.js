import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Dimensions
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CalendarPicker from 'react-native-calendar-picker';
import { Actions } from 'react-native-router-flux'
import { RightButton } from '../../components/RightButton';
import moment from 'moment'
import  {globalStyle} from '../../constants/GlobalStyleSheet.js';
const { height, width } = Dimensions.get('window');

export default class LongDescriptionType extends Component {

    constructor(props) {
        super(props);
        this.state = {
           queDesc : "Representing reports of depressed mood,regardless of whether it is reflected in appearance or not.Includes low spirits, despondency or the feeling of being beyond help and without hope.Rate according to intensity, duration and the extent to which the mood is reported to be influenced by events."
        }
    }

    componentWillMount(){
      Actions.refresh({ right: RightButton(Actions.QandA) })
    }


    render() {
        return (
            <View style={globalStyle.container}>
                <View style={styles.topView}>
                    <Text style={styles.headerText}>Reported Sadness</Text>
                </View>
                <View style={styles.longDescContainer}>
                    <Text style={{ fontSize: height * 0.025 }}>
                        {this.state.queDesc}
                    </Text>
                </View>

                <View style={styles.touchView}>
                  <TouchableOpacity style={{flex : 1}} onPress={Actions.QandA} >
                  </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    topView: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        paddingVertical: height*0.02
    },
    headerText: {
        fontSize: height * 0.03,
        fontWeight: 'bold',
        color: 'black'
    },
    longDescContainer:{
        padding: height * 0.02,
        borderBottomWidth: 2,
    },
    touchView:{
      margin: 20,
      flex : 1,
      borderWidth: 2,
      borderRadius : 10,
    }
});
