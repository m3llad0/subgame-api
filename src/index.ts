import Server from './providers/server';
import express from 'express';
import cors  from 'cors';
import PlayerController from './controllers/userController';


const app = new Server({
    port: 8080,
    env: "development",
    middlewares: [
        express.json(),
        express.urlencoded({extended: true}),
        cors()
    ],
    controllers: [PlayerController.getInstance(), ],
});

app.init();