/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
==========================================================================================*/

export default {
  SET_AGENCIES_REALESTATE(state, payload) {
    let AgenciesList = [];
    let OptionAgencyName = {
      group: "اسماء الشركات",
      name: null
    };
    AgenciesList.push(OptionAgencyName);
    payload.data.forEach(item => {
      let option = {
        id: item.id,
        type: item.type,
        name: item.name,
        path: ""
      };
      AgenciesList.push(option);
    });
    state.AgenciesRealEstate = AgenciesList;
  },
};
