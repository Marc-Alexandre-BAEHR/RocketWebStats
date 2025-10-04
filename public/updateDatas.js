const sectionMatches = document.getElementById('sectionMatches');
let oldMatches = undefined;
let oldPlayer = undefined;

// -=- Ligne par joueur -=-
function createPlayerRowDetailed(player, teamName, match, index, teamPlayers)
{
    const isWinner = match.winner === teamName;

    const row = document.createElement('tr');
    row.classList.add(player.TeamName === match.winner ? 'table_tWinner' : 'table_tLoser');
    row.id = (player.TeamName === match.teams[0]) ? 'team0' : 'team1';

    // Colonne d’équipe (rowspan sur le 1er joueur)
    if (index === 0) {
        const tdGoals = document.createElement('td');
        tdGoals.setAttribute("rowspan", teamPlayers.length);
        tdGoals.classList.add(isWinner ? 'table_team_winner' : 'table_team_loser');
        tdGoals.textContent = match.teamsData[player.TeamName].goals;
        row.appendChild(tdGoals);
    }

    // Nom + lien tracker
    const tdPlayer = document.createElement('td');
    tdPlayer.classList.add('table_player');
    if (player.PlayerName === match.mvp.PlayerName && player.TeamName === match.winner) {
        tdPlayer.classList.add('table_player_mvp');
}


    const aLink = document.createElement('a');
    aLink.classList.add('a_link');
    aLink.href = `https://rocketleague.tracker.network/rocket-league/profile/${match.platform[player.PlayerName][1]}/${player.PlayerName}/overview`;
    aLink.id = (player.TeamName === match.teams[0]) ? 'team0' : 'team1';
    aLink.target = "_blank";

    // Limite du pseudo à 16 char-
    if (player.PlayerName.length > 16) {
        aLink.textContent = player.PlayerName.slice(0, 16) + " ..";
    } else {
        aLink.textContent = player.PlayerName;
    }

    tdPlayer.appendChild(aLink);
    row.appendChild(tdPlayer);

    // Plateforme
        const tdPlatform = document.createElement('td');
        tdPlatform.classList.add('table_platform');
            const imgPlat = document.createElement('img');
            imgPlat.src = match.platform[player.PlayerName][2];
        tdPlatform.appendChild(imgPlat);
    row.appendChild(tdPlatform);

    // Score
        const tdScore = document.createElement('td');
        tdScore.classList.add('table_score');
        tdScore.textContent = player.Score;
    row.appendChild(tdScore);

    // Goals
        const tdGoalsPlayer = document.createElement('td');
        tdGoalsPlayer.classList.add('table_goal');
        tdGoalsPlayer.textContent = player.Goals;
    row.appendChild(tdGoalsPlayer);

    // Assists
        const tdAssists = document.createElement('td');
        tdAssists.classList.add('table_assist');
        tdAssists.textContent = player.Assists;
    row.appendChild(tdAssists);

    // Saves
        const tdSaves = document.createElement('td');
        tdSaves.classList.add('table_save');
        tdSaves.textContent = player.Saves;
    row.appendChild(tdSaves);

    // Shots
        const tdShots = document.createElement('td');
        tdShots.classList.add('table_shot');
        tdShots.textContent = player.Shots;
    row.appendChild(tdShots);

    // Possession
        const tdPossession = document.createElement('td');
        tdPossession.classList.add('table_possession');
        tdPossession.textContent = player.PossessionTime;
    row.appendChild(tdPossession);

    return row;
}


