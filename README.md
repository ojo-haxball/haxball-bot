# Haxball Bot

A library to allow build scalable haxball bots faster. It implements a wrapper around the Haxball headless API with a better events interface and command manager included.

Also you can program bot tasks through "behaviors". With a "behavior" you can tell the bot to do B when A happens.

Some useful utilities are also included: A flood detection system, a ban system based on votes, and a stats module. All those are optional.

## Why?

The current headless API is not the best to build a scalable bot. This wrapper implements a better event system where you can suscribe N functions to an event.

Example:

```
import { Bot, SpaceBounce, Ban, Colors, Afk, Stats, FloodProtection } from "@haxball-bot/bot";

/*
You can define a window.onHBLoaded if you load the script automatically,
but this way is useful when you copy/paste to the console, that is what I do while
captcha is not removed and I can't host a room on a VPS
*/
const interval = setInterval(() => {
	if (window.HBInit) {
		init();
		clearInterval(interval);
	}
}, 100);

//create a new bot
const init = () => {
	const bot = new Bot({
		roomName: "👁J 👁 Space Bounce",
		maxPlayers: 14,
		public: true,
		playerName: "🤖",
		customStadium: SpaceBounce,
		scoreLimit: 4,
		timeLimit: 3,
		teamsLock: true
	});

	const room = bot.getRoom();

	new Ban(room);
	new Chat(room);
	new Afk(room);
	new Colors(room);
	new Stats(room);
	new Behaviors(room);
	new FloodProtection(room);
}

//create your own command modules
class Welcome extends Command {
	constructor(room, {
		">info": (player, message) => {
			this.room.sendChat(`Hello ${player.name}, this is an automated room, enter >commands to list all available commands`)
		},
		">commands": (player, message) => {
			this.room.sendChat(`Available commands are >info >commands`)
		}
	})
}
//this will add the >info command to your room
new Welcome(room);

//listen to an event
room.addEventListener("onGameStart", () => {
	room.sendChat("Game Started!");
});
```

## Install

Using npm:

`npm i @haxball-bot/bot`

or yarn

`yarn add @haxball-bot/bot`


## Bot options

## Available command modules
Command modules are a set of related commands that implement a functionallity. For example, a Ban module is included. Players can vote to ban a player. We track the ban votes inside the module automatically.


## Available behaviors

## Contribute

Feel free to contribute if you have an idea.

## License

MIT

