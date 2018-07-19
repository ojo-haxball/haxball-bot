import voca from 'voca';
import has from 'lodash-es/has';
import set from 'lodash-es/set';
import map from 'lodash-es/map';
import get from 'lodash-es/get';
import size from 'lodash-es/size';
import find from 'lodash-es/find';
import forEach from 'lodash-es/forEach';
import orderBy from 'lodash-es/orderBy';
import filter from 'lodash-es/filter';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var CommandsManager = function CommandsManager(room) {
	var _this = this;

	classCallCheck(this, CommandsManager);

	this.add = function (command, callback) {
		_this.commands[command] = callback;
	};

	this.exec = function (command, player, args) {
		if (!_this.commands[command]) {
			return;
		}
		return _this.commands[command](player, args);
	};

	this.room = room;
	this.commands = {};
	this.room.addEventListener("onPlayerChat", function (player, message) {
		if (!message.startsWith("!")) return;
		var command = message.split(" ")[0];
		if (!_this.commands[command]) {
			return;
		}
		var args = message.replace(command + " ", "");
		return _this.exec(command, player, args);
	});
};

//Haxball room abstraction that implements a subscription system for all game events
// and add some new ones

var Room = function Room(room, settings) {
	var _this = this;

	classCallCheck(this, Room);

	this.addEventListener = function (event, callback) {
		if (!_this._events[event]) {
			console.warn("There is no " + event + " event available to suscribe.");
			return;
		}
		_this._events[event].push(callback);
	};

	this.processSuscribers = function (_ref) {
		var key = _ref.key,
		    args = _ref.args;

		var res = undefined;
		_this._events[key].forEach(function (func) {
			var res2 = func.apply(undefined, toConsumableArray(args));
			if (res2 != undefined) res = res2;
		});
		return res;
	};

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

	var _loop = function _loop(key) {
		if (_this._events.hasOwnProperty(key)) {
			_this.room[key] = function () {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				return _this.processSuscribers({ key: key, args: args });
			};
		}
	};

	for (var key in this._events) {
		_loop(key);
	}

	for (var key in this._actions) {
		if (this._actions.hasOwnProperty(key)) {
			this[key] = this.room[key];
		}
	}
	this.commandsManager = new CommandsManager(this);
};

var Bot = function () {
	function Bot() {
		var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		classCallCheck(this, Bot);
		var _settings$scoreLimit = settings.scoreLimit,
		    scoreLimit = _settings$scoreLimit === undefined ? 3 : _settings$scoreLimit,
		    _settings$timeLimit = settings.timeLimit,
		    timeLimit = _settings$timeLimit === undefined ? 3 : _settings$timeLimit,
		    _settings$teamsLock = settings.teamsLock,
		    teamsLock = _settings$teamsLock === undefined ? true : _settings$teamsLock,
		    _settings$customStadi = settings.customStadium,
		    customStadium = _settings$customStadi === undefined ? false : _settings$customStadi,
		    _settings$dbPrefix = settings.dbPrefix,
		    rest = objectWithoutProperties(settings, ["scoreLimit", "timeLimit", "teamsLock", "customStadium", "dbPrefix"]);


		var room = window.HBInit(rest);
		this.room = new Room(room, settings);
		if (customStadium) this.room.setCustomStadium(JSON.stringify(customStadium));
		this.room.setScoreLimit(scoreLimit);
		this.room.setTimeLimit(timeLimit);
		this.room.setTeamsLock(teamsLock);
	}

	createClass(Bot, [{
		key: "getRoom",
		value: function getRoom() {
			return this.room;
		}
	}]);
	return Bot;
}();

var Command = function Command(roomObject) {
	var _this = this;

	var commands = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	classCallCheck(this, Command);

	this.addCommands = function () {
		for (var command in _this.commands) {
			if (_this.commands.hasOwnProperty(command)) {
				_this.room.commandsManager.add(command, _this.commands[command]);
			}
		}
	};

	this.addCommand = function (command, func) {
		_this.commands[command] = func;
		_this.room.commandsManager.add(command, func);
	};

	this.room = roomObject;
	this.commands = commands;
	this.addCommands();
};

