import { parse as parseCookie, serialize as serializeCookie } from 'cookie';

function parseSetCookies(cookies) {
  return cookies
    .map(cookie => cookie.split(';')[0])
    .reduce((obj, cookie) => ({
      ...obj,
      ...parseCookie(cookie),
    }), {});
}

function serializeCookies(cookies) {
  return Object
    .entries(cookies)
    .map(([name, value]) => serializeCookie(name,value,{path:'/'}))
    .join('; ');
}

function mergeSetCookies(oldCookies, newCookies) {
  const cookies = new Map();

  function add(setCookie) {
    const cookie = setCookie.split(';')[0];
    const name = Object.keys(parseCookie(cookie))[0];

    cookies.set(name, setCookie);
  }

  oldCookies.forEach(add);
  newCookies.forEach(add);

  return [...cookies.values()];
}

export default function ({ $axios, res, $winstonLog }) {

  $axios.onRequest(config => {
    // log on request
    //$winstonLog.info(`Making request to: ${config.url}`);
  })

  $axios.onResponse((response) => {
    //$winstonLog.info(`axiosRequest: ${response.config.url}`);
    const setCookies = response.headers['set-cookie'];
    //$winstonLog.info(`axiosResponseCookie: ${setCookies}`);
    if (setCookies) {
      // Combine the cookies set on axios with the new cookies and serialize them
      const cookie = serializeCookies({
        ...parseCookie($axios.defaults.headers.common.cookie),
        ...parseSetCookies(setCookies)
      });

      //$winstonLog.info(`axiosNewCookie: ${cookie}`);
      $axios.defaults.headers.common.cookie = cookie; // eslint-disable-line no-param-reassign

      // If the res already has a Set-Cookie header it should be merged
      let ssrCookies = res.getHeader('Set-Cookie');
      //$winstonLog.info(`SSRCookies: ${ssrCookies}`);

      if (ssrCookies) {
        const newCookies = mergeSetCookies(ssrCookies, setCookies);
        //$winstonLog.info(`SSRMergedCookies: ${newCookies}`);
        res.setHeader('Set-Cookie', newCookies);
      } else {
        //$winstonLog.info(`SSRNoMergeCookies: ${setCookies}`);
        res.setHeader('Set-Cookie', setCookies);
      }
    }
  });
}
