const { SlashCommandBuilder } = require('discord.js');
const cringeData = require('../../models/cringeData');

module.exports = {
    data: new SlashCommandBuilder()
        .setDMPermission(false)
        .setName('cringe')
        .setDescription('Return my ping!')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('To who shall though add a point of Cringe')
                .setRequired(true),
        ),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: false,
            ephemeral: true
        });

        const options = interaction.options._hoistedOptions;
        const commandUser = options[0].user;
        const data = await cringeData.findOne({ id: commandUser.id });

        if (!data) {
            const newData = await cringeData.create({
                id: commandUser.id,
                count: 1
            });
            await newData.save();
            
            const newMessage = `This user got their first Cringe point 😵‍💫 let the count begin.`;
            await interaction.editReply({
                content: newMessage,
                ephemeral: true
            });

        } else {
            cringeData.updateOne({ id: commandUser.id }, {
                count: data.count++

            }, (err) => {
                if (err) return;
            });

            const newMessage = `Users new cringe score: ${data.count++}`;
            await interaction.editReply({
                content: newMessage,
                ephemeral: true
            });
        };
    } 
}