const Discord = require('discord.js')
const MessageEmbed = require('discord.js')
const ms = require('ms')


const config = {
    description: "Set slowmode to a certain channel.",
    aliases: ['sm'],
    usage: '<time>',
    category: "Utilities"
}

module.exports = {
    config,
    run: async(Client, message, args) => {

        const rolesEmbed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('insufficient Permission')
        .setDescription('You need to have the `MANAGE_CHANNELS` permission to use this command.')
        .setFooter('System Error')
        if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.channel.send({ embeds: [rolesEmbed] });
        if(!args[0]) {
            message.channel.setRateLimitPerUser(0)
            return message.channel.send(`The slowmode has been reset!`)
        }

        const raw = args[0]
        const milliseconds = ms(raw);

        if(isNaN(milliseconds)) return message.channel.send('Invalid time!');
        if(milliseconds < 1000) return message.channel.send(`The minimum slowmode is 1 second.`);

        message.channel.setRateLimitPerUser(milliseconds / 1000);
        message.channel.send(`Slowmode has been set to ${ms(milliseconds, {
            long: true
        })}`)
    }
}