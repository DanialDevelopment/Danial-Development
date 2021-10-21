const Discord = require('discord.js')
const MessageEmbed = require('discord.js')
require('dotenv').config();

const config = {
    description: "Kick a user from the server!",
    aliases: [''],
    usage: '<user> [reason]',
    category: 'Moderation'
}

module.exports = {
    config,
    run: async (client, message, args) => {
        const rolesEmbed = new Discord.MessageEmbed()
        .setColor(`RED`)
        .setTitle(`Permission Error!`)
        .setDescription('Only Moderator role or user with `KICK_MEMBERS` permission can use this command.')
        .setFooter(`System Error`)
        if (!message.member.roles.cache.some(role => [process.env.modrole].includes(role.name)) && !message.member.permissions.has('KICK_MEMBERS'))  {
            return message.channel.send({ embeds: [rolesEmbed] })
          }

          const errEmbed = new Discord.MessageEmbed()
          .setColor('RED')
          .setTitle(`User Error!`)
          .setDescription(`Please include the target to kick!`)
          .setFooter(`System Error`)
          const member = message.mentions.members.first();
          if(!member) return message.channel.send({ embeds: [errEmbed]})

          const reason = args.slice(1).join("") || "Not Specified"

          const errEmbed1 = new Discord.MessageEmbed()
          .setColor('RED')
          .setTitle('User Error!')
          .setDescription(`You can't punish this member because you either have the same role or your role is lower.`)
          .setFooter(`System Logging`)
          if(message.member.roles.highest.position <= member.roles.highest.position) return message.reply({ embeds: [errEmbed1] });
          try{
          member.kick()
          message.channel.send(`User has been succesfully kicked from the server!`)

          if(process.env.modlogs !== 'false') {
            let logChannel = await client.channels.fetch(process.env.modlogs)
    
              const logEmbed = new Discord.MessageEmbed()
              .setColor('DARK BLUE')
              .setTitle('Mod Logs')
              .setDescription(`${member} has been kicked from the server!`)
              .addField(`Moderator`, `<@${message.author.id}>`, true)
              .addField(`Reason`, reason, true)
              .setFooter(`System Logging`)
              .setTimestamp()
              return logChannel.send({ embeds: [logEmbed] });
              
    }
} catch (e){
    console.log(e)
}
}
}