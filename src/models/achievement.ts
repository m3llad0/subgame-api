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
            Achievement.belongsToMany(models.User, {
                through: "PlayerAchievements"
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
            type: DataTypes.STRINGS,
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