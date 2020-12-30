import React, { Component } from 'react';
import {View, Text, ImageBackground} from 'react-native'

class MessagesScreen extends Component {
    render() {
        return(
            <ImageBackground 
            source = {require('../../assets/img/background.jpg')}
            style={styles.image}>

            </ImageBackground>
        )
    }
}

const styles = {
    image: {
        flex: 1,
        resizeMode: 'cover',
        marginTop:20
      }
}


export default MessagesScreen;