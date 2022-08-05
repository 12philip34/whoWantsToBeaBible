import axios from 'axios';

const baseURL = process.env.NODE_ENV == 'development' ?
'http://localhost:8000/api/' : 'http://'

export default axios.create({
  baseURL
})