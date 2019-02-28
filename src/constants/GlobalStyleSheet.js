import {StyleSheet,Dimensions} from 'react-native';
const { height, width } = Dimensions.get('window');


export const globalStyle = StyleSheet.create({
    container: {
          flex :  1,
          backgroundColor: 'white'
     },

    headerView: {
        borderBottomWidth: 2,
        borderColor: 'black',
        justifyContent: 'center',
        paddingHorizontal : 10,
        paddingVertical : 30,
    },

    headerText: {
        fontSize: height * 0.03,
        fontWeight: 'bold',
        color: '#696E75'

    },

    flatList: {
      backgroundColor: 'white',
    },

    radioButton:{
      height: 50,
      width : 60,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal : 20,
    },

    row: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingVertical : 5,
        borderColor:"grey"

    },

    optionText: {
        fontSize: height * 0.025,
        color: '#696E75',
    },
    optionsContainerView:{
        flex: 1,
        justifyContent: 'center'
    },


});
