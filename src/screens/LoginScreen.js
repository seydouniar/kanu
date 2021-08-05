import React, { Component } from 'react';
import {ImageBackground,View,ActivityIndicator} from 'react-native'
import LoginForm from '../components/LoginForm';
import * as actions from '../actions'
import {connect} from 'react-redux'
import {ModalView} from '../components/common'

class LoginScreen extends Component {
    state ={loading:false}
    onButtonPressed(){
        this.setState({loading:true})
        const {email,password} = this.props;
        this.props.loginFirebase({email,password},()=>{
            this.setState({loading:false});
            this.props.navigation.navigate('main');
        },(err)=>{
            this.setState({loading:false})
            console.log(err.message);
        });
        
    }
    render() {
        return(
        <ImageBackground style={styles.image}
        source={require('../../assets/img/background.jpg')}>
            <LoginForm title="Se connecter" onButtonPressed={this.onButtonPressed.bind(this)}/>

            <ModalView visible={this.state.loading}>
                <View style={styles.loadingStyle}>
                    <ActivityIndicator size='large' color="#0ff"/>
                </View>
            </ModalView>
           
        </ImageBackground>
            )
        }
}

const styles = {
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
    loadingStyle:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#0002'
      }
    
}

const mapStateToProps = (state)=>{
    const {email,password,error} = state.auth;
    return {email,password,error};
}

export default connect(mapStateToProps,actions)(LoginScreen);