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

    axios.get("student/api/companies", config).then(function(response) {
        console.log(response);
        res.status(200).send(response.data)
    }).catch(function(error) {
        console.log(error);
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