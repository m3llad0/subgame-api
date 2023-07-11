import { DataTypes, Model } from "sequelize";
import db from "../../models";
import { describe } from "node:test";

describe('Achievement model', () => {
    describe('Create', () => {
        it('should initialize the Achievement model with the correct attributes', async () => {
            // Create a new achievement instance

            const achievement = await db.Achievement.create({
                id: 1,
                name: "Achievement name",
                description: "Achievement description"
            });

            // Checks if the attributes are correct
            expect(achievement.id).toBe(1);
            expect(achievement.name).toBe("Achievement name");
            expect(achievement.description).toBe("Achievement description");
        });
    });

    describe('Retrieve', () => {
        it('It should retrieve an achievement given an id',async () => {
            // Retrieve and existing achievement in database
            const achievement = await db.Achievement.findByPk(1);

            // Check if the achievement is retrieve correctly
            expect(achievement).toBeDefined();
            expect(achievement?.id).toBe(1);
            expect(achievement?.name).toBe("Achievement name");
            expect(achievement?.description).toBe("Achievement description");
        });
    });

    describe('Update', () => {
        it('It should update an existing achievement in database',async () => {
            const achievement = await db.Achievement.findByPk(1);

            // Update an existing achievement
            if(achievement)
                achievement.name = 'Name updated';
                await achievement.save();
            
            // Check if it is updated correctly
            const updatedAchievement = await db.Achievement.findByPk(1);
            expect(updatedAchievement?.name).toBe('Name updated')
        });
    });

    describe('Delete', () => {
        it('It should delete an achievement from database',async () => {
            // Find an existing achievement in database

            const achievement = await db.Achievement.findByPk(1);
            if(achievement)
                // Delete achievement
                await achievement.destroy();
            
                const deletedAchievement = await db.Achievement.findByPk(1);
                expect(deletedAchievement).toBeNull();
        });
    });
});