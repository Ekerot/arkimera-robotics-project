'use strict';

const router = require('express').Router();
const multer = require("multer");
// const axios = require("axios");
const fs = require("fs");
const secrets = require("../secrets");
const axios = require('../azoraOneAxios');
const upload = multer();

router.post('/companies/:companyId/files', upload.single('file'), (req, res) => {
    let file = req.file;
    let companyId = req.params.companyId;
    let filePath = `files/${file.originalname}`;

    fs.writeFileSync(filePath, (err) => {
        if (err) {
            console.log(err);
        }
    });

    let url = `https://azoraone.azure-api.net/student/api/companies/${companyId}/files`;
    // let url = "http://localhost:8080/test";

    let body = {
        'Content-Disposition': `form-data; name="100" filename=${file.originalname}`,
        'Content-Type': 'application/pdf',
        // file: fs.readFileSync(filePath)
        file
    };

    axios.post(url, body, {'Content-type': 'multipart/form-data; boundary=---------------------------41184676334'})
        .then((result) => {
            console.log(result);
            res.status(result.status).send(result);
        })
        .catch((error) => {
            console.log(error.response.data);
            res.status(error.response.status).send(error.response.data);
        });
});

router.post("/test", (req, res) => {
    console.log(req.body);
});

module.exports = router;
