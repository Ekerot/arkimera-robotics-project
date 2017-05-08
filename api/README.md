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
to install dependencies.

To install and run vagrant with the mongoDB server use:
```
vagrant up
```
SSH into vagrant machine to run the project
```
vagrant ssh
```
Then run the npm command
```
npm run devs
```
for starting the server in development mode, alternatively:
```
npm start
```
for starting the server in production mode.

### Robomongo
If you are using [Robomongo](https://robomongo.org) you will need to change a setting in mongod.conf inside the vagrant machine in order to connect to the database.

Inside the vagrant machine:
```
$ sudo nano /etc/mongod.conf
```
Then find the line that binds the ip and comment it out. This will allow connections from outside of the vagrant machine.
```
# Listen to local interface only. Comment out to listen on all interfaces.
# bind_ip = 127.0.0.1
```
Now you can connect using Robomongo and view the database in a GUI.

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
