import React, { Component } from 'react'
import {
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native'

import { globalStyle } from '../../constants/GlobalStyleSheet.js'
import countriesData from '../../constants/countries.json'
import Icon from 'react-native-vector-icons/Ionicons'
import { RightButton } from '../../components/RightButton'
import { Actions } from 'react-native-router-flux'

const { height, width } = Dimensions.get('window')
const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height
export default class SelectCountry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: countriesData.data,
      selected: ''
    }
    this._renderItem = this._renderItem.bind(this)
    this.searchCountry = this.searchCountry.bind(this)
  }

  componentDidMount() {
    Keyboard.dismiss()
  }

  componentWillMount() {
    Actions.refresh({ right: RightButton(Actions.CheckboxTypeAnswer) })
  }

  _selectedItem(item) {
    debugger
    console.log(item)
    // this.props.onItem(item)
    this.setState({ selected: item })
  }

  _renderItem(item, index) {
    return (
      <TouchableOpacity
        onPress={() => this._selectedItem(item)}
        style={globalStyle.row}>
        <View style={globalStyle.radioButton}>
          {item === this.state.selected ? (
            <Icon name="ios-radio-button-on" size={25} color="#008FAC" />
          ) : (
            <Icon
              name="ios-radio-button-off-outline"
              size={25}
              color="#94989C"
            />
          )}
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={globalStyle.optionText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  searchCountry(search) {
    if (search === '') {
      this.setState({ data: countriesData })
    }
    let data = []
    countriesData.data.map((item, index) => {
      let strng = item.name.toLowerCase()
      if (item.name.toLowerCase().search(search.toLowerCase()) != -1)
        data.push(item)
    })
    this.setState({ data: data })
  }

  render() {
    return (
      <View style={[globalStyle.container, { marginTop: 50 }]}>
        <View style={styles.topView}>
          <TextInput
            placeholder="Search..."
            style={globalStyle.optionText}
            returnKeyType="search"
            onChangeText={search => this.searchCountry(search)}
          />
        </View>

        {this.state.data && this.state.data.length === 0 ? (
          <View style={styles.errorMsg}>
            <Text style={globalStyle.optionText}>No results found</Text>
          </View>
        ) : (
          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 3
            }}>
            <FlatList
              style={{
                maxHeight: WINDOW_HEIGHT / 2
              }}
              scrollEnabled={true}
              data={this.state.data}
              extraData={this.state}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item, index }) => this._renderItem(item, index)}
            />
          </View>
        )}
        <View style={{ margin: 15, flexDirection: 'row' }}>
          <Text style={{ fontSize: 25, color: '#30C2FF', fontWeight: 'bold' }}>
            Selected Country :-
          </Text>
          <Text style={{ fontSize: 25, color: 'grey', fontWeight: 'bold' }}>
            {this.state.selected.name}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topView: {
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    justifyContent: 'center',
    paddingVertical: 10,
    borderColor: 'grey'
  },
  errorMsg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100
  }
})
