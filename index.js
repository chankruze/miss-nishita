require('dotenv').config()
const fs = require('fs')
const Discord = require('discord.js')
const Client = require('./client/Client')

const prefix = process.env.PREFIX

const client = new Client()
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}

client.on('ready', () => {
	// Set the client user's activity
	client.user.setActivity(`${prefix} help`, { type: 'LISTENING' })
		.then(presence => console.log(`Activity set to \`${presence.activities[0].name}\``))
		.catch(console.error)

	console.log(`Logged in as ${client.user.username}!`)
	console.log(`Connected to ${client.guilds.cache.size} servers`)
})

client.on('message', async message => {
	// if the message is from any bot and ignore
	if (message.author.bot) return
	// if the message not for bot
	if (!message.content.startsWith(prefix)) return

	const args = message.content.split(/ +/)
	const commandName = args[1].toLowerCase()
	const command = client.commands.get(commandName)

	try {
		if (commandName == "ban" || commandName == "userinfo" || commandName == "invite") {
			command.execute(message, client)
		} else {
			command.execute(message)
		}
	} catch (error) {
		console.error(error)
		message.reply('There was an error trying to execute that command!')
	}
})


// Client add Guild Event
client.on('guildCreate', guild => {
	guild.owner.send(`Miss Nishita has been added to your guild \`${guild.name}\`, if you'd like to see the features and commands for this bot please use the link provided below.`)
	console.log(`Miss Nishita was added to, Name:${guild.name} | ID:${guild.id} | Members:${guild.memberCount}`)
})

// Client leave Guild Event
client.on('guildDelete', guild => {
	console.log(`Miss Nishita removed from, Name:${guild.name} | ID:${guild.id}`)
})

client.login(process.env.BOT_TOKEN)
