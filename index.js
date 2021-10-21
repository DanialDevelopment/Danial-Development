const Discord = require('discord.js')
const client = new Discord.Client({
    allowedMentions: { parse: [] },
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});
const roblox = require('noblox.js')
const chalk = require('chalk')
const fs = require('fs')
const config = require('./config.json')
let commandList = []
client.commandList = commandList;
client.config = config
require('dotenv').config();
const cooldowns = new Discord.Collection();
const moment = require('moment')

roblox.setCookie(process.env.cookie).catch(async err => {
    console.log(chalk.red('Issue with logging in: ' + err));
});

fs.readdir('./commands/', async (err, files) => {
    if(err){
        return console.log(chalk.red('An error occured when checking the commands folder for commands to load: ' + err));
    }
    files.forEach(async (file) => {
        if(!file.endsWith('.js')) return;
        let commandFile = require(`./commands/${file}`);
        commandList.push({
            file: commandFile,
            name: file.split('.')[0],
            config: commandFile.config
        });
    });
});

client.on('ready', async () => {
    console.log(`${client.user.tag} is ready!`)
    console.log(`Bot started!`)
});

client.on('messageCreate', async (message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith(client.config.prefix)) return;
    const args = message.content.slice(client.config.prefix.length).split(' ');
    const commandName = args[0].toLowerCase();
    args.shift();
    const command = commandList.find((cmd) => cmd.name === commandName || cmd.config.aliases.includes(commandName));
    if(!command) return;

    if(command.config.cooldown) {
        if(!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }
        let currentDate = Date.now();
        let userCooldowns = cooldowns.get(command.name);
        let cooldownAmount = (command.config.cooldown || 3) * 1000;
        if(userCooldowns.has(message.author.id)) {
            let expirationDate = userCooldowns.get(message.author.id) + cooldownAmount;
            if(currentDate < expirationDate) {
                let timeLeft = Math.round((expirationDate - currentDate) / 1000);
                let cooldownEmbed = new MessageEmbed()
                .setColor('RED')
                .seTitle(`Cooldown!`)
                .setDescription(`This command is currently on cooldown. Please try again in ${timeLeft.toString()} seconds.`)
                .setAuthor(message.author.tag, message.author.displayAvatarURL());
                return message.channel.send({ embeds: [cooldownEmbed] });
            } else {
                userCooldowns.set(message.author.id, currentDate);
            }
        } else {
            userCooldowns.set(message.author.id, currentDate);
        }
    }

    command.file.run(client, message, args);
});

client.login(client.config.token)