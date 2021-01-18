import React, { Component } from 'react';
import {ImageBackground, ActivityIndicator,StyleSheet} from 'react-native'
import {connect} from 'react-redux';
import * as actions from '../actions';
import _ from 'lodash'
import {firebase} from '../firebase/config'
import { CommonActions } from '@react-navigation/native';

const URI_DEFAULT = 'https://linkpicture.com/q/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg'

class LoadingScreen extends Component {
    
    componentDidMount(){
        this.onLoginComplete()
    }
    
    UNSAFE_componentWillUpdate(){
        this.onLoginComplete()
    }
    UNSAFE_componentWillMount(){
        this.onLoginComplete()
    }
    onLoginComplete(){
        firebase.auth().onAuthStateChanged((user)=>{
            if(user) {  
                this.props.getUser();
                if(this.props.user) {
                    this.props.navigation
                .dispatch(
                    CommonActions.navigate(
                        {name:'main' }
                    ),
                        CommonActions.reset(
                            {
                                index: 0,
                                routes: [
                                { name: 'match' },
                               
                                ]
                            }
                        )
                )
                } else {
                    const {displayName,email,photoURL} = user;
                    this.props.storeUser({
                        name:displayName?displayName:"",
                        email,
                        photoURL:photoURL?photoURL:URI_DEFAULT
                    });
                }
                
            }else{
                this.props.navigation.navigate('welcome',{screen:'start'}); 
            } 
        });
    }

    render() {
        return (
        <ImageBackground source={require('../../assets/img/background.jpg')} style={styles.image}>
            <ActivityIndicator size='large' color="#fff"/>
        </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    image:{
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    }
});

const mapStateTopProps = (state)=>{
    const user=state.user.user;
    return {user}
}
export default connect(mapStateTopProps,actions)(LoadingScreen);