var spaceBounce = {
	name: "SpaceBounce v1 by Geheim",
	width: 900,
	height: 540,
	spawnDistance: 350,
	bg: {
		type: "hockey",
		width: 550,
		height: 240,
		kickOffRadius: 80,
		cornerRadius: 0
	},
	vertexes: [{ x: -550, y: 240, trait: "ballArea" }, { x: -550, y: 80, trait: "ballArea" }, { x: -550, y: -80, trait: "ballArea" }, { x: -550, y: -240, trait: "ballArea" }, { x: 550, y: 240, trait: "ballArea" }, { x: 550, y: 80, trait: "ballArea" }, { x: 550, y: -80, trait: "ballArea" }, { x: 550, y: -240, trait: "ballArea" }, { x: 0, y: 270, trait: "kickOffBarrier" }, { x: 0, y: 80, trait: "kickOffBarrier" }, { x: 0, y: -80, trait: "kickOffBarrier" }, { x: 0, y: -270, trait: "kickOffBarrier" }, { x: -560, y: -80, trait: "goalNet" }, { x: -580, y: -60, trait: "goalNet" }, { x: -580, y: 60, trait: "goalNet" }, { x: -560, y: 80, trait: "goalNet" }, { x: 560, y: -80, trait: "goalNet" }, { x: 580, y: -60, trait: "goalNet" }, { x: 580, y: 60, trait: "goalNet" }, { x: 560, y: 80, trait: "goalNet" }],
	segments: [{ v0: 0, v1: 1, trait: "ballArea" }, { v0: 2, v1: 3, trait: "ballArea" }, { v0: 4, v1: 5, trait: "ballArea" }, { v0: 6, v1: 7, trait: "ballArea" }, { v0: 12, v1: 13, trait: "goalNet", curve: -90 }, { v0: 13, v1: 14, trait: "goalNet" }, { v0: 14, v1: 15, trait: "goalNet", curve: -90 }, { v0: 16, v1: 17, trait: "goalNet", curve: 90 }, { v0: 17, v1: 18, trait: "goalNet" }, { v0: 18, v1: 19, trait: "goalNet", curve: 90 }, { v0: 8, v1: 9, trait: "kickOffBarrier" }, {
		v0: 9,
		v1: 10,
		trait: "kickOffBarrier",
		curve: 180,
		cGroup: ["blueKO"]
	}, {
		v0: 9,
		v1: 10,
		trait: "kickOffBarrier",
		curve: -180,
		cGroup: ["redKO"]
	}, { v0: 10, v1: 11, trait: "kickOffBarrier" }],
	goals: [{ p0: [-550, 80], p1: [-550, -80], team: "red" }, { p0: [550, 80], p1: [550, -80], team: "blue" }],
	discs: [{ pos: [-550, 80], trait: "goalPost", color: "FFCCCC" }, { pos: [-550, -80], trait: "goalPost", color: "FFCCCC" }, { pos: [550, 80], trait: "goalPost", color: "CCCCFF" }, { pos: [550, -80], trait: "goalPost", color: "CCCCFF" }],
	planes: [{ normal: [0, 1], dist: -240, trait: "ballArea" }, { normal: [0, -1], dist: -240, trait: "ballArea" }, { normal: [0, 1], dist: -540, bCoef: 0.1 }, { normal: [0, -1], dist: -540, bCoef: 0.1 }, { normal: [1, 0], dist: -900, bCoef: 0.1 }, { normal: [-1, 0], dist: -900, bCoef: 0.1 }],
	traits: {
		cornerflag: {
			radius: 3,
			invMass: 0,
			bCoef: 0.5,
			color: "FFFF00",
			cGroup: [""]
		},
		ballArea: { vis: false, bCoef: 1, cMask: ["ball"] },
		goalPost: { radius: 8, invMass: 0, bCoef: 0.5 },
		goalNet: { vis: true, bCoef: 0.1, cMask: ["ball"] },
		kickOffBarrier: {
			vis: false,
			bCoef: 0.1,
			cGroup: ["redKO", "blueKO"],
			cMask: ["red", "blue"]
		}
	},
	playerPhysics: {
		bCoef: 1.5,
		invMass: 0.5,
		damping: 0.9995,
		acceleration: 0.025,
		kickingAcceleration: 0.0175,
		kickingDamping: 0.9995,
		kickStrength: 5
	},
	ballPhysics: {
		radius: 10,
		bCoef: 0.5,
		invMass: 1,
		damping: 0.99,
		color: "FFFFFF",
		cMask: ["all"],
		cGroup: ["ball"]
	}
};

