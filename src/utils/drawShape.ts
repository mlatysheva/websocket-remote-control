import { Duplex } from 'stream';
import { drawRectangle } from './drawRectangle';
import { drawCircle } from './drawCircle';

export function drawShape(duplex: Duplex, command: string, x: number, y: number, a: number, b=a) {
  duplex.write(`draw_${command} ${x},${y},${a}\0`);
  switch(command) {
    case 'square': {
      drawRectangle(a, a);
      break;
    }
    case 'rectangle': {
      drawRectangle(a, b);
      break;
    }
    case 'circle': {
      drawCircle(a);
      break;
    } 
  }
  console.log(`draw_${command} ${x}, ${y}, ${a}`);
}