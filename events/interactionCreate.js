const Discord = require("discord.js");
module.exports = {
  name: Discord.Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.user.bot) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (interaction.isChatInputCommand()) {
      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
      }
      console.log(interaction);
    }
  },
};
