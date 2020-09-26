/*
Author: chankruze (chankruze@geekofia.in)
Created: Fri Sep 25 2020 17:48:00 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const Discord = require('discord.js')
const config = require('config')

module.exports = {
    name: 'invite',
    description: 'Invite Miss Nishita to your discord server.',
    execute(message, client) {
        let inviteEmbed = new Discord.MessageEmbed()
            .setColor(config.get('bg-success'))
            .setTitle('Wanna Try Me ?')
            .setURL(config.get('url-home'))
            .setDescription("If you'd like to add Miss Nishita to your server please use the link below")
            .setThumbnail(config.get('url-logo'))

        client.generateInvite(config.get('required-permissions'))
            .then(link => {
                inviteEmbed.addField(`${config.get("emoji-pin")} Invitation Link`, `[${config.get("emoji-link")} Invite Link](${link})`)
                inviteEmbed.setTimestamp()
                    .setFooter(`Developed with ${config.get("emoji-heart")}  by chankruze`, config.get("url-avatar-git-geekofia"))
                message.author.send(inviteEmbed).catch(err => console.log(err.stack))
                console.log(`Invite link ${link} created and sent to ${message.author.username}`)
            }).catch(err => console.log(err.stack))

        if (message.channel.type != 'dm') {
            message.delete({ timeout: 0, reason: 'It had to be done.' })
        }
    },
}
