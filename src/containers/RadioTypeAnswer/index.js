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

import Svg, {
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    TSpan,
    Defs,
    Stop
} from 'react-native-svg';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
export default class RadioTypeAnswer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            data: [
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
        this._renderItem = this._renderItem.bind(this)
    }

    componentWillMount(){
      Actions.refresh({ right: RightButton(Actions.RadioTypeAnswer2) })
    }
    componentDidMount(){
       Keyboard.dismiss()
    }

    _renderItem( item, index ){
        return (
            <TouchableOpacity onPress={() => this.setState({ selectedOption: index })}
                style={[styles.row,]}>
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



   
}

const styles = StyleSheet.create({

    row: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingVertical : 5,
        borderColor:"grey"
    },

});
