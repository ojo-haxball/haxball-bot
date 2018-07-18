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
			this.room.sendChat(_(`El jugador %s ha vuelto`, player.name));
		} else {
			set(this.afks, `[${player.name}]`, true);
			this.room.sendChat(_(`El jugador %s está ahora AFK`, player.name));
		}
		return false;
	};

	listAfks = () => {
		const players = map(this.afks, (val, key) => key).join(", ");
		if(players.length == 0) {
			this.room.sendChat(_(`No hay jugadores AFK`));
		} else {
			this.room.sendChat(_(`Los siguientes jugadores están afk: %s`, players));
		}
		return true;
	};

}

export default Afk;
