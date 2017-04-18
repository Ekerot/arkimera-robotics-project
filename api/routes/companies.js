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

module.exports = router;