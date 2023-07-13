import express, {Request, Response } from "express";
import db from "../models";

class Server{
    private app : express.Application;
    private port : number;
    private env : string;

    constructor(appInit : {
        port: number;
        env: string;
        controllers: any[];
        middlewares: any[];

    }) {
        this.app = express();
        this.port = appInit.port;
        this.env = appInit.env;
        this.loadMiddlewares(appInit.middlewares);
        this.loadControllers(appInit.controllers);
    }

    private loadControllers(controllers: any[]){
        controllers.forEach((controller) => {
            this.app.use(`/${controller.prefix}`, controller.router);
        })
    }

    private loadMiddlewares(middlewares: any[]){
        middlewares.forEach((middleware) => {
            this.app.use(middleware);
        })
    }

    private async connectDB(){
        try{

            await db.sequelize.sync();
            console.log('Connected to database');
        }catch(err){

            console.log(err);
        }
    }

    public async init(){
        
        /*Connect to database*/
        await this.connectDB();

        this.app.listen(this.port, () => {
            console.log(`Server:: Running @'http://localhost:${this.port}'`)
        })
    }

}

export default Server;