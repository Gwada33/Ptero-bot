const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Renvoie le ping de l'API Discord."),
  async execute(interaction) {
    await interaction.reply({
      content: "Pong!",
      ephemeral: true,
    });
  },
};
