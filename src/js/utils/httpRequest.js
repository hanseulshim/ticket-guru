const fetchJSON = (url, method, send) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
      request.onload = () => {
        if (request.responseText === ''){
          reject('Request Failed');
        } else {
          resolve(request.responseText);
        }
      };
      request.onerror = err => {
        console.log(`Error: ${err}`);
      };
      request.open(method, url, true);
      request.setRequestHeader('Content-type', 'application/json');
      request.send(send ? JSON.stringify(send) : '');
  });
};

module.exports = {
  fetchJSON
}