import React,{Component} from 'react'
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  Dimensions,
  Slider,
} from 'react-native'
import { RightButton } from '../src/components/RightButton';
import { Actions } from 'react-native-router-flux'

const {height, width} = Dimensions.get('window');

export default class SliderTypeA extends Component {
  constructor(props) {
    super(props)
    this._renderItem = this._renderItem.bind(this);
    this.state = {
      sliderData :[
        {
          title : "While motionless",
          value : 0
        },
        {
          title : "While sitting",
          value : 0
        },
        {
          title : "While standing",
          value : 0
        }
      ]
    }
  }

  componentWillMount(){
    Actions.refresh({ right: RightButton(Actions.DateSelection) })
  }

  _renderItem(item,index){
    return (
      <View style={[styles.row, { backgroundColor: index % 2 === 0 ? '#F0F4F0' : 'white' }]}>
        <Text style ={styles.rowTitle}>{item.title}</Text>

        <View style = {styles.sliderConatainder}>
          <Slider style = {styles.sliderStyle}/>
        </View>

      </View>
    )

  }

  render(){
    return(
      <View style = {styles.container}>
          <View style={styles.titleContainer}>
               <Text style={styles.headerText}>
                      My back pain
              </Text>
          </View>

          <FlatList style= {styles.flatList}
              renderItem = {({item,index})=>this._renderItem(item,index)}
              extraData = {this.state}
              data = {this.state.sliderData}
          />

      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
      flex: 1,
      backgroundColor: 'white'
  },

  headerText: {
      fontSize: height * 0.03,
      fontWeight: 'bold',
      color: '#696E75'
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

  rowTitle: {
    fontSize: 20,
    color:'#696E75',
    textAlign:'left',
    padding : 10,
    flex : 0.2,


  },

  row: {
      height: 100,
      borderBottomWidth: 2,
  },
  sliderConatainder:{
    flex : 0.2,
    borderTopWidth: 2,
  },
  sliderStyle :{
    justifyContent: 'center',
    alignItems : 'center'
  }
})
