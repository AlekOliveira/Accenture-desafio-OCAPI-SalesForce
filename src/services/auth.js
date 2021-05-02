function getToken() {
  var promise = require('axios');
  var qs = require('qs');
  var data = qs.stringify({
    'grant_type': 'urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken'
  });
  var config = {
    method: 'post',
    url: 'https://zzrl-034.sandbox.us01.dx.commercecloud.salesforce.com/dw/oauth2/access_token?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic Z3J1cG8xLnNhbGVzZm9yY2VAZ21haWwuY29tOkdydXBvMUFjY2VudHVyZTIwMjE6YWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh'
    },
    data: data
  };

  return promise(config);
}
exports.getToken = getToken;