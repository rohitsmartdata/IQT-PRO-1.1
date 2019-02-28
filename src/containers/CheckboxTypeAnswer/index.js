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

const { height, width } = Dimensions.get('window')

export default class CheckboxTypeAnswer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          type: 'Pain',
          isChecked: false
        },
        {
          type: 'Impaired hearing',
          isChecked: false
        },
        {
          type: 'An itching sensation',
          isChecked: false
        },
        {
          type: 'A discharge',
          isChecked: false
        },
        {
          type: 'A tone in my ear',
          isChecked: false
        },
        {
          type: 'Other, please specify:',
          isChecked: false,
          text: ''
        }
      ]
    }
    this._renderItem = this._renderItem.bind(this)
    this.changeValues = this.changeValues.bind(this)
    this._checkBoxView = this._checkBoxView.bind(this)
  }

  componentWillMount() {
    Actions.refresh({ right: RightButton(Actions.RadioTypeAnswer) })
  }

  componentDidMount() {
    Keyboard.dismiss()
  }

  _checkBoxView(item) {
    return (
      <View style={[globalStyle.radioButton, { paddingHorizontal: 10 }]}>
        {item.isChecked ? (
          <Ficon name="check-square-o" size={25} color="red" />
        ) : (
          <Micon name="check-box-outline-blank" size={25} color="yellow" />
        )}
      </View>
    )
  }

  _renderItem(item, index) {
    if (index + 1 === this.state.data.length) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => this.changeValues(index)}
            style={[globalStyle.row, { borderBottomWidth: 0 }]}>
            {this._checkBoxView(item)}

            <View style={globalStyle.optionsContainerView}>
              <Text style={globalStyle.optionText}>{item.type}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ height: 100, padding: height * 0.02 }}>
            <TextInput
              style={{
                flex: 1,
                fontSize: height * 0.025,
                padding: 5,
                borderRadius: 5,
                borderWidth: 1
              }}
              ref={textref => (this.textref = textref)}
              editable={item.isChecked}
              underlineColorAndroid="transparent"
              onChangeText={text => null}
              multiline
            />
          </View>
        </View>
      )
    } else {
      return (
        <TouchableOpacity
          onPress={() => this.changeValues(index)}
          style={[
            globalStyle.row,
            {
              backgroundColor:
                index % 2 === 0
                  ? App_Constant.EVEN_ITEM_COLOR
                  : App_Constant.ODD_ITEM_COLOR
            }
          ]}>
          {this._checkBoxView(item)}

          <View style={globalStyle.optionsContainerView}>
            <Text style={globalStyle.optionText}>{item.type}</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  changeValues(index) {
    let data = this.state.data
    data[index].isChecked = !data[index].isChecked
    this.setState({ data: data })
    if (
      index === this.state.data.length - 1 &&
      this.state.data[this.state.data.length - 1].isChecked
    ) {
      this.textref.focus()
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView style={globalStyle.container}>
        <View style={globalStyle.headerView}>
          <Text style={globalStyle.headerText}>
            I have following symptoms from my right ear.
          </Text>
        </View>

        <FlatList
          style={globalStyle.flatList}
          data={this.state.data}
          extraData={this.state}
          renderItem={({ item, index }) => this._renderItem(item, index)}
        />
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({})
