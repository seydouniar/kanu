import * as Facebook from 'expo-facebook';
import {AsyncStorage} from 'react-native';
import {
    FACEBOOK_LOGIN_FAILED,
    FACEBOOK_LOGIN_SUCCESS
} from './types';

export const loginFacebook = () => async(dispatch) => {
    const token = await AsyncStorage.getItem('fb_token');
    if(token){
        dispatch({type:FACEBOOK_LOGIN_SUCCESS,payload:token});
    }else{
        doFacebookLogin(dispatch);
    }
}

export const logoutFacebook = (callback)=> async (dispatch)=>{
    await Facebook.logOutAsync();
    await AsyncStorage.removeItem('fb_token')
    dispatch({type:FACEBOOK_LOGIN_FAILED})
    callback();
}

const doFacebookLogin = async (dispatch) => {
    let {type,token}= await Facebook
    .logInWithReadPermissionsAsync({permissions:['public_profile', 'email']});
    if(type==='cancel') {
        return dispatch({type:FACEBOOK_LOGIN_FAILED})
    }
    await AsyncStorage.setItem('fb_token',token);
    dispatch({type:FACEBOOK_LOGIN_SUCCESS, payload:token})
    
}