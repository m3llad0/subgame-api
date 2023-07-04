import Server from './server';
import express from 'express';
import cors  from 'cors';


const app = new Server({
    port: 8080,
    env: "development",
    middlewares: [
        express.json(),
        express.urlencoded({extended: true}),
        cors()
    ],
    controllers: [],
});

app.init();