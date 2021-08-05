import {firebase} from '../firebase/config';
import {LIKED_OK,GET_ALL_USER_SUCCESS} from './types'

export const getAllUser=()=>(dispatch)=>{
    let users = []
    firebase.database().ref(`/kanu/`).on('value',snapshot=>{
        snapshot.forEach(child=>{
            firebase.database().ref(`/kanu/${child.key}/users`).on('value',snapshotd=>{
                users.push({...snapshotd.val(),id:child.key});
            })
        });
        dispatch({type:GET_ALL_USER_SUCCESS,payload:users});
        
    }, err=>console.log(err))
    
}
export const likes = (liked_id)=>(dispacth)=>{
    const id = firebase.auth().currentUser.uid;
    firebase.database().ref(`/kanu/${id}/likes`).child(liked_id)
    .set({timestamp:firebase.database.ServerValue.TIMESTAMP})

}

export const disLikes = (liked_id)=>(dispacth)=>{
    const id = firebase.auth().currentUser.uid;
    firebase.database().ref(`/kanu/${id}/dislikes`).child(liked_id)
    .set({timestamp:firebase.database.ServerValue.TIMESTAMP})
}

export const getMatchs = ()=>(dispacth)=>{
    const id = firebase.auth().currentUser.uid;
    let matchs = []
    firebase.database().ref(`/kanu/${id}/likes`).on('value',snapshot=>{
        snapshot.forEach(child => {
            if(checkLikes(child.key)){
                dispacth({type:LIKED_OK,payload:[...matchs,{likeId:child.key}]})
            }
        });
    })  
}

const checkLikes=(liked_id)=>{
    const id = firebase.auth().currentUser.uid;
    firebase.database().ref(`/kanu/${liked_id}/likes`).child(id)
    .on('value',snapshot=>{
        if(snapshot.val()!=null){
           return true;
        }else{
            return false;
        }
    })
}

