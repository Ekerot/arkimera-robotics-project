'use strict';

const router = require('express').Router();
const axios = require('axios');

router.get('/companies', (req, res) => {
    let config = {
        baseURL: "https://azoraone.azure-api.net/",
        headers: {
            "Client-Key": "avGDtxkQNa08z7thX8WW+Q",
            "Ocp-Apim-Subscription-Key": "353e8658d0144af6950771e48812cc58"
        },
    };

    //TODOS 
    //Add logging the requests, 
    //maybe change timestamp instead of just using what was received from AzoraOne???
    axios.get("student/api/companies", config).then(function(response) {
        res.status(response.status).send(response.data);
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            res.status(response.status).send(response.data);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            res.status(500).send(
                {
                    "success": false,
                    "data": [{
                        "code": 0,
                        "message": "No response from downstream API",
                        "details": "",
                        "element": "",
                    }],
                    "time": new Date().toUTCString()
                }
            );
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            res.status(500).send(
                {
                    "success": false,
                    "data": [{
                        "code": 0,
                        "message": "Error setting upp request to downstream API",
                        "details": "",
                        "element": "",
                    }],
                    "time": new Date().toUTCString()
                }
            );
        }
        console.log(error.config);
    });
});

router.put('/companies/:companyID/files/:fileID/receipts', (req, res) => {
    console.log(req.body);
    res.status(200).send(
        {
            "success": true,
            "data": {
                "verificationSerie": "A",
                "description": "Maxi ICA Stormarknad",
                "receiptDate": "2016-06-03",
                "accounts": [
                {
                    "account": "1930",
                    "debit": "0.00",
                    "credit": "272.18"
                },
                {
                    "account": "7600",
                    "debit": "241.24",
                    "credit": "0.00"
                },
                {
                    "account": "2641",
                    "debit": "28.94",
                    "credit": "0.00"
                },
                {
                    "account": "6100",
                    "debit": "1.60",
                    "credit": "0.00"
                },
                {
                    "account": "2641",
                    "debit": "0.40",
                    "credit": "0.00"
                }
                ]
            },
            "time": "2017-03-28 11:41:02"
        }
    )
});

module.exports = router;