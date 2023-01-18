# Websocket Remote Control App

## Description

This is a remote control backend app based on the `nutjs.dev` library and websocket. The app is developed as part of the Node.js course at the Rolling Scopes School.

The user interface for the remote control backend was provided by RS School [here](https://github.com/rolling-scopes-school/remote-control)

The backend is able to do the following:

- Start websocket server
- Handle websocket connection
- Move mouse (Up, Down, Left, Right) by a number of pixels set by the user
- Draw a circle, rectangle and square with the dimensions set by the user
- Send current mouse coordinates
- Send a screenshot capture

[User interface with websocket commands](./screenshots-UI/screenshot_websocket.png)

## Technical requirements

- The task is implemented with Typescript
- 18 LTS version of Node.js is used
- The stack used: [ws](https://www.npmjs.com/package/ws), [nutjs.dev](https://www.npmjs.com/package/@nut-tree/nut-js), [jimp](https://www.npmjs.com/package/jimp), `typescript`, `ts-node`, `ts-node-dev`, `dotenv`, `eslint` and `@types/*` were used

## Installation 
- Clone the repository to your local machine by running `git clone https://github.com/mlatysheva/websocket-remote-control.git/
- `cd` into the cloned folder
- Install all the dependencies by running `npm i`
- Start the app in the development mode by running 
```bash
npm run start:dev 
```
- Start the app in the production mode by running 
```bash
npm run start 
```
- After starting the program displays websocket parameters
- After the program finished working, it ends the websocket operation correctly  
- After each received command, the program displays the command and the result

The List of websocket commands and their syntax (<- - cmd from frontend, -> - answer):
- Navigation over the x and y axis
    - Move mouse up
    ```bash
    <- mouse_up {y px}
    ```
    - Move mouse down
    ```bash
    <- mouse_down {y px}
    ```
    - Move mouse left
    ```bash
    <- mouse_left {x px}
    ```
    - Move mouse right
    ```bash
    <- mouse_right {x px}
    ```
    - Send mouse coordinates
    ```bash
    <- mouse_position
    -> mouse_position {x px},{y px}
    ```
- Drawing
    - Draw circle with pushed left button: 
    ```bash
    <- draw_circle {px}
    ```
    - Draw rectangle with pushed left button: 
    ```bash
    <- draw_rectangle {px} {px}
    ```
    - Draw square with pushed left button: 
    ```bash
    <- draw_square {px}
    ```
- Print screen
    - Make print screen command and send image (a base64 buffer of the 200 px square around the mouse position):
    ```bash
    <- prnt_scrn
    -> prnt_scrn {base64 string (png buf)}
    ```