var lang = navigator.language || navigator.userLanguage || "en";
lang = lang.substring(0, 2);
var translations = {};

var _ = function _(name) {
    for (var _len = arguments.length, variables = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        variables[_key - 1] = arguments[_key];
    }

    if (translations[name] !== undefined) {
        if (translations[name][lang]) {
            var str = translations[name][lang];
            if (variables) {
                str = voca.sprintf.apply(voca, [str].concat(variables));
            }
            return str;
        }
    }

    if (variables) {
        name = voca.sprintf.apply(voca, [name].concat(variables));
    }
    return name;
};

var Afk = function (_Command) {
	inherits(Afk, _Command);

	function Afk(room) {
		classCallCheck(this, Afk);

		var _this = possibleConstructorReturn(this, (Afk.__proto__ || Object.getPrototypeOf(Afk)).call(this, room, {
			"!afk": function afk(player) {
				return _this.toggleAfk(player);
			},
			"!afks": function afks(player) {
				return _this.listAfks(player);
			}
		}));

		_this.toggleAfk = function (player) {
			if (has(_this.afks, "[" + player.name + "]")) {
				delete _this.afks[player.name];
				_this.room.sendChat(_("Player %s has comeback", player.name));
			} else {
				set(_this.afks, "[" + player.name + "]", true);
				_this.room.sendChat(_("Player %s is now AFK", player.name));
			}
			return false;
		};

		_this.listAfks = function () {
			var players = map(_this.afks, function (val, key) {
				return key;
			}).join(", ");
			if (players.length == 0) {
				_this.room.sendChat(_("There are no players AFK"));
			} else {
				_this.room.sendChat(_("Next players are AFK: %s", players));
			}
			return true;
		};

		_this.afks = {};
		return _this;
	}

	return Afk;
}(Command);

var Ban = function (_Command) {
	inherits(Ban, _Command);

	function Ban(room) {
		var votesToBan = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
		var excludedPlayers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
		var banAdmins = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
		classCallCheck(this, Ban);

		var _this = possibleConstructorReturn(this, (Ban.__proto__ || Object.getPrototypeOf(Ban)).call(this, room, {
			"!ban": function ban(player, message) {
				_this.vote(player.name, message);
			},
			"!cleanBans": function cleanBans(player, message) {
				if (!player.admin) return;
				_this.reset();
				_this.room.clearBans();
				_this.room.sendChat(_("Banned users has been cleared."));
			}
		}));

		_this.vote = function (player, playerToBeBanned) {

			var players = _this.room.getPlayerList();
			var found = find(players, { name: playerToBeBanned });

			if (!found) {
				_this.room.sendChat(_("There is no player with the specified nick name"));
				return;
			}

			if (found.admin && !_this.banAdmins) {
				_this.room.sendChat(_("You can't ban an admin"));
				return;
			}

			set(_this.votes, "[" + _this.encode(playerToBeBanned) + "].votes[" + _this.encode(player), true);

			var votes = _this.countVotes(playerToBeBanned);

			if (votes >= _this.votesToBan) {
				_this.room.kickPlayer(_this.getPlayerId(playerToBeBanned), _("Banned in democracy"), true);
			} else {
				if (player === playerToBeBanned) _this.room.sendChat(_("Yes, you can also vote by yourself \uD83E\uDD26\uD83C\uDFFB\u200D\u2642\uFE0F"));
				_this.room.sendChat(_("Vote saved. Player %s has %d ban votes.\nYou need %d votes to ban the player.", playerToBeBanned, _this.countVotes(playerToBeBanned), _this.votesToBan));
			}
		};

		_this.removeVotesFromPlayer = function (leavingPlayer) {
			if (has(_this.votes, "[" + _this.encode(leavingPlayer.name) + "]")) delete _this.votes[_this.encode(leavingPlayer.name)];

			forEach(_this.votes, function (playerInfo) {
				if (has(playerInfo, "votes[" + _this.encode(leavingPlayer.name) + "]")) delete playerInfo.votes[_this.encode(leavingPlayer.name)];
			});
		};

		_this.encode = function (nick) {
			return btoa("nick-" + nick);
		};

		_this.decode = function (str) {
			var nick = atob(str);
			return nick.replace("nick-", "");
		};

		_this.reset = function () {
			_this.votes = {};
		};

		_this.getPlayerId = function (nick) {
			var players = _this.room.getPlayerList();
			var found = find(players, { name: nick });
			return get(found, "id");
		};

		_this.countVotes = function (player) {
			return size(get(_this.votes, "[" + _this.encode(player) + "].votes", {}));
		};

		_this.banAdmins = banAdmins;
		_this.excludedPlayers = excludedPlayers;
		_this.votesToBan = votesToBan;
		_this.room.addEventListener("onPlayerLeave", _this.removeVotesFromPlayer);
		_this.votes = {};
		return _this;
	}

	return Ban;
}(Command);

