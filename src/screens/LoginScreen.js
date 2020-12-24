import React, { Component } from 'react';
import {View, Text,ImageBackground} from 'react-native'
import LoginForm from '../components/LoginForm';

class LoginScreen extends Component {
    render() {
        return(
    <ImageBackground style={styles.image}
    source={require('../../assets/img/background.jpg')}>
        <LoginForm />
    </ImageBackground>
        )
    }
}

const styles = {
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
    
}

export default LoginScreen;