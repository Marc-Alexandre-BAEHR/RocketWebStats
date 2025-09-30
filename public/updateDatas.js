const sectionMatches = document.getElementById('sectionMatches');



let oldMatches = undefined;
let oldPlayer = undefined;


async function updateDatas()
{
    
    const nickname = "Mithanne"; // REMPLACER FUTUR PAR FETCH AVEC ENV
    
    
    const matchesPromise = fetch("./api/matches");
    const playerPromise = fetch("./api/player");
    const [matchesRes, playerRes] = await Promise.all([matchesPromise, playerPromise]);
    
    const matches = await matchesRes.json();
    const player = await playerRes.json();
    
    if (JSON.stringify(matches) === JSON.stringify(oldMatches))
        return;
    
    
    
    // Reset le contenu :
    sectionMatches.innerHTML = '';

    for (const game of matches.reverse()) {

        const GameBackground = document.createElement('div');
        GameBackground.classList.add('match-background');

        const GamePreview = document.createElement('div');
        GamePreview.classList.add('match-header');
        GamePreview.addEventListener('click', () => {
            toggleDetails(game.id);
        })


            // Mise en place du timestamp
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


        // Mise en place du score des équipe

        // - 1 - Initialisation des variables
        const team0Class = game.teams[0] === game.winner ? 'team-winner' : 'team-loser';
        const team1Class = game.teams[1] === game.winner ? 'team-winner' : 'team-loser';
        const team0Width = game.teamsData[game.teams[0]]['goals'] > game.teamsData[game.teams[1]]['goals'] ? 'width:54%;' : 'width:44%;';
        const team1Width = game.teamsData[game.teams[1]]['goals'] > game.teamsData[game.teams[0]]['goals'] ? 'width:54%;' : 'width:44%;';


        const Preview_TeamsScore = document.createElement('div');
        Preview_TeamsScore.classList.add('teams-score');
            
            const Preview_Team0 = document.createElement('div');
            Preview_Team0.classList.add('team0');
            Preview_Team0.classList.add(team0Class);
            Preview_Team0.style = team0Width;

                const Preview_Team0_Name = document.createElement('p');
                Preview_Team0_Name.classList.add('name');
                Preview_Team0_Name.textContent = game.teams[0];
                Preview_Team0.appendChild(Preview_Team0_Name);
                    
                const Preview_Team0_Score = document.createElement('p');
                Preview_Team0_Score.classList.add('goals');
                Preview_Team0_Score.textContent = game.teamsData[game.teams[0]]['goals'];
                Preview_Team0.appendChild(Preview_Team0_Score);
            Preview_TeamsScore.appendChild(Preview_Team0);

            const Preview_Team1 = document.createElement('div');
            Preview_Team1.classList.add('team1');
            Preview_Team1.classList.add(team1Class);
            Preview_Team1.style = team1Width;

                const Preview_Team1_Score = document.createElement('p');
                Preview_Team1_Score.classList.add('goals');
                Preview_Team1_Score.textContent = game.teamsData[game.teams[1]]['goals'];
                Preview_Team1.appendChild(Preview_Team1_Score);

                const Preview_Team1_Name = document.createElement('p');
                Preview_Team1_Name.classList.add('name');
                Preview_Team1_Name.textContent = game.teams[1];
                Preview_Team1.appendChild(Preview_Team1_Name);        
            Preview_TeamsScore.appendChild(Preview_Team1);

        GamePreview.appendChild(Preview_TeamsScore);


        // Affichage du MVP ?
        let Preview_MVPResult = document.createElement('div');
        Preview_MVPResult.classList.add('mvp-result');
        if (game.mvp.PlayerName === nickname) {
            Preview_MVPResult.textContent = 'MVP';
        } else {
            Preview_MVPResult.style.background = "transparent";
        }
        GamePreview.appendChild(Preview_MVPResult);


        // Affichage du résultat de la partie selon le joueur

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

        GameBackground.appendChild(GamePreview);






        const GameDetails = document.createElement('div');

        GameDetails.classList.add('match-box')
        GameDetails.id = `details_${game.id}`;




        GameBackground.appendChild(GameDetails);
        sectionMatches.appendChild(GameBackground);
    }

    oldMatches = matches.reverse();
    oldPlayer = player;


}

// updateDatas();