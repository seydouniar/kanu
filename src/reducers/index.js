import {combineReducers} from 'redux';
import auth from './auth_reducer';
import user from './user_reducer';
import image from './image_reducer';
import match from './match_reducer';
export default combineReducers({
    auth,
    user,
    image,
    match,
});


