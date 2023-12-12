require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const { detailedLog } = require('../../utility');

module.exports = (client) => {
    client.commandHandler = async () => {
        const commandFolder = fs.readdirSync('./src/commands');
        for (const folder of commandFolder) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            };
        };

        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN)
        try {
            detailedLog(client, 'Started refreshing application (/) commands.');

            await rest.put(Routes.applicationCommands(process.env.CLIENTID), {
                body: client.commandArray
            });
            
            /* await rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.MAINGUILD), {
                body: client.commandArray
            }); */

            detailedLog(client, 'Succesfully reloaded application (/) commands.');
        } catch (error) {
            detailedLog(client, error);
        }
    };
};