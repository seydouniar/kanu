import React, { Component } from 'react';
import {View, Text,Button} from 'react-native'
import * as actions from '../actions';
import {connect} from 'react-redux'
import ProfileForm from '../components/ProfileForm'

class RegistryScreen extends Component {

    onValideUser(){
        this.props.storeUser(this.props.user);
    }
    render() {
        return(
            <View>
                <ProfileForm isFirst={true}/>
                
                <Button title="deconnecter" onPress={
                    ()=>{
                        this.props.logoutFacebook(()=>{
                            this.props.navigation.navigate('welcome',{screen:'loading'})
                        })
                    }
                } />
            </View>
        )
    }
}

const mapStateToprops = state => {
    const user = state;
    return {user};
}
export default connect(mapStateToprops,actions)(RegistryScreen);