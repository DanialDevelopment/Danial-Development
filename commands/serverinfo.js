const Discord = require('discord.js')
const MessageEmbed = require('discord.js')
const moment = require('moment')

const config = {
    description: "Server Information.",
    aliases: ['si', 'info'],
    usage: "",
    category: "Utilities"
}

module.exports = {
    config,
    run: async (Client, message, args) => {
        const guild = message.guild;
        const embed = new Discord.MessageEmbed()
        .setTitle(message.guild.name)
        .setThumbnail(message.guild.iconURL())
        .setColor('DARK BLUE')
        .addFields(
            { name: 'General Info', value: `Server ID: ${guild.id}\nServer Name: ${guild.name}` },
            { name: 'Counts', value: `Roles Count: ${guild.roles.cache.size} roles\nChannels Count: ${guild.channels.cache.size} total` },
            { name: 'Additional Information', value: `Created: ${moment(guild.createdTimestamp).format('LT')} ${moment(guild.createdTimestamp).format('LL')} ${moment(guild.createdTimestamp).fromNow()}\nBoost Tier: ${guild.premiumTier ? `Tier ${guild.premiumTier}`: "None"}\nBoost Count: ${guild.premiumSubscriptionCount || "0" }`}  
        )
        /*.addField('General Info', [
            `Server ID: ${guild.id}`,
            `Server Name: ${guild.name}`,
            `Server Owner: ${guild.owner}`
        ])
        .addField('Counts', [
            `Roles Count: ${guild.roles.cache.size} roles`,
            `Channels Count: ${guild.channels.cache.size} total (Text: ${guild.channels.cache.filter(
                (ch) => ch.type === 'text')
            }, Voice: ${guild.channels.cache.filter(
                (ch) => ch.type === 'voice')
            })`
        ])
        .addField('Additional Information', [
            `Created: ${moment(guild.createdTimestamp).format('LT')} ${moment(guild.createdTimestamp).format('LL')} ${moment(guild.createdTimestamp).fromNow()}`,
            `Server Region: ${guild.region}`,
            `Boost Tier: ${guild.premiumTier ? `Tier ${guild.premiumTier}`: "None"}`,
            `Boost Count: ${guild.premiumSubscriptionCount || "0" }`
        ])*/

        message.channel.send({ embeds: [embed] });
    }
}