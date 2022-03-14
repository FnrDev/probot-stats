const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('colors');
require('dotenv').config();

const commands = require('./commands')
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log('[Discord API] Started refreshing application (/) commands.'.yellow);
		await rest.put(
			process.env.DEVELOPMENT ? Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID)
      : Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands },
		);
		console.log('[Discord API] Successfully reloaded application (/) commands.'.green);
	} catch (error) {
		console.error(error);
	}
})();