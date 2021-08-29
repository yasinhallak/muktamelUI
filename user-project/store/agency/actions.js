/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
==========================================================================================*/
let isCalled = false;

export default {
    fetchAgencies_realEstates({commit}) {
    if(isCalled) return
      isCalled = true;
    return new Promise((resolve, reject) => {
      let payload = {
        Types: [
          this.$AgencyType.realestate,
          this.$AgencyType.estatedev,
          this.$AgencyType.auction
        ]
      };
       this.$axios
        .post(`/agency/all`, payload)
        .then(response => {
          commit("SET_AGENCIES_REALESTATE", response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

};