var _colors = {
	AR: [90, 0xd4e05c, [0x11a0e8, 0xffffff, 0x11a0e8]],
	GR: [90, 0x000000, [0x000000, 0xff0000, 0xffff00]],
	AU: [90, 0x579fcf, [0xff0000, 0xffffff, 0xff0000]],
	BO: [90, 0x000000, [0xff0000, 0xffff00, 0x32cd32]],
	BE: [0, 0x00009c, [0x000000, 0xffff00, 0xff0000]],
	BR: [0, 0x007a08, [0xe6d647]],
	CA: [0, 0x000000, [0x3f8541, 0xd90007, 0xe3c634]],
	CL: [90, 0x000000, [0xffffff, 0xff0000, 0xff0000]],
	CO: [90, 0x000000, [0xffe712]],
	ES: [90, 0x000000, [0xff0000, 0xffff00, 0xff0000]],
	FR: [0, 0x000000, [0x4d4dff, 0xffffff, 0xff0000]],
	IT: [0, 0x000000, [0x238e23, 0xffffff, 0xff0000]],
	NG: [180, 0x000000, [0x04b404, 0xffffff, 0x04b404]],
	PR: [60, 0x000000, [0xff0000, 0xffffff, 0xff0000]],
	UR: [0, 0x000000, [0x87cefa, 0x87cefa, 0x87cefa]],
	RU: [0, 0xdbfafa, [0x1100fc, 0xf5ec00, 0xff0000]],
	Barcelona: [180, 0xcde819, [0x031d3e, 0xa71030, 0x031d3e]],
	Real: [90, 0x000000, [0xffffff]],
	Inter: [180, 0xffffff, [0x080470, 0x000000, 0x080470]],
	Juve: [180, 0xffffff, [0xffffff, 0x000000, 0xffffff]],
	MCity: [90, 0xffffff, [0x29bfff]],
	Arsenal: [180, 0xffffff, [0xf7f7f7, 0xf20505, 0xffffff]],
	Bayer: [360, 0xfadd23, [0xff0000]],
	U: [180, 0xfcfcfc, [0x302bb5]],
	Colo: [90, 0x000000, [0xffffff]]
};

var Colors = function (_Command) {
	inherits(Colors, _Command);

	function Colors(room) {
		classCallCheck(this, Colors);
		return possibleConstructorReturn(this, (Colors.__proto__ || Object.getPrototypeOf(Colors)).call(this, room, {
			"!colors": function colors(player, message) {
				if (message === "ls") {
					room.sendChat(_("Available colors:") + " " + map(_colors, function (c, k) {
						return k;
					}).join(", "));
					return;
				}

				if (_colors[message]) {
					room.setTeamColors(player.team, _colors[message][0], _colors[message][1], _colors[message][2]);
				}
			}
		}));
	}

	return Colors;
}(Command);

var BotBehaviors = function BotBehaviors(room, settings) {
	classCallCheck(this, BotBehaviors);

	this.room = room;
};

var FloodProtection = function FloodProtection(room) {
	var _this = this;

	var floodLimit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
	var ban = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	classCallCheck(this, FloodProtection);

	this.detectFlood = function (player, message) {
		/*Run this async*/
		setTimeout(function () {
			var messages = get(_this.messages, "[" + player.name + "].messages", []);
			if (messages.length >= _this.floodLimit) {
				messages = messages.slice(0, _this.floodLimit);
			}
			messages.unshift({ text: message, time: new Date().valueOf() });
			set(_this.messages, "[" + player.name + "].messages", messages);
			if (messages.length < _this.floodLimit) return;
			for (var i = 1; i < messages.length; i++) {
				if (messages[i].text != messages[i - 1].text) return;
			}
			_this.room.kickPlayer(player.id, "Spam detected", _this.ban);
		}, 1);
	};

	this.room = room;
	this.ban = ban;
	this.floodLimit = floodLimit;
	this.messages = {};
	this.room.addEventListener("onPlayerChat", this.detectFlood);
};

