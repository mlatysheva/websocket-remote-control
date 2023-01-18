import { mouse, left, right, up, down } from "@nut-tree/nut-js";

export async function drawRectangle(width: number, height = width) {
    await mouse.pressButton(0);
    mouse.config.mouseSpeed = 100;
    await mouse.drag(left(width));
    await mouse.drag(up(height));
    await mouse.drag(right(width));
    await mouse.drag(down(height));
    await mouse.releaseButton(0);
};
