import axios from 'axios';

const dataApi = axios.create({
  baseURL: 'https://zzrl-034.sandbox.us01.dx.commercecloud.salesforce.com/s/Sites-Site/'
});

export default dataApi;