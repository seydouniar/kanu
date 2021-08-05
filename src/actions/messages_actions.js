import {FETCH_MESSAGE_FAILED,FETCH_MESSAGE_SUCCESS} from './types';
import {firebase} from '../firebase/config'

export const getMessages = async (id)=>(dispatch)=>{

}

export const sendMessage = async (message) => (dispatch) =>{
    const currentId = firebase.auth().currentUser.uid;
    firebase.database().ref(`/chats/${currentId}/messages`)
    .push().set({...message,senderId:currentId}).then(
        (res)=>{
            firebase.database().ref(`/chats/${message.receiverId}/messages`)
            .push().set({...message,senderId:message.receiverId});
        }
    )

}