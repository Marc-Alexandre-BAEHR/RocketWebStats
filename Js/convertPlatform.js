const path = require("path");

function convertPlatform(players)
{
    const platform_data = {};

    players.forEach(p => {
        const eachPlayer = `${p.PlayerName}`;
        const platform = p.PlatformName;

        epic_path = path.join("logo", "epic.png");
        psn_path = path.join("logo", "psn.png");
        switch_path = path.join("logo", "switch.png");
        steam_path = path.join("logo", "steam.png");
        xbox_path = path.join("logo", "xbox.png");





        if (platform === 'Epic')
            platform_data[eachPlayer] = ['Epic', 'epic', epic_path]
        
        if (platform === 'XboxOne')
            platform_data[eachPlayer] = ['Xbox', 'xbl', xbox_path]
        
        if (platform === 'PS4')
            platform_data[eachPlayer] = ['PS4', 'psn', psn_path]
        
        if (platform === 'Switch')
            platform_data[eachPlayer] = ['Switch', 'switch', switch_path]
    
        if (platform === 'Steam')
            platform_data[eachPlayer] = ['Steam', 'steam', steam_path]

    });
    return platform_data;

}

module.exports = {
    convertPlatform
};