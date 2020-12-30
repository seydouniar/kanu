import React, { Component } from 'react';
import {Card,Button,Input} from 'react-native-elements';
import {emailChanged,passwordChanged} from '../actions';
import {connect} from 'react-redux'

class LoginForm extends Component {

    onChangeEmail(text){
        this.props.emailChanged(text);

    }

    onChangePassword(text){
        this.props.passwordChanged(text);
    }
    render() {
        return (
            <Card>
                <Input 
                leftIcon={{type:'font-awesome', name:'envelope'}}
                placeholder="example@typemail.com"
                value={this.props.email}
                autoCorrect={false}
                onChangeText={this.onChangeEmail.bind(this)}/>
                <Input 
                leftIcon={{type:'font-awesome', name:'lock'}}
                placeholder="Password"
                autoCorrect={false}
                value={this.props.password}
                onChangeText={this.onChangePassword.bind(this)}
                secureTextEntry={true}/>
                <Button title={this.props.title} onPress={()=>this.props.onButtonPressed()} />
            </Card>
        )
    }
}
const mapStateToProps = (state)=>{
    const {email,password,user} = state.auth
    return {email, password, user};
}

export default connect(mapStateToProps,{emailChanged,passwordChanged})(LoginForm);