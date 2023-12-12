require('dotenv').config();
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setDMPermission(true)
        .setName('time')
        .setDescription('Create a time markdown!')
        .addNumberOption(options => 
            options.setName('day')
            .setDescription('Choose a number between 1-31')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(31)
        )
        .addNumberOption(options => 
            options.setName('month')
            .setDescription('Choose a number between 1-12')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(12)
        )
        .addNumberOption(options => 
            options.setName('year')
            .setDescription('Choose a number equal or greater than 1970')
            .setRequired(true)
            .setMinValue(1970)
        ),
    async execute(interaction, client) {
        var day = interaction.options.getNumber('day');
        var month = interaction.options.getNumber('month');
        var year = interaction.options.getNumber('year');

        var time;
        if (!arguments[0]) {
            time = Math.floor(Date.now() / 1000);
        } else {
            time = Math.floor(Date.parse(`${month}-${day}-${year}`) / 1000);
        };

        await interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor(process.env.COLOR)
                .setTitle('__Timetables__')
                .setDescription(`\`<t:${time}:f>\` <t:${time}:f>
                \`<t:${time}:F>\` <t:${time}:F>
                \`<t:${time}:d>\` <t:${time}:d>
                \`<t:${time}:D>\` <t:${time}:D>
                \`<t:${time}:t>\` <t:${time}:t>
                \`<t:${time}:T>\` <t:${time}:T>
                \`<t:${time}:R>\` <t:${time}:R>`)
            ]
        });
    }
};