import {LIKED_OK,GET_ALL_USER_SUCCESS} from '../actions/types';

export default (state=[],action)=>{
    switch (action.type) {
        case LIKED_OK:
            return action.payload;
        case GET_ALL_USER_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}