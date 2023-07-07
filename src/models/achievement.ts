'use strict'

import { Model } from "sequelize";

interface AchievementAttributes{
    id: number, 
    name: string, 
    description: string,
}

module.exports = (sequelize: any, DataTypes: any) => {

    class Achievement extends Model<AchievementAttributes> implements AchievementAttributes{
        id!: number;
        name!: string;
        description!: string;

        static associate(models:any){
            Achievement.belongsToMany(models.Player, {
                through: "PlayerAchievement"
            });
        }
    }

    Achievement.init({
        id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING, 
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Achievement"
    });

    return Achievement;
}