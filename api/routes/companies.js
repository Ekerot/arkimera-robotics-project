'use strict';

const router = require('express').Router();

router.get('/companies', (req, res) => {
    res.status(200).send(
        {
            "success": true,
            "data": {
                "companies": [
                {
                    "companyID": "1",
                    "companyName": "LargeCorp",
                    "active": true,
                    "corporateIdentityNumber": "556754-9273",
                    "bankAccountNumber": "5677-6487",
                    "iban": ""
                },
                {
                    "companyID": "2",
                    "companyName": "SmallCorp",
                    "active": true,
                    "corporateIdentityNumber": "",
                    "bankAccountNumber": "",
                    "iban": ""
                }
                ]
            },
            "time": "2017-03-28 11:41:02"
        }
    );
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