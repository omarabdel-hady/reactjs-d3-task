import axios from 'axios';

const BASE_URL = 'http://konuxdata.getsandbox.com';

 function getApiData() {
  const url = `${BASE_URL}/data`;
  return axios.get(url).then(response => response.data);
}

export default (getApiData)