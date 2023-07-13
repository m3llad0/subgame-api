import Server from './providers/server';
import express from 'express';
import cors  from 'cors';
import { NODE_ENV } from './config';
import PlayerController from './controllers/userController';
import AchievementController from './controllers/achievementController';


const app = new Server({
    port: 8080,
    env: NODE_ENV,
    middlewares: [
        express.json(),
        express.urlencoded({extended: true}),
        cors()
    ],
    controllers: [PlayerController.getInstance(), AchievementController.getInstance()],
});

app.init();