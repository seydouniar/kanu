import * as ImagePicker from 'expo-image-picker'
import {PICKER_LIBRARY} from './types'
import * as Permissions from 'expo-permissions';



export const takeFromLibrary=(callback) => async (dispatch)=>{
   
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      aspect: [6,8],
      quality:1
    });
   
    if(!result.cancelled){

      dispatch({type:PICKER_LIBRARY,payload:result.uri})
      callback();
    }
 
  
}

export const takeFromCamera = (callback) => async (dispatch)=>{

  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing:true,
    aspect: [6,8],
    quality:1
  });
  console.log(result);
  if(!result.cancelled){
    dispatch({type:PICKER_LIBRARY,payload:result.uri})
    callback();
  }
}