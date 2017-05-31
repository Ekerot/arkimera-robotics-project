# AzoraOne Demo Application

This is a web application for demoing the Arkimera AzoraOne API.

**Made by:**
Beppe Karlsson
Daniel Ekerot
Nicklas Bjorkendal
Tomas R-Vaedelund

**During the course:** 1DV611 - Mjukvaruutvecklingsprojekt i grupp

**Taken at:** Linnaeus university

## Getting Started
This getting started guide helps you set up a local development environment.

### Prerequisites
#### NodeJS
The api uses [NodeJS](https://nodejs.org/en/). Download and install to get started.

#### NPM
NPM comes with NodeJS so there is no need for an additional install.

#### Vagrant
This guide will help you get started with Vagrant in order to run the MongoDB service. You can run MongoDB without using Vagrant, but if you are using a Windows system you will need 2 extra terminal windows open just to run the MongoDB service and connect to it. You will also need to install MongoDB so it is unlikely that you gain anything from skipping it.

In order to use vagrant you need to download a virtualizer, for example [Oracle VM VirtualBox](https://www.virtualbox.org/wiki/Downloads) and install it.

### Recommended tools
Let's face it, even though we all love Windows, the built in cmd and PowerShell aren't the best tools, especially not compared to the bash terminal. Fortunately for all windows users there is a console emulator that gives us an even better terminal than bash: [cmder](http://cmder.net/). Download and install the full version to get git-for-windows bundled. Trust me, even linux developers will be jealous of your new fancy terminal.

### Get the project

1. Clone or download the repo
1. Open 2 terminal windows and navigate to the api and client subfolders using the **cd** command.
1. In the client window run **npm install**
1. In the api window run **vagrant up**. This will download and install the vagrant machine if not already installed on your system. MongoDB and NodeJS will also be installed on the vagrant machine once it is downloaded.
1. When the vagrant up process is completed run **vagrant ssh** to ssh in to the virtual machine.
1. Inside the virtual machine run **npm install** to install all api dependencies.
1. Once npm install is completed on both client and api run the client with **npm start** in the client window and run the api with **npm run devs** (for development server) in the api window.


### Seeding the database
There is a script to seed the database with an initial "admin" user with password "admin". Do not use this script for a production environment since the script also drops both the users collection and the files collection from the database.

If you need to run the seed script you need to rename secrets.js.default to secrets.js and change the value of the keys to match your subscription key, client key and application url, for example *"student"*. After that you can run the seedData script with **npm run seed**.

### For further information
Please refer to the documentation for the API and the CLient for further information.

[Client](https://github.com/Ekerot/arkimera-robotics-project/blob/master/client/README.md)

[API](https://github.com/Ekerot/arkimera-robotics-project/tree/master/api/README.md)