'use strict'

import { Model } from "sequelize"

interface PlayerAchievementsAttributes{

    playerId: number,
    achievementId: number
}

module.exports = (sequelize: any, DataTypes:any) => {

    class PlayerAchievements extends Model<PlayerAchievementsAttributes> implements PlayerAchievementsAttributes{
        playerId!: number
        achievementId!: number      
    }

    PlayerAchievements.init({
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
        modelName: "PlayerAchievements"
    });

    return PlayerAchievements;
};