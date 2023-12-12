require("dotenv").config();
const db = require('./database/database');
const guildSettings = require('./models/guildSettings');
const guildData = require('./models/guildData');
const { config } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences] });
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
};

client.eventHandler();
client.commandHandler();
client.login(process.env.TOKEN);