import React, { Component } from 'react';
import {ImageBackground, ActivityIndicator,StyleSheet} from 'react-native'
import {connect} from 'react-redux';
import * as actions from '../actions';
import _ from 'lodash'
import {firebase} from '../firebase/config'
import { CommonActions } from '@react-navigation/native';

class LoadingScreen extends Component {
    componentDidMount(){
        this.onLoginComplete()
    }
    


    onLoginComplete(){
        firebase.auth().onAuthStateChanged((user)=>{
            if(user) {
                this.props.navigation
                .dispatch(
                    CommonActions.navigate(
                        {name:'main' }
                    ),
                        CommonActions.reset(
                            {
                                index: 1,
                                routes: [
                                { name: 'match' },
                               
                                ]
                            }
                        )
                )
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
    return user
}
export default connect(mapStateTopProps,actions)(LoadingScreen);