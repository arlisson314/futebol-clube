const tableMatches = 'TRYBE_FUTEBOL_CLUBE.matches';
const tableTeams = 'TRYBE_FUTEBOL_CLUBE.teams';

const home = `SELECT
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

const away = `SELECT
T.team_name as name,
SUM(
  CASE
    WHEN M.away_team_goals > M.home_team_goals THEN 3
    WHEN M.home_team_goals = M.away_team_goals THEN 1
    WHEN M.away_team_goals < M.home_team_goals THEN 0
  END
) as totalPoints,
COUNT(M.away_team) as totalGames,
SUM(M.away_team_goals > M.home_team_goals) as totalVictories,
SUM(M.away_team_goals = M.home_team_goals) as totalDraws,
SUM(M.away_team_goals < M.home_team_goals) as totalLosses,
SUM(M.away_team_goals) as goalsFavor,
SUM(M.home_team_goals) as goalsOwn,
SUM(M.away_team_goals - M.home_team_goals) as goalsBalance
FROM ${tableMatches} as M
INNER JOIN ${tableTeams} as T
ON M.away_team = T.id AND in_progress = false
GROUP BY name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

export default { home, away };
