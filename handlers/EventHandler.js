const Discord = require("discord.js");
const fs = require("fs");
const path = require("node:path");

module.exports = async (client) => {
  const eventsPath = path.join(__dirname, "..", "events");
  const eventsFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of eventsFiles) {
    const event = require(path.join(eventsPath, file));
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
};
