// https://medium.com/@sebastianberglonn/make-your-own-twitch-bot-node-js-6075d3b082ca
let tmi = require('tmi.js')
let discord = require('discord.js')

let { twitchOptions, discordOptions } = require('./config')
let { webhookId, webhookToken, auth } = discordOptions

let twitchClient = new tmi.client(twitchOptions)
twitchClient.connect()

let discordClient = new discord.Client()
discordClient.login(auth)
let discordHook = new discord.WebhookClient(webhookId, webhookToken)

function onTwitchChat(_, userstate, message, self) {
	if (self) return
	discordHook.send(message, {
		username: userstate.username,
		avatarURL:
			'https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/twitch-512.png',
	})
}

discordClient.on('ready', () => {
	twitchClient.on('chat', onTwitchChat)
})
