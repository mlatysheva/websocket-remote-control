import { Duplex } from 'stream';
import { drawRectangle } from './drawRectangle';
import { drawCircle } from './drawCircle';

export function drawShape(duplex: Duplex, command: string, x: number, y: number, a: number, b=a) {
  switch(command) {
    case 'square': {
      drawRectangle(a, a);
      duplex.write(`draw_${command}_${x}_${y}_${a}\0`);
      break;
    }
    case 'rectangle': {
      drawRectangle(a, b);
      duplex.write(`draw_${command}_${x}_${y}_${a}_${b}\0`);
      break;
    }
    case 'circle': {
      drawCircle(a);
      duplex.write(`draw_${command}_${x}_${y}_${a}\0`);
      break;
    }
  }
  console.log(`draw_${command} ${x}, ${y}, ${a}`);
}