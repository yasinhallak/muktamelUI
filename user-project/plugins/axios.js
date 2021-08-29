/***
 * Created Subhi Al Wattar
 * User: Subhi Al Wattar
 * Date: 7/23/2020
 * Time: 6:13 PM
 ***/
// import axios from "axios";
// axios.defaults.baseURL = process.env.apiBaseUrl;
// // let Token =
// //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwianRpIjoiNmZmYjdmZDQtOGRmYi00ZGMyLWEwMmQtNmUwNjAyMjJjZDNlIiwiYWdlbmN5IjoidHJ1ZSIsInBob3RvZ3JhcGhlciI6InRydWUiLCJyZWFsZXN0YXRlIjoidHJ1ZSIsImVuZ2luZWVyaW5nIjoidHJ1ZSIsImVzdGF0ZWRldiI6InRydWUiLCJhdWN0aW9uIjoidHJ1ZSIsImNoYWxldCI6InRydWUiLCJuYmYiOjE1OTc4MjUzNjAsImV4cCI6MTU5OTg5ODk2MCwiaWF0IjoxNTk3ODI1MzYwfQ.icphzhW5UnHxe5lrNShEYp_O84isbBgLTbeLTem91Lw";
// // axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;

// export default axios.create({
//   withCredentials: false,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json"
//   }
// });

export default function ({$axios, redirect}) {

  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI3IiwianRpIjoiOWYzNTAxNTgtZTc2Mi00MDk2LWJjOWQtODRhODc4Mzg5MDY1IiwicmVhbGVzdGF0ZSI6InRydWUiLCJhZ2VuY3kiOiJ0cnVlIiwiZXN0YXRlZGV2IjoidHJ1ZSIsImF1Y3Rpb24iOiJ0cnVlIiwiZXN0aW1hdG9ycyI6InRydWUiLCJwaG90b2dyYXBoeSI6InRydWUiLCJlbmdpbmVlcmluZyI6InRydWUiLCJtb3J0Z2FnZSI6InRydWUiLCJjb250cnVjdG9ycyI6InRydWUiLCJzZXJ2aWNlIjoidHJ1ZSIsIm5iZiI6MTYwODU0NzY1NiwiZXhwIjoxNjA4NTc2NDU2LCJpYXQiOjE2MDg1NDc2NTZ9.BMLl4qk1tgoWByeinzVwUNddUg-NkuGGU_1bOuEZao0";
  $axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  $axios.defaults.withCredentials = true;
  /*console.log('$axios',$axios)
`
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  async function getAccessToken(){
      return "klfjalk;hgkadjshfkajsdf";
  }

  $axios.onResponseError(async function (error) {
    const code = error.response && error.response.status
    const originalRequest = error.config;
    if (code === 401 && !originalRequest._retry) {

      // mark request as retry request
      originalRequest._retry = true;

      const access_token = await getAccessToken();

      //$auth.setUserToken(access_token)

      return $axios(originalRequest);
    }
    return Promise.reject(error);
  })*/
}
