/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Header } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';
import {RightButton} from '../../components/RightButton'
import {Actions} from 'react-native-router-flux'
import  {globalStyle} from '../../constants/GlobalStyleSheet.js';

const {height, width} = Dimensions.get('window');
const headerHeight = Platform.select({
  ios: 64,
  android: Header.HEIGHT + 20 ,
});
var _keyboardWillShowSubscription;
var _keyboardWillHideSubscription;
const titleHeight = 100;
const textInputOriginalHeight =  height - titleHeight - headerHeight - 40;

export default class LongAnswerType extends Component<Props> {

    constructor(props) {
    super(props);
    this.state = {
        ans: '',
        textInputHeight:  textInputOriginalHeight,
     };
  }

  componentWillMount(){
    Actions.refresh({ right: RightButton(Actions.DateSelection) })
  }

  componentDidMount() {
    Keyboard.dismiss()
		_keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', (e) => this._keyboardWillShow(e));
		_keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', (e) => this._keyboardWillHide(e));
	}

	componentWillUnmount() {
		_keyboardWillShowSubscription.remove();
		_keyboardWillHideSubscription.remove();
	}

  _keyboardWillShow(e) {
      console.log(headerHeight );
		this.setState({textInputHeight: textInputOriginalHeight - e.endCoordinates.height});
	}
	_keyboardWillHide(e) {
    console.log("Keyboard Hidden");
		this.setState({textInputHeight: textInputOriginalHeight});
	}

  render() {
    return (

          <TouchableWithoutFeedback style={{flex:1}} onPress={Keyboard.dismiss} accessible={false}>

            <View style={globalStyle.container}>
                <StatusBar
                   backgroundColor="#BA7FBA"
                   barStyle="light-content"
                 />

                <View style={globalStyle.headerView}>
                     <Text style={globalStyle.headerText}>
                            Please tell us a bit more about your claustrophobia.
                    </Text>
                </View>

                   <TextInput style = {[styles.multiLineTextInput,{height: this.state.textInputHeight}]} underlineColorAndroid = 'transparent' multiline = {true}
                              onChangeText={
                                  (text) => this.setState((previos) => {return {ans: text}})
                              }
                      />
             </View>
        </TouchableWithoutFeedback>


    );
  }
}

const styles = StyleSheet.create({

  multiLineTextInput: {
    borderWidth: 2,
    borderColor : 'black',
    borderRadius : 10,
    margin : 20,
    padding : 10,
    textAlignVertical: 'top',
  },
});
