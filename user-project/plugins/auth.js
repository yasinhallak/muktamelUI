/***
 * Created Subhi Al Wattar
 * User: Subhi Al Wattar
 * Date: 7/23/2020
 * Time: 6:13 PM
 ***/


export default function({ $axios,$auth,store }) {
  //let $axios = $auth.ctx.$axios;

  /*console.log('auth',$auth);

  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })*/

  /*async function getAccessToken(){
    console.log('fetching the new token');
    //let endpoint = $auth.options.endpoints.refresh;
    //let defaults = $axios.defaults;
    //let request = Object.assign({}, defaults, endpoint)

    //console.log('fetching the new token request: ',request)
    //let response = await $axios.request(request);

    let response = await $axios.post($auth.options.endpoints.refresh.url,{
      token: $auth.getToken('loacl'),
      refreshToken: "abcabcabc"
    });

    return response.data.token;
  }*/

  /*$axios.onResponseError(async function (error) {

    const code = error.response && error.response.status
    const originalRequest = error.config;

    if(originalRequest.__isRetry ||
      code !== 401 ||
      originalRequest.url === $auth.strategy.options.endpoints.refresh.url ||
      !$auth.check()){
      return Promise.reject(error);
    }

    if(store.state.isTokenRefreshing){
      return;
    }
    store.state.isTokenRefreshing = true;

    await $auth.refreshTokens().catch((error) => {
      // Tokens couldn't be refreshed. Force reset.
      $auth.reset();
      throw error;
    });

    // mark request as retry request
    originalRequest.__isRetry = true;

    originalRequest.headers[$auth.strategy.options.token.name] = $auth.token.get();

    store.state.isTokenRefreshing = false;
    return $axios(originalRequest);

  })*/
}


