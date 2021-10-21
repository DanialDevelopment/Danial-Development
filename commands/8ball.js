const Discord = require('discord.js')
const MessageEmbed = require('discord.js')
require('dotenv').config();

const config = {
    description: "Ask the 8ball a question.",
    aliases: [''],
    usage: '<question>',
    category: 'Fun'
}

module.exports = {
    config,
    run: async (client, message, args) => {

        function Generate() {
            let text = '';
            let randomstuff = ['My source said yes.', 'Definitely yes!', 'Definitely no!', 'My source said no.', 'Try again and focus with the question.', 'I am not sure about that, try again.', 'Indeed, correct!'];
            text += randomstuff[Math.floor(Math.random() * randomstuff.length)];
            return text;
          }
    
            const question = args.slice(0).join(" ")
            if(!question) {
              return message.channel.send(`Please ask a question.`)
            }
    
            const string = Generate()
            const ballEmbed = new Discord.MessageEmbed()
            .setColor('DARK BLUE')
            .setTitle(`Question: ` + question)
            .addField(`My answer is...`, string)
            message.channel.send({ embeds: [ballEmbed] });

    }
}