import React, { Component } from 'react';
import {Card,Button,Input} from 'react-native-elements';

class LoginForm extends Component {
    render() {
        return (
            <Card>
                <Input 
                leftIcon={{type:'font-awesome', name:'envelope'}}
                placeholder="example@typemail.com"/>
                <Input 
                leftIcon={{type:'font-awesome', name:'lock'}}
                placeholder="Password"
                 secureTextEntry={true}/>
                <Button title="Se connecter" />
            </Card>
        )
    }
}

export default LoginForm;