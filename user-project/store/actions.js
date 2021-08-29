

/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
==========================================================================================*/

export default {
  async loadLists({
                    commit
                  }) {
    // check the url path
    await this.$axios.get(`/json/static.json`).then(response => {
      commit("updateLists", response.data);
    });
  },
  async loadAddress({
                      commit
                    }) {
    await this.$axios.get(`${process.env.baseUrl}/json/layout.json`).then(response => {
      commit("getAddress", response.data);
    });
  },
  // add to favorite
  async AddFavorite({commit},payload) {
    return new Promise((resolve, reject) => {
      let favorite = payload.isFavorite ? false : true;
      this.$axios
        .post(`/favorite/${payload.offerId}?isFavorite=${favorite}`)
        .then(response => resolve(favorite))
        .catch(error => {
          reject(error);
          console.log(error.response);
          if (error.response.status == 401) {
            commit('updateModalState',true);
            commit('updateTitle',"  لكي يتم إضافة هذا العنصر للمفضلة يجب عليك تسجيل الدخول أولا");
          }
        });
    });
  },

  // update phone statistics
  async updateStatistics({commit},payload){
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`/offer/${payload.offerId}/updateStatistics`,{StatusStatistics: payload.statistics})
        .then(response => resolve())
        .catch(error => {
          reject(error);
          console.log(error.response);

        });
    });
  },

  // get Agency
  async getAgency({commit}, id ) {
    return await this.$axios.get(`/agency/${id}/profile`);
  },

  // post Contact us form
  async postContactForm({commit},payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`/contactUs`,payload)
        .then(response => resolve(response))
        .catch(error => {
          reject(error);

        });
    });
  },

  // post Help form
  async postHelpForm({commit},payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`/contactUs`,payload)
        .then(response => resolve(response))
        .catch(error => {
          reject(error);

        });
    });
  },

  //get real estate detail
  async getRealEstateDetail({commit},payload){
    return new Promise((resolve,reject)=>{
      this.$axios.get(`/offer/realestate/${payload}`)
        .then(async resp => {
          commit("SET_REAL_ESTATE_DETAIL", resp.data.data);
          resolve(resp);
        })
        .catch( (error)=> {
          if (error.response.status === 404) {
            reject(error);
          }
        });
    });
  },

  //get plan detail
  async getPlanDetail({commit},payload){
    return new Promise((resolve,reject)=>{
      this.$axios.get(`/offer/engineering/${payload}`)
        .then(async resp => {
          commit("SET_PLAN_DETAIL", resp.data);
          resolve(resp);
        })
        .catch( (error)=> {
          if (error.response.status === 404) {
            reject(error);
          }
        });
    });
  },

  //get user favorite
  async getUserFavorites({commit}){
    return new Promise((resolve,reject)=>{
      this.$axios.get(`/profile/user-favorite`)
        .then(async resp => {
          commit("SET_USER_FAVORITES", resp.data);
          resolve(resp);
        })
        .catch( (error)=> {
          if (error.response.status === 404) {
            this.$nuxt.context.redirect(`/404`);
            reject(error);
          }
        });
    });
  }
};

