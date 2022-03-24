import config from "../config.js";

export const apiCall = (api, params, success, fail) => {
  console.log(api, params);
  let url = config.host + (config.isMock ? api.replace(/\?.*/g, '') + '.json' : api);
  params = config.isMock ? null : params;

  fetch(url, params)
    .then((data) => {
      // console.log('data:', data);
      if (data.status === 200) {
        data.json().then(result => {
          console.log('json:', result);
          if (result.result == "SUCCESS")
            success(result.data)
          else
            fail(result.message);
        })
      } else {
        data.json().then(result => {
          fail(result.message);
        })
      }
    })
    .catch(function (error) {
      fail(error.message);
    });
};


export const accAdd = (arg1, arg2) => {
  var r1, r2, m;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}
