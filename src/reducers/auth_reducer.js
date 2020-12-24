import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAILED
} from '../actions/types';

export default (state={},action)=>{
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return {token:action.payload};
    case FACEBOOK_LOGIN_FAILED:
      return {token:null};
    default:
      return state;
  }
}