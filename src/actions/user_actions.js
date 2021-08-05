import {firebase} from '../firebase/config';
import {
    FETCH_USER_FAILED,
    FETCH_USER_SUCCESS,
    CHANGE_PROP,
    UPDATE_PROFIL_PHOTO,
    ADD_PHOTO
    } from './types'



const createFileName=() => {
    var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
    return newFileName;
}
export const updatePhoto=(uri,callback)=> async (dispatch)=>{
    const user = firebase.auth().currentUser
  
    const filename = createFileName()
    const reponse =await fetch(uri);
    const blob = await reponse.blob();
    const imgRef= firebase.storage().ref().child("images")
    .child(user.uid).child(filename);
    
    imgRef.put(blob).then(snapshot=>{
        imgRef.getDownloadURL().then(url=>{
            dispatch({type:UPDATE_PROFIL_PHOTO,payload:url})  ;
            callback()
        })
    });
}

export const addPhoto = (uri,callback)=>async(dispatch)=>{
    const user = firebase.auth().currentUser
    const filename = createFileName();
    const reponse =await fetch(uri);
    const blob = await reponse.blob();
    const imgRef= firebase.storage().ref().child("images")
    .child(user.uid).child(filename);
    imgRef.put(blob).then(snapshot=>{
        imgRef.getDownloadURL().then(url=>{
            dispatch({type:ADD_PHOTO,payload:url})  ;
            callback();
        }).catch(err=>console.error(err))
    });
}

export const EditUserProp=(prop,value)=>(dispatch) => {
    dispatch({type:CHANGE_PROP,payload:{prop,value}});
}

export const storeUser = (user) => (dispatch)=>{
    const id = firebase.auth().currentUser.uid;
    firebase.database().ref(`/kanu/${id}/users`)
    .set(user);  
}

export const getUser= (callback)=>async (dispatch)=>{
    try{
        const user = firebase.auth().currentUser;
        if(user){
            firebase.database().ref(`/kanu/${user.uid}/users`).get()
            .then(snapshot=>{
                dispatch({type:FETCH_USER_SUCCESS,payload:snapshot.val()})
                callback();
            }).catch(()=>{
                dispatch({type:FETCH_USER_FAILED})
            })
        }
    }catch(err){
        console.error(err);
    }
    
    
}