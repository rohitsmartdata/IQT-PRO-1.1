import React, { Component } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Login Page</Text>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        LoginReducer: state.LoginReducer,
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({ login }, dispatch);
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);