import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerbuilder-28154.firebaseio.com/'
});

export default instance;