var Stats = function () {
	function Stats(room) {
		var _this = this;

		classCallCheck(this, Stats);

		this.showScorers = function () {
			var ordered = filter(orderBy(_this.goalsRegistry, "goals", "desc"), function (player) {
				return player.goals !== undefined;
			});
			for (var i = 0; i < 3; i++) {
				if (!ordered[i]) break;
				_this.room.sendChat(_("%d\xBA.- %d goals - %s", i + 1, ordered[i].goals, ordered[i].name));
			}
		};

		this.showOwnScorers = function () {
			var ordered = filter(orderBy(_this.goalsRegistry, "ownGoals", "desc"), function (player) {
				return player.ownGoals !== undefined;
			});
			for (var i = 0; i < 3; i++) {
				if (!ordered[i]) break;
				_this.room.sendChat(_("%d\xBA.- %d own goals - %s", i + 1, ordered[i].ownGoals, ordered[i].name));
			}
		};

		this.showPlayerStats = function (_ref) {
			var name = _ref.name;

			var goals = get(_this.goalsRegistry, name + ".goals", 0);
			var ownGoals = get(_this.goalsRegistry, name + ".ownGoals", 0);
			_this.room.sendChat(_("%s has %d goals", name, goals));
			_this.room.sendChat(_("%s has %d own goals", name, ownGoals));
		};

		this.saveLastKick = function (player) {
			_this.lastKick = player;
		};

		this.onTeamGoal = function (teamId) {
			if (!_this.lastKick) {
				_this.room.sendChat(_("Goal!!!"));
				return;
			}

			if (_this.lastKick.team === teamId) {
				_this.room.sendChat(_("Goal from player %s!!!", _this.lastKick.name));
				var goals = get(_this.goalsRegistry, _this.lastKick.name + ".goals", 0);
				set(_this.goalsRegistry, _this.lastKick.name + ".goals", ++goals);
				_this.room.sendChat(_("%s has %d goals.", _this.lastKick.name, goals));
			} else {
				_this.room.sendChat(_("Own goal from player %s \uD83D\uDE06\uD83E\uDD26\uD83C\uDFFB\u200D\u2642\uFE0F", _this.lastKick.name));
				var ownGoals = get(_this.goalsRegistry, _this.lastKick.name + ".ownGoals", 0);
				set(_this.goalsRegistry, _this.lastKick.name + ".ownGoals", ++ownGoals);
				_this.room.sendChat(_("%s has %d own goals.", _this.lastKick.name, ownGoals));
			}
			set(_this.goalsRegistry, _this.lastKick.name + ".name", _this.lastKick.name);
			_this.resetLastKick();

			//run this async
			setTimeout(function () {
				_this.saveStats();
			}, 0);
		};

		this.resetLastKick = function () {
			_this.lastKick = false;
		};

		this.room = room;
		this.lastKick = false;
		this.goalsRegistry = {};
		this.loadStats();
		room.addEventListener("onPlayerBallKick", this.saveLastKick);
		room.addEventListener("onTeamGoal", this.onTeamGoal);
		room.addEventListener("onGameStart", this.resetLastKick);
		room.addEventListener("onGameStop", this.resetLastKick);
		room.commandsManager.add("!misgoles", this.showPlayerStats);
		room.commandsManager.add("!goleadores", this.showScorers);
		room.commandsManager.add("!falleros", this.showOwnScorers);
	}

	createClass(Stats, [{
		key: "saveStats",
		value: function saveStats() {
			localStorage.setItem(get(this.room, "dbPrefix", "") + "__goals__registry__", JSON.stringify(this.goalsRegistry));
		}
	}, {
		key: "loadStats",
		value: function loadStats() {
			var registry = localStorage.getItem(get(this.room, "dbPrefix", "") + "__goals__registry__");
			if (!registry) {
				this.goalsRegistry = {};
				return;
			}
			this.goalsRegistry = JSON.parse(registry);
		}
	}]);
	return Stats;
}();

export { Bot, Command, CommandsManager, Room, spaceBounce as SpaceBounce, Afk, Ban, Colors, FloodProtection, Stats, BotBehaviors };
