const DiscordJS = require('discord.js');
const WOKCommands = require('wokcommands');
const path = require('path');
const { Intents } = DiscordJS
const KeepAlive = require('./server.js');
const config = require('./config.json');
const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ]
});
client.on("ready", () => {
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, './src/commands'),
    featuresDir: path.join(__dirname, './src/features'),
    botOwners: config.botOwners,
    disabledDefaultCommands: [
      'help',
      'command',
      'language',
      'prefix',
      'requiredrole',
      'channelonly'
    ]
  })
  .setDefaultPrefix(config.prefix)
  console.log(`Logging in as ${client.user.tag}!`)
  console.log(`${client.user.tag} has started with ${client.users.cache.size} users, in ${client.guilds.cache.size} guilds: \n ${client.guilds.cache.map(g=>g.name).join('\n')}`);
})

KeepAlive()

client.login(process.env.TOKEN)
module.exports = {client};