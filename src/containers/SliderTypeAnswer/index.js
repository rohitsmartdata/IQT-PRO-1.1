import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Slider,
    FlatList
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RightButton } from '../../components/RightButton'
import { Actions } from 'react-native-router-flux'
import { globalStyle } from '../../constants/GlobalStyleSheet.js';
import { App_Constant } from '../../constants/Costant.js';

const { height, width } = Dimensions.get('window');

const data = [
    {
        type: 'While motionless',
        value: 50
    },
    {
        type: 'While sitting',
        value: 50
    },
    {
        type: 'While standing',
        value: 50
    }
]

export default class SliderTypeAnswer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: data
        };
        this._renderItem = this._renderItem.bind(this)
        this.onValueChange = this.onValueChange
    }

    componentWillMount() {
        Actions.refresh({ right: RightButton(Actions.SelectCountry) })
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={[styles.row,]}>
                <View style={[styles.queView, { paddingHorizontal: height * 0.05, alignItems: "center" }]}>
                    <Text style={[globalStyle.headerText, { fontWeight: 'normal' }]}>
                        {item.type}
                    </Text>
                </View>
                <View style={[styles.queView, { paddingHorizontal: height * 0.02 }]}>
                <View style={{ alignItems: "center", marginBottom: 30 }}>
                        <Text style={{ color: "#87D791", fontWeight: "bold" }}>{Math.round(item.value)}</Text>
                    </View>
                    <View style={{ flex: 0.6, justifyContent: 'center' }}>
                        <Slider
                            maximumValue={100}
                            thumbTintColor='black'
                            minimumTrackTintColor='#87D791'
                            onValueChange={(value) => this.onValueChange(value, index)}
                            value={item.value}
                        />
                    </View>
                    
                    <View style={{ flex: 0.4, flexDirection: 'row' }}>
                        <View style={{ flex: 0.5, alignItems: 'flex-start' }}>
                            <Text style={styles.sliderText}>very low</Text>
                        </View>
                        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                            <Text style={styles.sliderText}>very high</Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }

    onValueChange(value, index) {
        let data = this.state.data
        data[index].value = value
        this.setState({ data: data })
    }

    render() {
        return (
            <View style={globalStyle.container}>
                {/*<View style={globalStyle.headerView}>*/}
                {/*<Text style={globalStyle.headerText}>My back pain</Text>*/}
                {/*</View>*/}

                <FlatList
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={item => item}
                    renderItem={this._renderItem}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({

    row: {
        height: height * 0.2
    },
    queView: {
        flex: 1,
        justifyContent: 'center',

        // borderBottomWidth: 2,
        paddingVertical: 5,
    },
    sliderText: {
        color: 'gray'
    }
});
