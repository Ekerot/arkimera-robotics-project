'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const api = express();

// -- IMPORT ROUTES -- \\
const pingRoute = require("./routes/ping");
// -- END IMPORT ROUTES --\\

api.use(bodyParser.urlencoded({extended: true}));
api.use(bodyParser.json());

//  -- ROUTING -- \\
api.use('/', pingRoute);

const port = process.env.PORT || 8080;

api.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
});
