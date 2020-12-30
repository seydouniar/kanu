import React, { Component } from 'react';
import {View, Text, ImageBackground} from 'react-native'
import {Button} from 'react-native-elements'
import {connect} from 'react-redux'
import * as actions from '../actions'

class MapScreen extends Component {
    
    componentDidMount(){
        this.props.navigation.jumpTo('match')
    }
    render() {
        return(
            <ImageBackground 
            source = {require('../../assets/img/background.jpg')}
            style={styles.image}>
                <Button 
                title="logOut"
                onPress={()=>{this.props.logoutFacebook(()=>this.props.navigation.navigate('welcome'))}} 
                />

            </ImageBackground>
            
                
           
        )

        
    }
}

const styles = {
    image: {
        marginTop:20,
        flex: 1,
        resizeMode: 'cover',
      }
}
export default connect(null,actions)(MapScreen);