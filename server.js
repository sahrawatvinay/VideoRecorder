const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const concat = require('concat-stream');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);


const app = express();
const upload = multer();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.post('/upload', upload.any(), async (req, res) => {
    const files = req.files;
    const formData = req.body;
    try {
        // Check if the uploaded file is a video
        if (files[0].mimetype.startsWith('video/')) {

            // Merge the chunks into a single buffer
            let mergedFileBuffer = Buffer.concat(files.map(file => file.buffer));

            // set the output file path
            const outputName = Date.parse(new Date) + ".mp4";
            const outputLocation = 'recordings/' + outputName;
            const outputFilePath = path.join(__dirname, 'recordings/', outputName);

            // write the merged file buffer to the output file path
            fs.writeFile(outputFilePath, mergedFileBuffer, (err) => {
                if (err) throw err;
                console.log('The merged file has been saved to:', outputFilePath);
            });

        } else {
            console.log('Uploaded file is not a video');
        }

        res.status(200).json({ message: 'Upload successful' });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
