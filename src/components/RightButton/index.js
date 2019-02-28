import { Actions } from 'react-native-router-flux'
import { TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const { height, width } = Dimensions.get('window');

export const RightButton = (Perform_Action)=>(
        <TouchableOpacity onPress={Perform_Action} style={{ flex: 1, padding:height*0.01, justifyContent: 'center', alignItems: 'flex-start' }}>
          {/*<Image  style={{width: 34, height: 40}} source={require('./../../images/next.png')} />*/}
        </TouchableOpacity>
      )
