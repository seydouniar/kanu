import React, { Component } from 'react';
import {ImageBackground} from 'react-native'
import LoginForm from '../components/LoginForm';
import * as actions from '../actions'
import {connect} from 'react-redux'

class LoginScreen extends Component {
    onButtonPressed(){
        const {email,password} = this.props;
        this.props.loginFirebase({email,password},()=>{
            this.props.navigation.navigate('main');
        });
        
    }
    render() {
        return(
    <ImageBackground style={styles.image}
    source={require('../../assets/img/background.jpg')}>
        <LoginForm title="Se connecter" onButtonPressed={this.onButtonPressed.bind(this)}/>
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

const mapStateToProps = (state)=>{
    const {email,password} = state.auth;
    return {email,password};
}

export default connect(mapStateToProps,actions)(LoginScreen);