# AzoraOne Demo API
**Primarily made by:**
Beppe Karlsson
Nicklas Björkendal

**With great help from:**
Daniel Ekerot
Tomas Vaedelund

## Purpose
The API serves mainly as a communication point between the Demo client and the AzoraOne self learning bookkeeping API.

## Technical
Language: JavaScript
Runtime Environment: NodeJS
Framework: ExpressJS
Database: MongoDB
DevTools: Vagrant, Virtual Box

## Usage
Clone or download this project, navigate to the *api* subfolder in the terminal and run
```
npm install
```
to install dependencies
```
npm run devs
```
for starting the server in development mode, alternatively:
```
npm start
```
for starting the server in production mode.

To install and run vagrant with the mongoDB server use:
```
vagrant up
```

## Prerequisites
[NodeJS](https://nodejs.org/en/)

## Routing
Routes are handled by the express router.

## Code Standard
This project uses the [airbnb](https://github.com/airbnb/javascript) code standard.

## Test
```
npm run test
```
Test results will be printed in the console.

There is also a [Postman](https://www.getpostman.com/) suite containing automatic tests in the api/test/postman folder. Import into postman and run.

## Documentation
See our [wiki](https://github.com/Ekerot/arkimera-robotics-project/wiki)
