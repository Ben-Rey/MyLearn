import { GET_ERRORS, RESET_STATE } from '../actions/types';

const initialState = {};

export default function(state = initialState, action ) {
    switch(action.type) {
        case GET_ERRORS:
            return action.payload;
        case RESET_STATE: {
            return{}


        }
        default: 
            return state;
    }
}