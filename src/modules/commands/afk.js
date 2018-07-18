import has from "lodash-es/has";
import set from "lodash-es/set";
import map from "lodash-es/map";
import Command from "../../command.js";
import { _ } from "../../translations/index.js";

class Afk extends Command {
	constructor(room) {
		super(room, {
			"!afk": (player) => this.toggleAfk(player),
			"!afks": (player) => this.listAfks(player)
		});
		this.afks = {};
	}

	toggleAfk = player => {
		if(has(this.afks, `[${player.name}]`)) {
			delete this.afks[player.name];
			this.room.sendChat(_(`Player %s has comeback`, player.name));
		} else {
			set(this.afks, `[${player.name}]`, true);
			this.room.sendChat(_(`Player %s is now AFK`, player.name));
		}
		return false;
	};

	listAfks = () => {
		const players = map(this.afks, (val, key) => key).join(", ");
		if(players.length == 0) {
			this.room.sendChat(_(`There are no players AFK`));
		} else {
			this.room.sendChat(_(`Next players are AFK: %s`, players));
		}
		return true;
	};

}

export default Afk;
