import {
    FETCH_USER_FAILED,
    FETCH_USER_SUCCESS,
    USER_DATE_CHANGED,
    USER_NAME_CHANGED
} from '../actions/types'

export default (state={name:"",date:"",user:null},action)=>{
    switch (action.type) {
        case FETCH_USER_SUCCESS :
            return {...state,user:action.payload};
        case USER_DATE_CHANGED :
            return {...state,date:action.payload};
        case USER_NAME_CHANGED :
            return {...state,name:action.payload};;
        case FETCH_USER_FAILED :
            return false;
        default:
           return state;
    }

}