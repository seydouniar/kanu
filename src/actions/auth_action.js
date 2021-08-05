import {Facebook} from '../facebook/config';
import {firebase} from '../firebase/config';
import {
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    EMAIL_CHANGED,
    PASSWORD_CHANGED
} from './types';



export const emailChanged = (text)=>(dispatch)=>{
    dispatch({type:EMAIL_CHANGED,payload:text})
}

export const passwordChanged = (text)=>(dispatch)=>{
    dispatch({type:PASSWORD_CHANGED,payload:text})
}

//signin user facebook
export const loginFacebook = ()=> async (dispatch) => {
    const user = firebase.auth().currentUser;
    if(user){
        dispatch({type:LOGIN_SUCCESS,payload:user})
    } else{
        doFacebookLogin(dispatch);
    }
}


//signin user firebase
export const loginFirebase=({email,password},callback,errorFunc)=>async (dispatch)=>{
    doFirebaseLogin({email,password},callback,errorFunc,dispatch)
}

// signup user firebase
export const signUpFirebase=({email,password})=>(dispatch)=>{
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((user)=>{
        storeUser(user)
        dispatch({type:LOGIN_SUCCESS,payload: user})
    })
    .catch((err)=>{
        dispatch({type:LOGIN_FAILED, payload:err.message})
    })
}
//sign with google
export const loginGoogle=()=>async(dispatch)=>{
    
}
// signout
export const logoutFacebook = (callback)=> async (dispatch)=>{
    await Facebook.logOutAsync();
    firebase.auth().signOut().then(() => {
        dispatch({type:LOGIN_FAILED});
        callback();
      }).catch((error) => {
        console.error(error);
      }); 
}

const doFacebookLogin=async (dispatch)=>{
    let {type,token}= await Facebook
    .logInWithReadPermissionsAsync({permissions:['public_profile', 'email']});
    if(type==='cancel') {
        return dispatch({type:LOGIN_FAILED})
    }
    const credential = firebase.auth
    .FacebookAuthProvider.credential({ accessToken: token })
    firebase.auth().signInWithCredential(credential).then((user)=>{
        storeUser(user)
        dispatch({type:LOGIN_SUCCESS, payload: user});
    })
    .catch(err=>console.error(err)) 
}


doFirebaseLogin= ({email,password},callback,errfunc,dispatch)=>{
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((user)=>{
        storeUser(user);
        dispatch({type:LOGIN_SUCCESS,payload: user})
        callback();
    })
    .catch((err)=>{
        dispatch({type:LOGIN_FAILED,payload:err.message})
        errfunc(err)
    })
}

const storeUser = (user) => (dispatch)=>{
    firebase.database().ref(`Kanu/${user.uid}`).set(user)
}