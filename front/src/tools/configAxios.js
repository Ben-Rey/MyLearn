import store from "../store/store";

let config = {
    headers: store.getState().auth. {'Authorization': 'JWT ' + this.$store.state.token},
    params: {},
  }