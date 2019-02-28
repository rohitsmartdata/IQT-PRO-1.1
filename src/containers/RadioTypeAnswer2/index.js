import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Keyboard,
    Dimensions,
    FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { RightButton } from '../../components/RightButton';
import Icon from 'react-native-vector-icons/Ionicons'
import  {globalStyle} from '../../constants/GlobalStyleSheet.js';
import   {App_Constant} from '../../constants/Costant.js';

const { height, width } = Dimensions.get('window');

export default class RadioTypeAnswer2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            data: [
                {
                    type: 'Secondary school'
                },
                {
                    type: 'High school'
                },
                {
                    type: 'A 1-3 year university training program'
                },
                {
                    type: 'A 4-5 year university training program'
                },
            ]
        };
        this._renderItem = this._renderItem.bind(this)
    }

    componentWillMount(){
      Actions.refresh({ right: RightButton(Actions.LongDescriptionType) })
    }

    componentDidMount() {
      Keyboard.dismiss()
    }

    _renderItem( item, index ){
        return (
            <TouchableOpacity onPress={() => this.setState({ selectedOption: index })}
                style={[styles.row, { backgroundColor: index % 2 === 0 ? App_Constant.EVEN_ITEM_COLOR : App_Constant.ODD_ITEM_COLOR }]}>
                <View style={globalStyle.radioButton}>
                    {
                        index === this.state.selectedOption ?
                            <Icon name='ios-radio-button-on' size={25} color='#008FAC' />
                            :
                            <Icon name='ios-radio-button-off-outline' size={25} color='#94989C' />
                    }
                </View>

                <View style={globalStyle.optionsContainerView}>
                    <Text style={globalStyle.optionText}>{item.type}</Text>
                </View>

            </TouchableOpacity>
        )
    }



    render() {
        return (
            <View style={globalStyle.container}>
                <View style={globalStyle.headerView}>
                    <Text style={globalStyle.headerText}>What is the highest level of training that you have completed?</Text>
                </View>
                <FlatList
                   data = {this.state.data}
                   extraData={this.state}
                   renderItem = {({item,index}) => this._renderItem(item,index)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    row: {
        borderBottomWidth: 2,
        flexDirection: 'row',
        paddingVertical : 5,
    },

});
