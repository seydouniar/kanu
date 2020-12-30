import {firebase} from '../firebase/config';
import {
    FETCH_USER_FAILED,
    FETCH_USER_SUCCESS,
    USER_DATE_CHANGED,
    USER_NAME_CHANGED
    } from './types'

export const userNameChanged=(text)=>(dispatch)=>{
    dispatch({type:USER_NAME_CHANGED,payload:text})
}
export const userDateChanged=(text)=>(dispatch)=>{
    dispatch({type:USER_DATE_CHANGED, payload:text});
}
export const storeUser = (user,callback) => (dispatch)=>{
    const id = firebase.auth().currentUser.uid;
    firebase.database().ref(`/kanu/${id}/users`)
    .set(user)
    .then(()=>{
        callback();
    })
    
}

export const getUser= ()=>(dispatch)=>{
    const id = firebase.auth().currentUser.uid;
    firebase.database().ref(`/kanu/${id}/users`).get()
    .then(snapshot=>{
        dispatch({type:FETCH_USER_SUCCESS,payload:snapshot.val()})
    }).catch(()=>{
        dispatch({type:FETCH_USER_FAILED})
    })
}