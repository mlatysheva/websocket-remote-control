import { mouse, straightTo, Point } from "@nut-tree/nut-js";


export async function drawCircle(r: number) {
  let mousePos = await mouse.getPosition();
  await mouse.pressButton(0);
  for (let i = 0; i <= Math.PI * 2; i += 0.05) {
    const x = mousePos.x - (r * Math.cos(i)) + r;
    const y = mousePos.y - (r * Math.sin(i));
    const target = new Point(x, y);  
    await mouse.drag(straightTo(target));
  };
  await mouse.releaseButton(0);
}