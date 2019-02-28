import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Keyboard,
    Dimensions,
    TextInput,
    FlatList,
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { RightButton } from '../../components/RightButton';
import Icon from 'react-native-vector-icons/Ionicons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import  {globalStyle} from '../../constants/GlobalStyleSheet.js';
import   {App_Constant} from '../../constants/Costant.js';

const { height, width } = Dimensions.get('window');

export default class QandA extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedAns : "",
            data: [
                {
                    question: 'Occasional sadness in keeping with the circumstances.',
                    answer: '',
                },
                {
                    question: 'Sad or low but brightens up without difficulty',
                    answer: '',
                },
                {
                    question: 'Persuasive feelings of sadness or gloominess. The mood is still influenced by external circumstances.',
                    answer: '',
                },
                {
                    question: 'Continuous or unvarying sadness, misery or despondency.',
                    answer: '',
                },
                {
                    question: 'Occasional sadness in keeping with the circumstances.',
                    answer: '',
                },
                {
                    question: 'Sad or low but brightens up without difficulty',
                    answer: '',
                },
                {
                    question: 'Persuasive feelings of sadness or gloominess. The mood is still influenced by external circumstances.',
                    answer: '',
                },
                {
                    question: 'Continuous or unvarying sadness, misery or despondency.',
                    answer: '',
                },

            ],
            selectedQuestion: null,
            previousQue: null,
            previousAns : null,
        };
        this._renderItem = this._renderItem.bind(this)
        this._onPress = this._onPress.bind(this)
        this._ansTxtInput = this._ansTxtInput.bind(this)
        this.__onChangeText = this.__onChangeText.bind(this)

    }

    componentWillMount(){
      Actions.refresh({ right: this.SubmitButton() })
    }
    _submitAction = ()=>{
      console.log('Submit Action');
    }

    SubmitButton = ()=>(
          <TouchableOpacity onPress={this._submitAction} style={{ flex: 1, padding:height*0.01, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style= {styles.submitText}> Submit</Text>
          </TouchableOpacity>
    )

    _onPress(index){

      if (index === this.state.previousQue){
        console.log("previousQue block");
        this.setState({
           selectedQuestion: this.state.previousQue,
           selectedAns : this.state.previousAns
         })
      }else{
        this.setState({
           selectedAns : ""
         })
      }

      this.setState({
        previousAns : this.state.selectedAns,
        previousQue: this.state.selectedQuestion,
        selectedQuestion: index

       })

    }

    __onChangeText(text){
      this.setState({
        selectedAns : text,
      })
    }

    _ansTxtInput(index){
      console.log(this.state.selectedAns);

        var isEditable = false;
        var txt = "";
        if (index===this.state.selectedQuestion){
          isEditable = true;
          txt = this.state.selectedAns;
        }

          return (
            <TextInput
              underlineColorAndroid='transparent'
              multiline
              style={styles.ansTxtInput}
              editable = {isEditable}
              value = {txt}
              onChangeText = {(text) => this.__onChangeText(text)}/>
          )
      }

    _renderItem(item, index) {
        return (
            <View style={{ backgroundColor: index % 2 === 0 ? App_Constant.EVEN_ITEM_COLOR : App_Constant.ODD_ITEM_COLOR }}>
                <TouchableOpacity onPress={() => this._onPress(index)} style={globalStyle.row}>
                    <View style={globalStyle.radioButton}>
                        {
                            index===this.state.selectedQuestion ?
                                <Icon name='ios-radio-button-on' size={25} color='#008FAC' />
                                :
                                <Icon name='ios-radio-button-off-outline' size={25} color='#94989C' />
                        }
                    </View>
                    <View style={globalStyle.optionsContainerView}>
                        <Text style={globalStyle.optionText}>{item.question}</Text>
                    </View>
                </TouchableOpacity>

              {/*  <View style={styles.ansContainer}>
                   {this._ansTxtInput(index)}
                </View> */
              }
            </View>
        )
    }

    render() {
        return (
            <KeyboardAwareScrollView style={globalStyle.container}>
                {
                   <FlatList
                     data = {this.state.data}
                     extraData={this.state}
                     renderItem = {({item,index}) => this._renderItem(item,index)}/>
                }
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({

    headerText: {
        fontSize: height * 0.03,
        fontWeight: 'bold',
        color: '#696E75'
    },

    ansContainer:{
     //height: height * 0.15,
     minHeight: height * 0.15,
     paddingVertical: height * 0.01,
     paddingLeft: 50,
     paddingRight: 10,
     borderBottomWidth: 2,

   },
   ansTxtInput:{
      flex: 1,
      borderWidth: 1,
      borderColor : 'black',
      borderRadius : 10,
      padding : 10,
      textAlignVertical: 'top',
   },
   submitText: {
       fontSize: height * 0.025,
       color: 'white',
       fontWeight: 'bold',
   },
});
