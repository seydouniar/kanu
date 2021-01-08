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

const createFileName=() => {
    var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
    return newFileName;
}
export const updatePhoto=(uri)=> async (dispatch)=>{
    const user = firebase.auth().currentUser
  
    const filename = createFileName()
    const reponse =await fetch(uri);
    const blob = await reponse.blob();
    const imgRef= firebase.storage().ref().child("images")
    .child(user.uid).child(filename);
    console.log("success upload");
    imgRef.put(blob).then(snapshot=>{
        imgRef.getDownloadURL().then(url=>{
            user.updateProfile({
                photoURL: url
              })
        })
    });
    

    
}

export const storeUser = (user) => (dispatch)=>{
    const id = firebase.auth().currentUser.uid;
    firebase.database().ref(`/kanu/${id}/users`)
    .set(user);  
}

export const getUser= ()=>async (dispatch)=>{
    try{
        const user = firebase.auth().currentUser;
        if(user){
            firebase.database().ref(`/kanu/${user.uid}/users`).get()
            .then(snapshot=>{
                dispatch({type:FETCH_USER_SUCCESS,payload:snapshot.val()})
            }).catch(()=>{
                dispatch({type:FETCH_USER_FAILED})
            })
        }
    }catch(err){
        console.error(err);
    }
    
    
}