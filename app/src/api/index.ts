import { Hono } from 'hono';
import { hello } from './routes/hello.route';


const API = new Hono();

API.route('/hello', hello)

export default API;