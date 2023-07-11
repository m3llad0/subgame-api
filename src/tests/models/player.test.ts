import { DataTypes } from 'sequelize';
import { Model } from 'sequelize';
import db from '../../models';

describe('Player model', () => {
  describe('Initialization', () => {
    it('should initialize the Player model with the correct attributes', async () => {
      // Crea una instancia del modelo Player
      const player = await db.Player.create({
        id: 1,
        username: 'johnDoe'
      });

      // Verifica que los atributos se hayan inicializado correctamente
      expect(player.id).toBe(1);
      expect(player.username).toBe('johnDoe');
    });
  });
    
    it('should retrieve an existing player from the database', async () => {
      // Recupera un jugador existente de la base de datos
      const player = await db.Player.findByPk(1);

      // Verifica que se haya recuperado correctamente
      expect(player).toBeDefined();
      expect(player?.id).toBe(1);
      expect(player?.username).toBe('johnDoe');
    });

    it('should update an existing player in the database', async () => {
      // Actualiza un jugador existente en la base de datos
      const player = await db.Player.findByPk(1);
      if (player) {
        player.username = 'janeDoe';
        await player.save();
      }

      // Verifica que se haya actualizado correctamente
      const updatedPlayer = await db.Player.findByPk(1);
      expect(updatedPlayer?.username).toBe('janeDoe');
    });

    it('should delete an existing player from the database', async () => {
      // Elimina un jugador existente de la base de datos
      const player = await db.Player.findByPk(1);
      if (player) {
        await player.destroy();
      }

      // Verifica que se haya eliminado correctamente
      const deletedPlayer = await db.Player.findByPk(1);
      expect(deletedPlayer).toBeNull();
    });
});
