import { serve } from "bun";
import { Hono } from 'hono';
import API from './api';
import index from "./index.html";

const app = new Hono();
app.route('/api/', API);

const server = serve({
  port: process.env.APP_PORT || 3000,
  hostname: process.env.HOSTNAME || "0.0.0.0",
  routes: {
    "/api/*": app.fetch, 
    
    // Serve index.html for all unmatched routes.
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 App running at ${server.url}`);
