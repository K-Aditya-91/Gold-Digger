import http from 'node:http';
import {serveStatic} from './utils/serveStatic.js';
import { getLivePrice } from './utils/getLivePrice.js';
import { handleGet, handlePost } from './handlers/routeHandlers.js';

const PORT = 8000;
const __dirname = import.meta.dirname;

let curPrice = getLivePrice();
setInterval(() => {
    curPrice = getLivePrice();
}, 60 * 1000);

const server = http.createServer(async (req, res) => {
    if(req.url === '/api' && req.method === 'GET'){
        handleGet(res, 200, 'application/json',JSON.stringify({ price: curPrice }));
    } else if(req.url === '/api' && req.method === 'POST'){
        await handlePost(req, res);
    }
    else {
        await serveStatic(req, res, __dirname);
    }
})

server.listen(PORT,() => console.log(`Server is listening on port: ${PORT}`));