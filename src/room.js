import CommandsManager from "./commandsManager.js";

//Haxball room abstraction that implements a subscription system for all game events
// and add some new ones
class Room {
	constructor(room, settings) {
		this.room = room;
		this.settings = settings;
		this._events = {
			onPlayerJoin: [],
			onPlayerLeave: [],
			onTeamVictory: [],
			onPlayerChat: [],
			onPlayerBallKick: [],
			onTeamGoal: [],
			onGameStart: [],
			onGameStop: [],
			onGameEnd: [],
			onPlayerAdminChange: [],
			onPlayerTeamChange: [],
			onPlayerKicked: [],
			onGameTick: [],
			onGamePause: [],
			onGameUnpause: [],
			onPositionsReset: [],
			onPlayerActivity: [],
			onStadiumChange: []
		};

		this._actions = {
			sendChat: null,
			setPlayerAdmin: null,
			setPlayerTeam: null,
			kickPlayer: null,
			clearBans: null,
			setScoreLimit: null,
			setTimeLimit: null,
			setCustomStadium: null,
			setDefaultStadium: null,
			setTeamsLock: null,
			setTeamColors: null,
			startGame: null,
			stopGame: null,
			pauseGame: null,
			getPlayerList: null,
			getScores: null,
			getBallPosition: null,
			startRecording: null,
			stopRecording: null
		};

		for (let key in this._events) {
			if (this._events.hasOwnProperty(key)) {
				this.room[key] = (...args) => {
					return this.processSuscribers({ key, args });
				};
			}
		}

		for (let key in this._actions) {
			if (this._actions.hasOwnProperty(key)) {
				this[key] = this.room[key];
			}
		}
		this.commandsManager = new CommandsManager(this);
	}

	addEventListener = (event, callback) => {
		if (!this._events[event]) {
			console.warn(`There is no ${event} event available to suscribe.`);
			return;
		}
		this._events[event].push(callback);
	};

	processSuscribers = ({ key, args }) => {
		let res = undefined;
		this._events[key].forEach(func => {
			let res2 =func(...args);
			if(res2 != undefined)
				res = res2;
		});
		return res;
	};
}

export default Room;
