import { Request, Response } from "express";
import AbstractController from "./abstractController";
import axios from "axios";
import db from "../models";

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
        this.router.get('/myAchievements/:id', this.myAchievements.bind(this))
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

            const player = await db.Player.findOne({
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
            const player = await db.Player.create({
                id: user.id,
                username: user.username
            });

            return response.status(201).send({message: "User created!"});

        }catch(err){

            return response.status(500).send({error: err})
        }
    }
    private async myAchievements(request: Request, response: Response){
        /*This function retrieves all the unlocked achievements of a user */
        try{
            const id = request.params.id;

            const achievements = await db.Achievement.findAll();

            const playerAchievements = await db.PlayerAchievement.findAll({
                where: {
                    PlayerId: id,
                },
                raw: true
            });

            const achievementMap = new Map<number, number>();

            playerAchievements.forEach((playerAchievement: any) => {
              const achievementId = playerAchievement.AchievementId;
              achievementMap.set(achievementId, 1);
            });
      
            const achievementList = achievements.map((achievement: any) => ({
              id: achievement.id,
              name: achievement.name,
              description: achievement.description,
              unlocked: achievementMap.has(achievement.id) ? 1 : 0,
            }));

            return response.status(200).send({achievements: achievementList});
        }catch(err){
            return response.status(500).send({error: err});
        }
    }
}

export default PlayerController;