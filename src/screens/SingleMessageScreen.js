import React, { Component } from 'react';
import {ImageBackground,View,StyleSheet,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {connect} from 'react-redux';
import * as actions from '../actions';
import {Header} from '../components/common';
import MessagesComponent from '../components/MessagesComponent'

class SingleMessagesScreen extends Component {
   
    render() {
        const {photoURL,name} = this.props.user;
        return(
            <ImageBackground 
                source = {require('../../assets/img/background.jpg')}
                style={styles.image}>
                <Header title={name} />
                
                <MessagesComponent />
                 
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'cover',
      },
   
})

const mapStateToprops = state =>{
    const user = state.user;
    return {user};
}

export default connect(mapStateToprops,actions)(SingleMessagesScreen);