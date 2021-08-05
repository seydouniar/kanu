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
    
  
    onLoginComplete(){
        firebase.auth().onAuthStateChanged((user)=>{
            if(user) {  
                this.props.getUser(()=>{
                const {name,birth,sexe} = this.props.user
                if(name&&birth&&sexe) {
                this.props.navigation
                    .dispatch(
                            CommonActions.reset(
                                {
                                    index: 1,
                                    routes: [
                                    { name: 'main' ,
                                        index:1,
                                        state:{
                                            routes:[
                                                {name:'match'},
                                                {name:'map'},
                                                {name:'messages'},
                                                {name:'profile'},
                                            ]
                                        }  
                                    },   
                                    ]
                                }
                            )
                    )
                    } else {
                        this.props.navigation.dispatch(
                            CommonActions.reset({
                                index:1,
                                routes:[{name:'registry'}]
                            })
                        )
                     }
                 });
                
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
    const user=state.user;
    return {user}
}
export default connect(mapStateTopProps,actions)(LoadingScreen);