import WebSocket, { createWebSocketStream } from "ws";
import { mouse, left, right, up, down } from "@nut-tree/nut-js";
import { drawShape } from '../utils/drawShape';
import { showImage } from '../utils/getScreenshot';
import { screenshotSize } from '../constants/constants';

function handleConnection(ws: WebSocket): void {
  const duplex = createWebSocketStream(ws, {
    encoding: "utf8",
    decodeStrings: false,
  });
  
  duplex.on('data', async (data: Buffer) => {
    try {
      const [ command, ...args ] = data.toString().split(' ');
      const { x, y } = await mouse.getPosition();
      
      const [a, b] = args.map((arg) => parseInt(arg));
      switch (command) {
        case ('mouse_up'): {
          await mouse.move(up(a));
          duplex.write(`mouse_up`);        
          break;
        };
        case ('mouse_down'): {
          await mouse.move(down(a));
          duplex.write(`mouse_down`);
          break;
        };
        case ('mouse_left'): {
          await mouse.move(left(a));
          duplex.write(`mouse_left`);
          break;
        };
        case ('mouse_right'): {
          await mouse.move(right(a));
          duplex.write(`mouse_right`);
          break;
        };
        case ('mouse_position'): {
          duplex.write(`mouse_position ${x},${y}\0`);
          console.log(`mouse_position ${x},${y}`)
          break;
        };
        case ('draw_square'): {
          drawShape(duplex, 'square', x, y, a);
          break;
        };
        case ('draw_rectangle'): {
          drawShape(duplex, 'rectangle', x, y, a, b);
          break;
        };
        case ('draw_circle'): {
          drawShape(duplex, 'circle', x, y, a);
          break;
        };
        case ('prnt_scrn'): {    
          const buf = await showImage(x, y, screenshotSize, screenshotSize);
          console.log(`print_scrn ${x}, ${y}, ${screenshotSize}`);
          duplex.write(`prnt_scrn ${buf}\0`);
          break;
        };
        default: {
          console.log(`Command ${command} not found`);
        } 
      }
      console.log(`Received: ${data.toString()}`);
    } catch (err) {
      console.error(err);
    }
  });
  ws.on('close', () => { 
    duplex.destroy();
    console.log(`WebSocket closed`);
  });
};

export { handleConnection };
