'use strict';

const router = require('express').Router();
const multer = require("multer");
// const axios = require("axios");
const fs = require("fs");
const secrets = require("../secrets");
const axios = require('../azoraOneAxios');
const upload = multer();

router.post('/companies/:companyId/files', upload.single('File'), (req, res) => {
    console.log("Från vår endpoint");
    console.log(req.body);
    console.log("filen");
    console.log(req.file);
    let file = req.file;
    let companyId = req.params.companyId;
    let filePath = `files/${file.originalname}`;

    // fs.writeFileSync(filePath, (err) => {
    //     if (err) {
    //         console.log(err);
    //     }
    // });

    // let url = `https://azoraone.azure-api.net/student/api/companies/${companyId}/files`;
    let url = "http://localhost:8080/test";

    let body = {
        'FileID': '101',
        // file: fs.readFileSync(filePath)
        // 'File': file
    };

    axios.post(url, body, file)
        .then((result) => {
            console.log(result);
            res.status(result.status).send(result);
        })
        .catch((error) => {
            console.log(error.response.data);
            res.status(error.response.status).send(error.response.data);
        });
});

router.post("/test", upload.single('File'), (req, res) => {
    console.log("vad vår endpoint har skickat");
    console.log(req.body);
    console.log("filen");
    console.log(req.file);
});

module.exports = router;
