# Video & Audio Recorder

This is a simple web application that allows users to record video and audio using their camera and microphone. The recorded media is then saved as MP4 chunks and uploaded to a server using AJAX requests.

## Front-end Code

file: networkingtext.html
The front-end code is written in HTML and JavaScript using AngularJS and jQuery libraries. It consists of an HTML page with a title, a heading, and a video element for displaying the recorded video. There are also two buttons for starting and stopping the video recording.

The JavaScript code handles the video recording functionality. It uses the `navigator.mediaDevices.getUserMedia()` function to access the camera and microphone, creates a `MediaRecorder` instance for recording the media, and defines event handlers for handling the recorded data and stopping the recording. The recorded data is pushed into an array of chunks, converted to a `Blob` object, and sent to the server using AJAX requests.

## Back-end Code

file: server.js
The back-end code is written in Node.js using the Express framework and Multer middleware for handling file uploads. It consists of a server that listens for incoming requests on a specified port.

The server has an endpoint for handling the MP4 chunks uploaded from the front-end. The `multer` middleware is used to parse the uploaded files and save them to a directory on the server. The `fs` module is used to create the directory if it does not exist. The server also sets CORS headers to allow cross-origin requests from any domain.

## Instructions

1. Extract the provided zip fileon your local machine.
2. Install Node.js and npm (Node.js package manager) if not already installed.
3. Navigate to the project directory and run `npm install` to install the required dependencies.
4. Run `node server.js` to start the server.
5. Open the `networkingtext.html` file in a web browser to access the web application.
6. Click the "Record Video" button to start recording video. Click the "Stop" button to stop recording. The recorded video will be uploaded to the server in MP4 chunks every 3 seconds and when the video is stopped the combined video for all the chunks gets saved.
7. The uploaded video chunks and combined video will be saved in the `recordings` directory on the server.

## Technologies Used

- Front-end: HTML, JavaScript, AngularJS, jQuery
- Back-end: Node.js, Express
- Middleware: Multer
- Libraries: Font Awesome (for icons)


## Submitted By

- Vinay Sahrawat (40220936)
- Navroop Singh Bajwa (40221136)