// -=- UPDATEDATAS -=-
async function updateDatas() {

    // Récupération du pseudonyme de l'utilisateur
    const nickname = "Mithanne"; // futur => fetch depuis env

    // Récupération des informations sur les matches enregistrés ainsi que sur les stats de l'utilisateur
    const AccountIDPromise = fetch("./api/id");
    const matchesPromise = fetch("./api/matches");
    const playerPromise = fetch("./api/player");
    const [AccountIDRes, matchesRes, playerRes] = await Promise.all([AccountIDPromise, matchesPromise, playerPromise]);
    const AccountID = await AccountIDRes.json();
    const matches = await matchesRes.json();
    const player = await playerRes.json();

    // Comparaison avec les anciennes données reçus pour voir si un refresh est nécessaire ou non
    if (JSON.stringify(matches) === JSON.stringify(oldMatches))
        return;

    // Remise à 0 (sinon stack)
    sectionMatches.innerHTML = '';

    // Pour chaque game
    for (const game of matches.reverse()) {
        const GameBackground = document.createElement('div');
        GameBackground.classList.add('match-background');

            // HEADER
            const GamePreview = document.createElement('div');
            GamePreview.classList.add('match-header');
            GamePreview.addEventListener('click', () => {
                toggleDetails(game.id);
            });

                // Timestamp
                const Preview_Timestamp = document.createElement('div');
                Preview_Timestamp.classList.add('timestamp');

                    const Preview_Timestamp_date = document.createElement('span');
                    Preview_Timestamp_date.id = 'date';
                    Preview_Timestamp_date.textContent = game.timestamp[1];
                Preview_Timestamp.appendChild(Preview_Timestamp_date);

                    const Preview_Timestamp_hour = document.createElement('span');
                    Preview_Timestamp_hour.id = 'hour';
                    Preview_Timestamp_hour.textContent = game.timestamp[2];
                Preview_Timestamp.appendChild(Preview_Timestamp_hour);

            GamePreview.appendChild(Preview_Timestamp);

                // Résultats équipes
                const team0Class = game.teams[0] === game.winner ? 'team-winner' : 'team-loser';
                const team1Class = game.teams[1] === game.winner ? 'team-winner' : 'team-loser';
                const team0Width = game.teamsData[game.teams[0]].goals > game.teamsData[game.teams[1]].goals ? 'width:54%;' : 'width:44%;';
                const team1Width = game.teamsData[game.teams[1]].goals > game.teamsData[game.teams[0]].goals ? 'width:54%;' : 'width:44%;';

                const Preview_TeamsScore = document.createElement('div');
                Preview_TeamsScore.classList.add('teams-score');

                    const Preview_Team0 = document.createElement('div');
                    Preview_Team0.classList.add('team0', team0Class);
                    Preview_Team0.style = team0Width;
                        const pName0 = document.createElement('p');
                        pName0.classList.add('name');
                        pName0.textContent = game.teams[0];
                        Preview_Team0.appendChild(pName0);
                        const pScore0 = document.createElement('p');
                        pScore0.classList.add('goals');
                        pScore0.textContent = game.teamsData[game.teams[0]].goals;
                    Preview_Team0.appendChild(pScore0);
                Preview_TeamsScore.appendChild(Preview_Team0);

                    const Preview_Team1 = document.createElement('div');
                    Preview_Team1.classList.add('team1', team1Class);
                    Preview_Team1.style = team1Width;
                        const pScore1 = document.createElement('p');
                        pScore1.classList.add('goals');
                        pScore1.textContent = game.teamsData[game.teams[1]].goals;
                        Preview_Team1.appendChild(pScore1);
                        const pName1 = document.createElement('p');
                        pName1.classList.add('name');
                        pName1.textContent = game.teams[1];
                    Preview_Team1.appendChild(pName1);
                Preview_TeamsScore.appendChild(Preview_Team1);

            GamePreview.appendChild(Preview_TeamsScore);

                // MVP
                let Preview_MVPResult = document.createElement('div');
                Preview_MVPResult.classList.add('mvp-result');
                if (game.mvp.PlayerName === AccountID) {
                    Preview_MVPResult.textContent = 'MVP';
                } else {
                    Preview_MVPResult.style.background = "transparent";
                }

            GamePreview.appendChild(Preview_MVPResult);

                // Résultat du joueur
                const Preview_MatchResult = document.createElement('div');
                Preview_MatchResult.classList.add('scoreResultStatus');
                if (game.matchResult === "Win")
                {
                    Preview_MatchResult.classList.add('WinText');
                    Preview_MatchResult.textContent = "WIN";
                }
                else if (game.matchResult === "Lose")
                {
                    Preview_MatchResult.classList.add('LoseText');
                    Preview_MatchResult.textContent = "LOSE";
                }
                else
                {
                    Preview_MatchResult.classList.add('NoNameText');
                    Preview_MatchResult.textContent = "N/A";
                }
            GamePreview.appendChild(Preview_MatchResult);



                    // DETAILS
                    const GameDetails = document.createElement('div');
                    GameDetails.classList.add('match-box');
                    GameDetails.id = `details_${game.id}`;

                    const MatchBoxTitle = document.createElement('div');
                    MatchBoxTitle.classList.add('match-box-title');
                    const SpanWinner = document.createElement('span');
                    SpanWinner.textContent = game.winner;
                    const SpanTimestamp = document.createElement('span');
                    SpanTimestamp.textContent = game.timestamp[0];
                    const SpanDuration = document.createElement('span');
                    SpanDuration.classList.add('match-duration');
                    SpanDuration.textContent = game.duration;
                MatchBoxTitle.append(SpanWinner, SpanTimestamp, SpanDuration);
            GameDetails.append(MatchBoxTitle, document.createElement('br'));

            // Tables
            [0, 1].forEach(IndexTeam => {
                    const teamName = game.teams[IndexTeam];
                    const teamPlayers = game.players
                        .filter(p => p.TeamName === teamName)
                        .sort((a, b) => parseInt(b.Score) - parseInt(a.Score));
                    const table = document.createElement('table');
                    table.classList.add('scoreboard');
                        const tbody = document.createElement('tbody');

                            // Header
                            const thRow = document.createElement('tr');
                            thRow.classList.add('thead');
                            ["Score", "Player", "Platform", "Score", "Goals", "Assists", "Saves", "Shots", "Possession"].forEach(txt => {
                                const td = document.createElement('td');
                                td.textContent = txt;
                                thRow.appendChild(td);
                            });
                        tbody.appendChild(thRow);
                            
                        teamPlayers.forEach((pl, idx) => {
                            tbody.appendChild(createPlayerRowDetailed(pl, teamName, game, idx, teamPlayers));
                        });

                    table.appendChild(tbody);
                GameDetails.appendChild(table);
                GameDetails.appendChild(document.createElement('br'));
            });

            GameDetails.appendChild(document.createElement('hr'));
                const matchIdSpan = document.createElement('span');
                matchIdSpan.classList.add('match-id');
                matchIdSpan.textContent = `id - ${game.id}`;
            GameDetails.appendChild(matchIdSpan);

        GameBackground.appendChild(GamePreview);
        GameBackground.appendChild(GameDetails);
    sectionMatches.appendChild(GameBackground);
    };

    // Met les nouvelles à la place des anciennes, pour pouvoir comparer lors des futurs refresh
    oldMatches = matches.reverse();
    oldPlayer = player;
}