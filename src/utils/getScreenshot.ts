import Jimp from 'jimp';
import { Region, screen } from "@nut-tree/nut-js";


export async function getScreenshot(x: number, y: number, width: number, height: number) {
  try {
    const regionToGrab = new Region((x - width/2), (y - width/2), width, height);
    const img = await screen.grabRegion(regionToGrab);

    const screenshot = new Jimp({
      data: img.data,
      width: img.width,
      height: img.height
    }, (err) => {
      if (err) {
        console.error(err);
      }
    });

    // Bitwise transform to preserve the colors
    
    screenshot.scan(0, 0, screenshot.bitmap.width, screenshot.bitmap.height, (x, y, idx) => {
      const red = screenshot.bitmap.data[idx + 0];
      const blue = screenshot.bitmap.data[idx + 2];
      screenshot.bitmap.data[idx + 0] = blue;
      screenshot.bitmap.data[idx + 2] = red;
    });

    const buffer = await (await screenshot.getBufferAsync(Jimp.MIME_PNG)).toString('base64');

    return buffer;
  } catch (error) {
    console.log('Move the cursor to provide enough space for grabbing the screenshot');
  }
}
