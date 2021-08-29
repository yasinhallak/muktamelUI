/*=========================================================================================
  File Name: state.js
  Description: Vuex Store - state
==========================================================================================*/


export default () => ({
  //isTokenRefreshing: false,
  isLoading: false,
  // RealEstate
  lists: [],
  getAddress: [],
  LoginModalShown: false,
  LoginTitle:null,
  realEstateDetail:null,
  planDetail:null,
  userFavorites: {
    realEstateStatistics: null,
    engineeringStatistics: null
  }
})
