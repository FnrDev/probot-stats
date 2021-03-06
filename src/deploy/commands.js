
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
                required: true,
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
            },
            {
                name: "limit",
                description: "Display number of members",
                type: 4
            }
        ]
    }
];