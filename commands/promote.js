const roblox = require('noblox.js')
const Discord = require('discord.js')
const MessageEmbed = require('discord.js')
require('dotenv').config();

const config = {
    description: 'Promote a user on roblox.',
    aliases: [],
    usage: '<username>',
    category: 'Roblox'
}

module.exports = {
    config,
    run: async (client, message, args) => {

        const rolesEmbed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('insufficient Permission')
        .setDescription('You need `Ranking Permissions` role to use this command!')
        .setFooter('System Error')
        if(!message.member.roles.cache.some(role => ["Ranking Permissions"].includes(role.name))){
            return message.channel.send({ embeds: [rolesEmbed] });
        }

        const userEmbed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('insufficient Argument')
        .setDescription('Please enter their roblox username!')
        .setFooter('System Error')
        const user = args.slice(0).join(" ")
        if(!user) return message.channel.send({ embeds: [userEmbed] });

        let id;
        try{
            id = await roblox.getIdFromUsername(user)
        } catch (err) {
            const idEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('❌ Username Arguments')
            .setDescription(`${user} does not exist. Please double check their username.`)
            .setFooter('System Error')
            return message.channel.send({ embeds: [idEmbed] });
        }

        let rankInGroup = await  roblox.getRankInGroup(process.env.groupId, id)
        let rankingTo = rankInGroup + 1;

        if(rankInGroup == 0){
            return message.channel.send(`${user} is not in the roblox group!`)
        }

        let rankNameInGroup = await roblox.getRankNameInGroup(process.env.groupId, id);

        let rankingInfo;
        try{
            rankingInfo = await roblox.promote(process.env.groupId, id);
        } catch (err){
            const errEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Error Occured')
            .setDescription(`An error has occured. Please try again later. Error Referrence: ${err}`)
            .setFooter(`System Error`)

            return message.channel.send({ embeds: [errEmbed] })
        }

        const successEmbed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle(`Ranked!`)
        .setDescription(`${user} has been promoted to ${rankingInfo.newRole.name} (${rankingInfo.newRole.rank})`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL());

        message.channel.send({ embeds: [successEmbed] })

        if(process.env.rankinglogs !== 'false'){
            let logChannel = await client.channels.fetch(process.env.rankinglogs)

            const logEmbed = new Discord.MessageEmbed()
            .setColor('DARK BLUE')
            .setTitle('Promotion Logs')
            .setDescription(`${user} (${id}) has been promoted by ${message.author.tag} from ${rankNameInGroup} (${rankInGroup}) to ${rankingInfo.newRole.name} (${rankingInfo.newRole.rank})`)
            .setFooter(`System Logging`)
            .setTimestamp()
            return logChannel.send({ embeds: [logEmbed] });
        }

    }
}