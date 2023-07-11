import { Request, Response } from "express";
import AbstractController from "./abstractController";
import axios from "axios";
import db from "../models";

class AchievementController extends AbstractController{

    /*Create singleton class */
    
    private static instance: AchievementController;

    public static getInstance(): AchievementController{
        if(this.instance){
            return this.instance;
        }

        this.instance = new AchievementController('achievement');
        return this.instance;
    }
    
    protected initRoutes(): void {
        this.router.post('/createAchievement', this.createAchievement.bind(this));
        this.router.get('/getAchievement/:id', this.getAchievement.bind(this));
        this.router.get('/getAchievements', this.getAllAchievements.bind(this));
        this.router.put('/updateAchievement/:id', this.editAchievement.bind(this));
        this.router.delete('deleteAchievement/:id', this.deleteAchievement.bind(this));
        this.router.put('/unlockAchievement/:achievementid/player/:playerid', this.unlockAchievement.bind(this));

    }
    protected validateBody(type: any) {
        throw new Error("Method not implemented.");
    }

    private async createAchievement(request: Request, response: Response){
        /*Function to create a new achievement in database*/
        try{

            const {name, description} = request.body;

            const achievement = await db.Achievement.create({
                name: name,
                description: description
            });

            return response.status(201).send({message: "Created new achievement!"})
        }catch(err){
            return response.status(500).send({error: err})
        }
    }

    private async getAchievement(request: Request, response: Response){
        /*Function to retrieve and achievement from db using id */
        try{

            const achievementId = parseInt(request.params.id);

            const achievement = await db.achievement.findByPk(achievementId);

            if(!achievement)
                return response.status(404).send({message: "Achievement not found"});
            
            return response.status(200).send({achievement: achievement});
        }catch(err){
            return response.status(500).send({error:err});
        } }
    
    private async getAllAchievements(request: Request, response: Response){
        try{

            const achievements = await db.Achievement.findAll();

            return response.status(200).send({achievements: achievements});
        }catch(err){
            return response.status(500).send({error: err})
        }
    }

    private async editAchievement(request: Request, response: Response){
        /*Function to edit an achievement*/
        try{
            const {name, description} = request.body;
            const achievementId = request.params.id;

            const achievement = await db.Achievement.findByPk(achievementId);

            if(!achievement)
                return response.status(404).send({message: "Achievement not found"});

            if(!name)
                achievement.name = name;
            
            if(!description)
                achievement.description = description;
            
            await achievement.save();

            return response.status(200).send({message: "Achievement updated"});
        }catch(err){
            return response.status(500).send({error: err});
        }
    }

    private async deleteAchievement(request: Request, response: Response){
        /*Function to delete an achievement using id*/

        try{

            const achievementId = request.params.id;

            const achievement = await db.Achievement.findByPk(achievementId);

            if(!achievement)
                return response.status(404).send({message: "Achievement not found"});
            
            await achievement.destroy();

            return response.status(200).send({message: "Deleted achievement"});
        }catch(err){
            return response.status(500).send({error: err})
        }
    }

    private async unlockAchievement(request: Request, response: Response){
        try{

            const playerId = parseInt(request.params.playerid);
            const achievementId = parseInt(request.params.achievementid);

            const achievement = await db.Achievement.findByPk(achievementId);
            const player = await db.Player.findByPk(playerId);

            if (!player || !achievement)
                return response.status(404).send({message: "Content not found"});

            await db.PlayerAchievement.create({
                PlayerId: playerId,
                AchievementId: achievementId
            });

            return response.status(201).send({message: "Achievement unlocked!"})
        }catch(err){
            return response.status(500).send({error: err});
        }
    }
}

export default AchievementController;