import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, RESET_STATE } from "./types";
import setAuthToken from "../../tools/setAuthToken";
import jwt_decode from "jwt-decode";
import history from "../../history";

export const registerUser = (user, history) => dispatch => {
  axios
    .post("http://163.172.83.78:3000/api/users/register", user)
    .then(res => history.push("/"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = user => dispatch => {
  axios
    .post("http://163.172.83.78:3000/api/users/login", user)
    .then(res => {
      console.log(res);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("user", user.email);
      setAuthToken(token);
      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : null
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push("/");
};

export const resetState = () => dispatch => {
  dispatch({
    type: RESET_STATE
  });
};
