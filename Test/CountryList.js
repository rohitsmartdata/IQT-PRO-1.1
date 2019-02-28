import React,{Component} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

import {
    StyleSheet,
    StatusBar,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    FlatList,
    TextInput,
} from 'react-native';
const {height, width} = Dimensions.get('window');



export default class CountryList  extends Component{
  constructor(props){
    super(props)
    this.state = {
      selectedOption: null,
      originalArr: [
          {
              type: "Clear"
          },
          {
              type: "Purulent without blood"
          },
          {
              type: "Only blood"
          },
          {
              type: "Purulent and bloody"
          },
      ],
      searchArr: null,
    };

    this._renderItem = this._renderItem.bind(this);
    this._onPressButton = this._onPressButton.bind(this);
    this.searchCountry = this.searchCountry.bind(this);
  }

  componentDidMount(){
    this.setState({ searchArr : this.state.originalArr})
  }

  _onPressButton(index){
    console.log('index', index)
    this.setState({ selectedOption: index })
    console.log('selected', this.state.selectedOption)
  }


  _renderItem=({item,index})=>{
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
  searchCountry(text){
    if (text === ''){
      console.log('empty')
      this.setState ({ searchArr : this.state.originalArr})
    }
    else{
        console.log(text)
      let data = []
      this.state.originalArr.map((item, index) => {
        // console.log('test ===',item.search(text))

          if (item.type.toLowerCase().search(text.toLowerCase()) != -1){
            data.push(item)
              console.log('search items', item)
            }
      })


      console.log('Hello',data);
      this.setState ({ searchArr : data})
    }
  }

  render(){
    return (

      <View style = {styles.superViewContainer}>
        <StatusBar
           backgroundColor="#BA7FBA"
           barStyle="light-content"
         />

         <TextInput style={styles.textInputTitle}
           placeholder = 'Search..'
           onChangeText = {(text)=>this.searchCountry(text)}/>

         <FlatList style={styles.flatList}
            data = {this.state.searchArr}
            extraData={this.state}
            renderItem = {this._renderItem}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({

  superViewContainer:{
    backgroundColor : 'white',
    flex : 1,
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

  textInputTitle: {
    padding: 10,
    flex:0.1,
    fontSize: 18,
    color:'#696E75',
    textAlign:'left',
    borderBottomWidth : 1,
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
  },
})
