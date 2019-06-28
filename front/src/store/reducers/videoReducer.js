import { GET_ALL_VIDEO, ADD_VIDEO,GET_TOPIC_LIST  } from "../actions/types";

const initialState = {
  // isAuthenticated: false,
  allVideo: {},
  allTopic: [],
  messageFromBack:"",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_VIDEO:
      return {
        ...state,
        // isAuthenticated: !isEmpty(action.payload),
        allVideo: action.payload
      };
    case ADD_VIDEO:
      return {...state, messageFromBack: action.payload};
    case GET_TOPIC_LIST:
       return {...state, allTopic: action.payload}
    default:
      return state;
  }
}
