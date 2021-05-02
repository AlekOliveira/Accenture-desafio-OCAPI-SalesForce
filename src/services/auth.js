import axios from 'axios';

const auth = axios.create({
  baseURL: 'https://zzrl-034.sandbox.us01.dx.commercecloud.salesforce.com'
});

export default auth;