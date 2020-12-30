import React, { Component } from 'react';
import {View, Text,ImageBackground} from 'react-native';
import {Header} from '../components/common'


class MatchScreen extends Component {
   componentDidMount(){
       this.props.navigation.setOptions({
        title:'Match',
        headerRight: () => (<Text>Setting</Text>)
       })
   }
    render() {
        return(
            <ImageBackground 
            source = {require('../../assets/img/background.jpg')}
            style={styles.image}>
                
                <Text>MatchScreen</Text>
                <Text>MatchScreen</Text>
                <Text>MatchScreen</Text>
                <Text>MatchScreen</Text>
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

export default MatchScreen;