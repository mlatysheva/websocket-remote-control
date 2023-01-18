import Jimp from 'jimp';
import { Region, screen } from "@nut-tree/nut-js";


export async function getScreenshot(x: number, y: number, width: number, height: number) {
  try {
    const regionToGrab = new Region((x - width/2), (y - width/2) , width, height)
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
    return screenshot;
  } catch (error) {
    console.error(error);
  }
}

export async function showImage (x: number, y: number, width: number, height: number) {
  try {
    const image = await getScreenshot(x, y, width, height);
    if (image) {
      const base64 = await image.getBase64Async(image.getMIME());
      return base64.substring(22);
    }
  } catch (error) {
    console.error(error);
  }  
}
