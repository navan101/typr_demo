 class API {
  public load(path: any, resp: any, responseType = 'arraybuffer') {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      request.open("GET", path, true);
      // @ts-ignore
      request.responseType = responseType;
      request.onload = function (e) {
        // @ts-ignore
        resolve(resp(e.target.response));
      };
      request.send();
    });
  }
 }
 export default new API;