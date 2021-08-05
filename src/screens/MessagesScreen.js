import React, { Component } from 'react';
import {ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../actions'
import {MatchItem} from '../components/common'

class MessagesScreen extends Component {
    
    gotoSingleMessage(){
        this.props.navigation.navigate('singlemsg');
    }
    render() {
        const {photoURL,name} = this.props.user;
        return(
            <ImageBackground 
            source = {require('../../assets/img/background.jpg')}
            style={styles.image}>
                <MatchItem 
                    photo={photoURL}
                    name = {name}
                    lastMessage="hello world I m seydou I work in itech for my own projects"
                    onPress = {this.gotoSingleMessage.bind(this)}
                />
            </ImageBackground>
        )
    }
}

const styles = {
    image: {
        flex: 1,
        resizeMode: 'cover',
      }
}

const mapStateToprops = state =>{
    const user = state.user;
    return {user};
}

export default connect(mapStateToprops,actions)(MessagesScreen);