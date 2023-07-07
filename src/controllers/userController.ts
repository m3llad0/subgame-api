import { Request, Response, Router } from "express";
import AbstractController from "./abstractController";
import axios from "axios";
const Player = require('../models/player');

class PlayerController extends AbstractController{
    protected validateBody(type: any) {
        throw new Error("Method not implemented.");
    }

    /*Create singleton class*/

    private static instance: PlayerController;

    public  static getInstance(): AbstractController{
        if(this.instance){
            return this.instance;
        }

        this.instance = new PlayerController('player');
        return this.instance;
    }

    protected initRoutes(): void{
        this.router.post('/createUser/:key', this.createUser.bind(this));
        this.router.get('/getUser/:key', this.getUser.bind(this));
    }

    private async getUser (request: Request, response: Response) {
        /*This function checks if the user exits in database, if it exists
        it will return an id for the user*/
        try{

            // Get key from params
            const key = request.params.key;

            const APIresponse = await axios.get(`https://itch.io/api/1/${key}/me`)

            const { user } = APIresponse.data;

            // Check if the response is valid
            if (!user || !user.id || !user.username)
                return response.status(401).send({message: "Invalid key"})

            const player = Player.findOne({
                where: {
                    id: user.id
                }
            });

            if (!player){
                return response.status(404).send({message: "Player not found"});
            }

            return response.status(200).send({playerId: player.id});

        }catch(err){
            return response.status(500).send({error: err});
        }
        
    }
    private async createUser(request: Request, response: Response){
        /*function to create a new player in database using the token 
        from OAuth, this gets the id and username from server-side api
        then it sends them to api.*/

        try{
            // get key from params
            const key = request.params.key;

            // get the response of itch.io api
            const APIresponse = await axios.get(`https://itch.io/api/1/${key}/me`)

            const {user} = APIresponse.data
            
            // Check if the response is valid
            if (!user || !user.id || !user.username)
                return response.status(401).send({message: "Invalid key"})
            
            // Create a new player in database
            const player = await Player.create({
                id: user.id,
                username: user.username
            });

            return response.status(201).send({message: "User created!"});

        }catch(err){

            return response.status(500).send({error: err})
        }
    }
}

export default PlayerController;