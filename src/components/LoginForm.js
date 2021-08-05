import React, { Component } from 'react';
import {Card,Button,Input, Text} from 'react-native-elements';
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
        const {email,password,error} = this.props;
        return (
            <Card>
                <Input 
                leftIcon={{type:'font-awesome', name:'envelope'}}
                placeholder="example@typemail.com"
                value={email}
                autoCorrect={false}
                autoCapitalize={false}
                onChangeText={this.onChangeEmail.bind(this)}/>
                <Input 
                leftIcon={{type:'font-awesome', name:'lock'}}
                placeholder="Password"
                autoCorrect={false}
                value={password}
                onChangeText={this.onChangePassword.bind(this)}
                secureTextEntry={true}/>
                <Button title={this.props.title} onPress={()=>this.props.onButtonPressed()} />

                {error?<Text style={{color:'red',fontSize:16}}>{error}</Text>:null}
            </Card>
        )
    }
}
const mapStateToProps = (state)=>{
    const {email,password,user,error} = state.auth
    return {email, password, user,error};
}

export default connect(mapStateToProps,{emailChanged,passwordChanged})(LoginForm);