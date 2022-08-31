import axios from 'axios';
//TODO: add @app convention
import { ENV } from '../constants/env';

/** Setup an API instance */
export const api = axios.create({
  baseURL: ENV.API_HOST,
  headers: { 'Content-Type': 'application/json' }
});
