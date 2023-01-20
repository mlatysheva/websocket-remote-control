import Jimp from 'jimp';
import { Region, screen } from "@nut-tree/nut-js";


export async function getScreenshot(x: number, y: number, width: number, height: number) {
  try {
    const regionToGrab = new Region((x - width/2), (y - width/2), width, height);
    screen.highlight(regionToGrab);
    const img = await (await screen.grabRegion(regionToGrab)).toRGB();

    const screenshot = new Jimp({
      data: img.data,
      width: img.width,
      height: img.height
    }, (err) => {
      if (err) {
        console.error(err);
      }
    });

    const buffer = (await screenshot.getBufferAsync(Jimp.MIME_PNG)).toString('base64');

    return buffer;
  } catch (error) {
    console.log('Move the cursor to provide enough space for grabbing the screenshot');
  }
}
