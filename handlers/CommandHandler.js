const Discord = require("discord.js");
const fs = require("fs");
const path = require("node:path");
const config = require("../config.json")

module.exports = async (client) => {
  const commands = [];

  const foldersPath = path.join(__dirname, "..", "commands");
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);

      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
      } else {
        console.log(
          `Command ${command.data.name} is missing a required "data" or "execute" property.`
        );
      }
    }
  }

  const rest = new Discord.REST().setToken(process.env.TOKEN);

  (async () => {
    try {
      console.log(
        `Started refreshing ${commands.lengt} application (/) commands.`
      );

      config.guilds.forEach(async (guild) => {
        const data = await rest.put(
          Discord.Routes.applicationGuildCommands(config.client_id, guild.id), {
            body: commands
          }
        );
      })

      console.log(
        `Successfully reloaded ${data.length} application (/) commands on all servers.`
      );
    } catch (e) {
      console.error(e);
    }
  })();
};