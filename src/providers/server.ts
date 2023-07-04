import express, {Request, Response } from "express";

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
        this.loadControllers(appInit.controllers);
        this.loadMiddlewares(appInit.middlewares);
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

    public async init(){
        
        this.app.listen(this.port, () => {
            console.log(`Server:: Running @'http://localhost:${this.port}'`)
        })
    }

}

export default Server;