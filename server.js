const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const app = express();
const upload = multer();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

//checs if file directory is available or not, if not create one
function checkIfDirectoryIsAvailable(directoryPath) {
    // Check if the directory exists
    if (!fs.existsSync(directoryPath)) {
        console.log(`Directory '${directoryPath}' does not exist. Creating...`);

        // Create the directory
        fs.mkdirSync(directoryPath);
        console.log(`Directory '${directoryPath}' created successfully.`);
    } else {
        console.log(`Directory '${directoryPath}' already exists.`);
    }
}

//creating and saving mp4 chunks
function createMP4Chunks(files) {
    files.forEach(function (file, index) {
        // set the output file path
        const outputName = Date.parse(new Date) + "-" + file.fieldname + ".mp4";
        const outputFilePath = path.join(__dirname, 'recordings/', outputName);

        // write the merged file buffer to the output file path
        fs.writeFile(outputFilePath, file.buffer, (err) => {
            if (err) throw err;
            console.log(`${file.fieldname} file has been saved to:`, outputFilePath);
        });
    });
}

app.post('/upload', upload.any(), async (req, res) => {
    const files = req.files;
    const formData = req.body;
    try {
        // Check if the uploaded file is a video
        if (files[0].mimetype.startsWith('video/')) {

            // Merge the chunks into a single buffer
            let mergedFileBuffer = Buffer.concat(files.map(file => file.buffer));

            const directoryPath = '/recordings';
            checkIfDirectoryIsAvailable(directoryPath);

            // set the output file path
            const outputName = Date.parse(new Date) + ".mp4";
            const outputFilePath = path.join(__dirname, 'recordings/', outputName);

            // write the merged file buffer to the output file path
            fs.writeFile(outputFilePath, mergedFileBuffer, (err) => {
                if (err) throw err;
                console.log('The merged file has been saved to:', outputFilePath);
            });

            //creating .mp4 files for chunks also
            createMP4Chunks(files);

        } else {
            console.log('Uploaded file is not a video');
        }

        res.status(200).json({ message: 'Upload successful' });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res, next) => {
    res.send('Server up and running');
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
