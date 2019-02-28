import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Keyboard,
    Dimensions,
    TextInput,
    FlatList,
    Image
} from 'react-native'
import { Actions, ActionConst } from 'react-native-router-flux'
import { RightButton } from '../../components/RightButton'
import Micon from 'react-native-vector-icons/MaterialIcons'
import Ficon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { globalStyle } from '../../constants/GlobalStyleSheet.js'
import { App_Constant } from '../../constants/Costant.js'
import Icon from 'react-native-vector-icons/Ionicons'
import DropdownAlert from 'react-native-dropdownalert'
const { height, width } = Dimensions.get('window')
const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height
export default class StaffSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            abc: 'a'
        }
    }
    passcodeLogin() {
        this.dropdown.alertWithType('success', 'Notification', 'Comming Soon')
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#ECEFF1'
                }}>
                <View style={{}}>
                    <TouchableOpacity
                        style={{ backgroundColor: '#fff', paddingTop: WINDOW_HEIGHT / 25, paddingBottom: WINDOW_HEIGHT / 60, }}
                        onPress={() => {
                            Actions.pop()
                        }}>
                        <Icon
                            style={{ paddingLeft: 10 }}
                            name="ios-arrow-back"
                            size={25}
                            color="#008FAC"
                        />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: WINDOW_HEIGHT / 40 }}>
                        <Text style={{ fontSize: 40, color: 'grey' }}>Cybemed 360 Staff Mode</Text>
                    </View>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}>
                        <View style={{ margin: WINDOW_HEIGHT / 40, }}>
                            <Image style={{ width: WINDOW_WIDTH, height: WINDOW_HEIGHT / 2.2 }} source={require('../../images/patients.png')} />
                        </View>
                    </View>
                    <View style={{ marginTop: WINDOW_HEIGHT / 20 }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.passcodeLogin()
                            }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <View style={styles.buttonStyle}>
                                    <Text style={styles.buttonText}>
                                        Login with Passcode
                         </Text>
                                    <View style={{ justifyContent: 'center', }}>
                                        <Image style={{ width: WINDOW_WIDTH / 30, height: WINDOW_HEIGHT / 45 }} source={require('../../images/grid.png')} />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                Actions.QRCodeAuth({routePage:'StaffDetail'})
                            }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <View style={styles.buttonStyle}>
                                    <Text style={styles.buttonText}>
                                        Login with Bank ID
                         </Text>
                                    <View style={{ justifyContent: 'center', }}>
                                        <Image style={{ width: WINDOW_WIDTH / 30, height: WINDOW_HEIGHT / 45 }} source={require('../../images/staffLogo.png')} />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <DropdownAlert ref={ref => (this.dropdown = ref)} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    centuryContainer: {
        marginBottom: WINDOW_HEIGHT / 15,
        height: WINDOW_HEIGHT / 10,
        width: WINDOW_WIDTH / 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#30C2FF'
    },
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        width: WINDOW_WIDTH / 3,
        padding: 17,
        borderRadius: 15,
        margin: 20,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 10, width: 0 },
    },
    buttonText: {
        fontSize: 20,
        color: 'grey',
        fontWeight: 'bold'
    }

})
