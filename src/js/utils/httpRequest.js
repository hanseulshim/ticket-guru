const fetchJSON = (url, method, send) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
      request.onload = () => {
        resolve(request.responseText);
      };
      request.onerror = err => {
        reject('Error grabbing objects');
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