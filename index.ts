import { httpServer } from "./src/http_server/index";
import { mouse, left, right, up, down, centerOf, Region } from "@nut-tree/nut-js";
import Jimp from 'jimp';
import { WebSocketServer } from 'ws';

const HTTP_PORT = 8181;
const WSS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WSS_PORT});

wss.on('connection', ws => {
  console.log('Connection accepted');
  ws.on('message', data => {
    
  })
})
