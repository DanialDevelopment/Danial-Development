const Discord = require('discord.js')
const MessageEmbed = require('discord.js')
require('dotenv').config();
const roblox = require("noblox.js")

const config = {
  description: 'Rank a user on roblox.',
  aliases: [],
  usage: '<username> <rankID/Name>',
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
        const user = args[0]
        if(!user) return message.channel.send({ embeds: [userEmbed] });
        
        const err1Embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Insufficient Argument')
        .setDescription(`Please enter the rankID/rank name.`)
        .setFooter('System Error')
        const info = args.slice(1).join(" ")
        if(!user) return message.channel.send({ embeds: [err1Embed] });

      let rank = info;
        if(!rank) {
          const rankEmbed = new Discord.MessageEmbed()
          .setColor('RED')
          .setTitle(`Invalid Arguments`)
          .setDescription(`Rank Name/ID does not exist.`)
            return message.channel.send({ embeds: [rankEmbed] });
        }

        if(/[^0-9]+/gm.test(rank)) {
            let rankArgs = info;
            if(!rankArgs) {
            const rankaEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setitle(`Invalid Arguments`)
            .setDescription(`Rank Name/ID does not exist.`)
            return message.channel.send({ embeds: [rankaEmbed] });
            }
            let rankSearch = await getRankFromName(rankArgs, process.env.groupId);
            if(!rankSearch) {
              const ranksEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setitle(`Invalid Arguments`)
            .setDescription(`Rank Name/ID does not exist.`)
            return message.channel.send({ embeds: [ranksEmbed] });
            }
            rank = rankSearch;
        }

         let id;
      try {
        id = await roblox.getIdFromUsername(user)
      } catch (err) {
        console.log(err)
        const idEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setTitle('❌ Username Arguments')
      .setDescription(`${user} does not exist. Please double check their username.`)
      .setFooter('System Error')
      return message.channel.send({ embeds: [idEmbed] });
      }

      let rankInGroup = await roblox.getRankInGroup(process.env.groupId, id);
        let rankingTo = rankInGroup - 1;
      

        if(rankInGroup === 0){
            const rankigEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setitle(`Invalid Arguments`)
            .setDescription(`User is not in group.`)
            return message.channel.send({ embeds: [rankigEmbed] });
        }

        let rankNameInGroup = await roblox.getRankNameInGroup(process.env.groupId, id);
        let rankingInfo;
        try {
            rankingInfo = await roblox.setRank(process.env.groupId, id, Number(rank));
        } catch (err) {
            console.log(`Error: ${err}`);
            const errEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle(`Error`)
            .setDescription(`An error has occured. Error referrences: ${err}`)
            return message.channel.send({ embeds: [errEmbed] });
        }

        const successEmbed = new Discord.MessageEmbed()
        .setTitle('Ranked!')
        .setDescription(`${user} has been ranked to ${rankingInfo.name} (${rankingInfo.rank}).`)
        .setColor('GREEN')
        .setAuthor(message.author.tag, message.author.displayAvatarURL());
        message.channel.send({ embeds: [successEmbed]});

        if(process.env.ranklog !== 'false') {
          let logChannel = await client.channels.fetch(process.env.rankinglogs)
  
            const logEmbed = new Discord.MessageEmbed()
            .setColor('DARK BLUE')
            .setTitle('Rank Logs')
            .setDescription(`${user} (${id}) has been ranked by ${message.author.tag} from ${rankNameInGroup} (${rankInGroup}) to ${rankingInfo.name} (${rankingInfo.rank})`)
            .setFooter(`System Logging`)
            .setTimestamp()
            return logChannel.send({ embeds: [logEmbed] });
            
  }
    }
}

async function getRankFromName(rankArgs, groupId) {
  return new Promise(async (resolve, reject) => {
    const roles = await roblox.getRoles(groupId)
  const foundRole = roles.find(obj => obj.name == rankArgs)
  if (foundRole == null) return reject("Role not found")
  resolve(foundRole.rank)
  })
}
