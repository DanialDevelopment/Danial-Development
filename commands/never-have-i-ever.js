const Discord = require('discord.js')
const MessageEmbed = require('discord.js')
require('dotenv').config();

const config = {
    description: "Never have I ever.",
    aliases: ['nhie'],
    usage: '',
    category: 'Fun'
}

module.exports = {
    config,
    run: async (client, message, args) => {

        function Generate() {
            let text = '';
            let randomstuff = [
                'Never have I ever been jealous when I heard that a celebrity is in a relationship',
                'Never have I ever missed the school bus.',
                `Never have I ever browsed my partner's emails.`,
                `Never have I ever drunk alcohol at work or school.`,
                `Never have I ever forgotten to take my contraceptive pill.`,
                `Never have I ever convinced someone to get the tattoo similar to mine.`,
                `Never have I ever been on TV.`,
                `Never have I ever been attracted to authority figures.`,
                `Never have I ever played hooky from school or work`,
                `Never have I ever rode a motorcycle`,
                `Never have I ever lost a bet`,
                `Never have I ever gone skinny-dipping`,
                `Never have I ever cheated on someone`,
                `Never have I ever sang karaoke`,
                `Never have I ever broken a bone`,
                `Never have I ever ate an entire pizza by myself`,
                `Never have I ever got a tattoo`,
                `Never have I ever wanted to be on a reality TV show`,
                `Never have I ever got stopped by airport security`,
                `Never have I ever left gum in a public space`,
                `Never have I ever given/received a lap dance`,
                `Never have I ever made a speech in front of 100 people or more`
            ]
            text += randomstuff[Math.floor(Math.random() * randomstuff.length)];
            return text;
          }

          const string = Generate()
            const nhieEmbed = new Discord.MessageEmbed()
            .setColor('DARK BLUE')
            .setTitle(`Never Have I Ever`)
            .setDescription(string)
            message.channel.send({ embeds: [nhieEmbed] });

    }
}