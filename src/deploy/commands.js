
module.exports = [
    {
        name: "invite",
        description: "Get bot invite link"
    },
    {
        name: "stats",
        description: "Get probot stats, guilds, members."
    },
    {
        name: "top",
        description: "Get list most people with credits / xp",
        options: [
            {
                name: "type",
                description: "Select type",
                type: 3,
                choices: [
                    {
                        name: "Credits",
                        value: "credits"
                    },
                    {
                        name: "Xp",
                        value: "xp"
                    }
                ]
            }
        ]
    }
];