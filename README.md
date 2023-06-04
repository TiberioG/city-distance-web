# City Distance Web Application

This is a web application that calculates the distance between two cities. It uses React with TypeScript as the frontend framework and Vite as the build tool. The application leverages the Base Web UI framework for the user interface and the @tanstack/react-query library for remote data fetching.

## Installation

To install the application, run the following command:

```bash
yarn install
```

## Running the Application in Development Mode locally
Add a .env.local file in the root of the project with the following content:
```bash
VITE_API_URL=<url_of_the_api>
```

To run the application in development mode, run the following command:

```bash
yarn dev
```

If you want to run the application with a remote api you should first create a .env.remote file with the api url and then run the following command:
```bash
vite dev --mode remote
```

## Deploying the Application
This repo uses AWS Amplify to deploy the application. On every push to the master branch, the application is automatically deployed to the following URL:

https://master.disqokagsd5iq.amplifyapp.com/

