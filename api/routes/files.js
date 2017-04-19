'use strict';

const router = require('express').Router();
const multer = require("multer");
const upload = multer();

router.post('/companies/:companyID/files', upload.single('file'), (req, res) => {
    console.log(req.file);
    setTimeout(function() {
        res.status(200).send(
            {
                "success": true,
                "data": {
                    "verificationSerie": "A",
                    "description": "Employee breakfast",
                    "receiptDate": "2016-05-01",
                    "accounts": [
                    {
                        "account": "1930",
                        "debit": "0.00",
                        "credit": "3119.00"
                    },
                    {
                        "account": "2641",
                        "debit": "623.82",
                        "credit": "0.00"
                    },
                    {
                        "account": "6210",
                        "debit": "2495.29",
                        "credit": "0.00"
                    },
                    {
                        "account": "3740",
                        "debit": "0.00",
                        "credit": "0.11"
                    }
                    ]
                },
                "time": "2017-03-28 11:41:02"
            }
        );
    }, 1000);
});

module.exports = router;