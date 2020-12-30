import React, { Component } from 'react';
import {View, Text} from 'react-native'
import UserProfileForm from '../components/UserProfileForm';

class RegistryScreen extends Component {
    render() {
        return(
            <View>
                <UserProfileForm />
            </View>
        )
    }
}

export default RegistryScreen;