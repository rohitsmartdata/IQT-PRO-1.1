import React, {Component} from 'react';
import { Actions } from 'react-native-router-flux'
import { RightButton } from '../../components/RightButton';
import Icon from 'react-native-vector-icons/Ionicons'
import {
    StyleSheet,
    StatusBar,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    FlatList,
} from 'react-native';

const {height, width} = Dimensions.get('window');

export default class Radio extends Component{

  constructor(props){
    super(props)
    this.state = {
      selectedOption: null,
      arr: [
          {
              type: 'Clear'
          },
          {
              type: 'Purulent without blood'
          },
          {
              type: 'Only blood'
          },
          {
              type: 'Purulent and bloody'
          },
      ]
  };
  this._renderItem = this._renderItem.bind(this);
  this._onPressButton = this._onPressButton.bind(this);
 }

  // componentWillMount() {
  //    Actions.refresh({ right: RightButton(Actions.DateSelection) })
  // }
  _onPressButton(index){
    console.log('index', index)
    this.setState({ selectedOption: index })
    console.log('selected', this.state.selectedOption)
  }

  _renderItem(item,index){
    return (
      <TouchableOpacity style= {styles.row} onPress = {() => this._onPressButton(index)}>
      <View style ={styles.radioImg}>
      {
       index === this.state.selectedOption? <Icon  name='ios-radio-button-on' size={25} color='#008FAC' />
        : <Icon name='ios-radio-button-off-outline' size={25} color='#94989C' />
      }
      </View>
       <Text style =  {styles.itemText}> {item.type} </Text>
      </TouchableOpacity>
    )
  }

  render(){
    return (
    <View style={styles.container}>
        <StatusBar
           backgroundColor="#BA7FBA"
           barStyle="light-content"
         />

         <View style={styles.titleContainer}>
              <Text style={styles.headerText}>
                     The discharge from my ear is
             </Text>
         </View>

         <FlatList style={styles.flatList}
            data = {this.state.arr}
            extraData={this.state}
            renderItem = {({item,index}) => this._renderItem(item,index)}/>
    </View>

  )
}
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'
    },

  titleContainer: {
    flex:0.2,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth : 2,
    borderColor : 'black',
    padding : 10,

  },

  flatList: {
    flex:0.8,
    backgroundColor: 'white',
  },
  itemText: {
    padding: 10,
    fontSize: 18,
    color:'#696E75',
    flex : 0.8,
    justifyContent: 'center'
  },
  radioImg:{
    flex : 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontSize: 20,
    color:'#696E75',
    textAlign:'left',
    fontWeight: 'bold',
  },

  headerText: {
      fontSize: height * 0.03,
      fontWeight: 'bold',
      color: '#696E75'
  },
  row: {
      height: 44,
      borderBottomWidth: 1,
      flexDirection: 'row'
  }
});
