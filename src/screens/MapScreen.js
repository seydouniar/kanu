import React, { Component } from 'react';
import {View, Text} from 'react-native'
import {Button} from 'react-native-elements'
import {connect} from 'react-redux'
import * as actions from '../actions'

class MapScreen extends Component {
    state = {token:null}
    async UNSAFE_componentWillMount() {
      let token = await AsyncStorage.getItem('fb_token');
      if(token){
        this.setState({token})
      } else {
        this.setState({token:false})
        this.props.navigation.navigate('welcome')
      }
    }
    render() {
        console.log(this.props);
        return(
            <View>
                <Text>MapScreen</Text>
                <Text>MapScreen</Text>
                <Text>MapScreen</Text>
                <Text>MapScreen</Text>
                <Button 
                title="logOut"
                onPress={()=>{this.props.logoutFacebook(()=>this.props.navigation.navigate('welcome'))}} 
                />
            </View>
        )

        
    }
}

export default connect(null,actions)(MapScreen);