'use strict'

import { Model } from "sequelize"

interface PlayerAchievementAttributes{

    PlayerId: number,
    AchievementId: number
}

module.exports = (sequelize: any, DataTypes:any) => {

    class PlayerAchievement extends Model<PlayerAchievementAttributes> implements PlayerAchievementAttributes{
        PlayerId!: number
        AchievementId!: number      
    }

    PlayerAchievement.init({
        PlayerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "Player",
                key: "id"
            }
        },
        AchievementId: {
            type: DataTypes.INTEGER,
            allowNull: false, 
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