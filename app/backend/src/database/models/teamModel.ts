import { Model, DataTypes } from 'sequelize';
import db from '.';
import Match from './matchModel';

class Team extends Model {
  id!: number;
  teamName!: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

Match.belongsTo(Team, { foreignKey: 'id' as 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'id' as 'awayTeam' });

// Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'awayTeam' });
// Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'teamHome' });

export default Team;
