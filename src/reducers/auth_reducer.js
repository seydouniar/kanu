import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    EMAIL_CHANGED,
    PASSWORD_CHANGED
} from '../actions/types';
const INITIAL_STATE = {
  email:'',
  password:'',
  user: null
}
export default (state=INITIAL_STATE,action)=>{
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state,user:action.payload};
    case LOGIN_FAILED:
      return {...state,user:null};
    case EMAIL_CHANGED:
      return {...state,email:action.payload};
    case PASSWORD_CHANGED:
      return {...state,password:action.payload};
    default:
      return state;
  }
}