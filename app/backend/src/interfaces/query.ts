const tableMatches = 'TRYBE_FUTEBOL_CLUBE.matches';
const tableTeams = 'TRYBE_FUTEBOL_CLUBE.teams';

const queryTeamHomes = `SELECT
T.team_name as name,
SUM(
  CASE
    WHEN M.home_team_goals > M.away_team_goals THEN 3
    WHEN M.home_team_goals = M.away_team_goals THEN 1
    WHEN M.home_team_goals < M.away_team_goals THEN 0
  END
) as totalPoints,
COUNT(M.home_team) as totalGames,
SUM(M.home_team_goals > M.away_team_goals) as totalVictories,
SUM(M.home_team_goals = M.away_team_goals) as totalDraws,
SUM(M.home_team_goals < M.away_team_goals) as totalLosses,
SUM(M.home_team_goals) as goalsFavor,
SUM(M.away_team_goals) as goalsOwn,
SUM(M.home_team_goals - M.away_team_goals) as goalsBalance
FROM ${tableMatches} as M
INNER JOIN ${tableTeams} as T
ON M.home_team = T.id AND in_progress = false
GROUP BY name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

export default queryTeamHomes;
