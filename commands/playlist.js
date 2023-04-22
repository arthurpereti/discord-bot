const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('playlist')
		.setDescription('Melhor Playlist'),
	async execute(interaction) {
		await interaction.reply("https://open.spotify.com/playlist/3R2LWaz7uRpKXohIo4a8rT?si=fd2ec6828b664828");
	},
};