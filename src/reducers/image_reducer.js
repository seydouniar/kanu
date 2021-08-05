import {PICKER_LIBRARY} from '../actions/types';

export default (state={uri:null},actions) => {
    switch (actions.type) {
        case PICKER_LIBRARY:
            return {...state,uri:actions.payload};
        default:
            return state;
    }
}