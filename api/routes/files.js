'use strict';

const fs = require("fs");
const router = require('express').Router();
const multer = require("multer");
const FormData = require("form-data");
const request = require("request");
// const axios = require("axios");
const secrets = require("../secrets");
// const axios = require('../azoraOneAxios');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'tmp')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}.pdf`)
    }
});
const upload = multer({ storage });

router.post('/companies/:companyId/files', upload.single('File'), (req, res) => {
    let file = req.file;
    let companyId = req.params.companyId;

    let url = `https://azoraone.azure-api.net/student/api/companies/${companyId}/files`;
    // let url = "http://localhost:8080/test";

    // let data = new FormData();

    // data.append('FileID', '112');
    // data.append('File', fs.createReadStream(file.path));
    // data.append('Client-Key', secrets.azoraOneclientKeySecret);
    // data.append('Ocp-Apim-Subscription-Key', secrets.azoraOneSubscriptionKeySecret);
    // console.log(url);
    let data = {
        'FileID': Date.now(),
        'File': fs.createReadStream(file.path)
    };

    let headers = {
        'Client-Key': secrets.azoraOneclientKeySecret,
        'Ocp-Apim-Subscription-Key': secrets.azoraOneSubscriptionKeySecret
    };

    request.post({ url, formData: data, headers }, (err, response, body) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        console.log(response);
        return res.status(response.statusCode).send(JSON.parse(body));
    });
});

router.post("/test", upload.single('File'), (req, res) => {
    console.log("vad vår endpoint har skickat");
    console.log(req.body);
    console.log("filen");
    console.log(req.file);
});

module.exports = router;
