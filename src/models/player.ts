'use strict'

import { Module } from 'module';
import {Model} from 'sequelize';

interface PlayerAttributes {
    id: number,
    username: string,
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Player extends Model<PlayerAttributes> implements PlayerAttributes {
        id!: number;
        username!: string;
        static associate(models: any){
            Player.belongsToMany(models.Achievement, {
                through: "PlayerAchievements"
            });
        };
    }

    Player.init({
        id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
        },
        username: DataTypes.STRING
    }, {
        sequelize,
        modelName: "Player"
    });

    return Player;
};