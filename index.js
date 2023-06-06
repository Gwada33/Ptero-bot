// Modules
const Discord = require("discord.js");

// Environment variables
const dotenv = require("dotenv");
const EventHandler = require("./handlers/EventHandler");
const CommandHandler = require("./handlers/CommandHandler");
dotenv.config();

// Client configuration
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
  ],
});
client.token = process.env.TOKEN;

client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();


// Handling commands and events
EventHandler(client);
CommandHandler(client);

// Login the Client
client.login(client.token);
