/*=========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
==========================================================================================*/

export default  {
  // Updates user info in state and localstorage
  UPDATE_USER_INFO(state, payload) {
    // Get Data localStorage
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || state.AppActiveUser;

    for (const property of Object.keys(payload)) {
      if (payload[property] != null) {
        // If some of user property is null - user default property defined in state.AppActiveUser
        state.AppActiveUser[property] = payload[property];

        // Update key in localStorage
        userInfo[property] = payload[property];
      }
    }
    // Store data in localStorage
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  },
  updateLists(state, payload) {
    state.lists = payload;
  },
  getAddress(state, payload) {
    state.getAddress = payload;
  },
  loading(state, payload) {
    state.isLoading = payload;
  },
  updateTitle(state, payload) {
    state.LoginTitle = payload;
  },
  updateModalState(state, payload) {
    state.LoginModalShown = payload;
  },
  SET_REAL_ESTATE_DETAIL(state,payload){
    state.realEstateDetail = payload;
  },
  SET_PLAN_DETAIL(state,payload){
    state.planDetail = payload;
  },
  SET_USER_FAVORITES(state,payload){
    state.userFavorites = payload;
  }
};

