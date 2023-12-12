const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setDMPermission(true)
        .setName('ping')
        .setDescription('Return my ping!'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const newMessage = `\`\`\`js\n🏓 Pong \n  API Latency: ${Math.floor(client.ws.ping)} \n  Client Ping: ${Math.floor(message.createdTimestamp - interaction.createdTimestamp)} \n  Uptime: ${Math.floor(client.uptime/1000/60/60)} hours\`\`\``
        await interaction.editReply({
            content: newMessage
        });
    }
}