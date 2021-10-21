const Discord = require('discord.js')
const MessageEmbed = require('discord.js')
const translate = require('@iamtraction/google-translate')

const config = {
    description: 'Translate other language to English!',
    aliases: [],
    usage: "<text>",
    category: "Utilities"
}

module.exports = {
    config,
    run: async (Client, message, args) => {
        const query = args.join(" ");
        if(!query) return message.channel.send(`Please enter a text to translate!`)

        try {

        const translated = await translate(query, { to: "en" });
        const embed = new Discord.MessageEmbed()
        .setColor('DARK BLUE')
        .setTitle(`Text: ${query}`)
        .setDescription(`${translated.text}`)
        .setFooter(`Translate System`)
        message.channel.send({ embeds: [embed] });
        } catch (e){
            const err = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('ERROR OCCURED')
            .setDescription(`An erorr has occured! Please try again later! Erorr Refference: ${e}`)
            .setFooter('System Error')
            return message.channel.send({ embeds: [err] });
        }
    }
}