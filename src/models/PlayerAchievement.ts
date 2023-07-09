'use strict'

import { Model } from "sequelize"

interface PlayerAchievementAttributes{

    playerId: number,
    achievementId: number
}

module.exports = (sequelize: any, DataTypes:any) => {

    class PlayerAchievement extends Model<PlayerAchievementAttributes> implements PlayerAchievementAttributes{
        playerId!: number
        achievementId!: number      
    }

    PlayerAchievement.init({
        playerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "Player",
                key: "id"
            }
        },
        achievementId: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: false, 
            references:{
                model: "Achievement",
                key: "id"
            }
        }
    }, {
        sequelize,
        modelName: "PlayerAchievement"
    });

    return PlayerAchievement;
};