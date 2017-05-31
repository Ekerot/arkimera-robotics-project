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

### Get the project

1. Clone or download the repo
1. Open 2 terminal windows and navigate to the api and client subfolders using the **cd** command.
1. In the client window run **npm install**
1. In the api window run **vagrant up**. This will install the vagrant machine if not already installed on your system
1. When the vagrant up process is completed run **vagrant ssh** to ssh in to the virtual machine.
1. Inside the virtual machine run **npm install** to install all api dependencies.
1. Once npm install is completed on both client and api run the client with **npm start** in the client window and run the api with **npm run devs** (for development server) in the api window.

### Vagrant
This guide will help you get started with Vagrant in order to run the MongoDB service. You can run MongoDB without using Vagrant, but if you are using a Windows system you will need 2 extra terminal windows open just to run the MongoDB service and connect to it. You will also need to install MongoDB so it is unlikely that you gain anything from it.

In order to use vagrant you need to download a virtualizer, for example [Oracle VM VirtualBox](https://www.virtualbox.org/wiki/Downloads) and install it.

### Seeding the database
There is a script to seed the database with an initial "admin" user with password "admin". Do not use this script for a production environment since the script also drops both the users collection and the files collection from the database.

If you need to run the seed script you need to rename secrets.js.default to secrets.js and change the value of the keys to match your subscription key, client key and application url, for example *"student"*. After that you can run the seedData script with **npm run seed**.

### For further information
Please refer to the documentation for the API and the CLient for further information.

[Client](https://github.com/Ekerot/arkimera-robotics-project/blob/master/client/README.md)

[API](https://github.com/Ekerot/arkimera-robotics-project/tree/master/api/README.md)