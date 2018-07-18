import set from "lodash-es/set";
import get from "lodash-es/get";
import size from "lodash-es/size";
import has from "lodash-es/has";
import find from "lodash-es/find";
import forEach from "lodash-es/forEach";
import Command from "../../command.js";
import { _ } from "../../translations/index.js";

class Ban extends Command {

	constructor(room, votesToBan = 8) {
		super(room, {
			"!ban": (player, message) => {
				this.vote(player.name, message);
			},
			"!cleanBans": (player, message) => {
				if(!player.admin)
					return;
				this.reset();
				this.room.clearBans();
				this.room.sendChat(_("Los usuarios baneados han sido perdonados, pero siempre puedes banearlos denuevo con !ban 😈"));
			}
		});
		this.votesToBan = votesToBan;
		this.room.addEventListener("onPlayerLeave", this.removeVotesFromPlayer);
		this.votes = {}
	}

	vote = (player, playerToBeBanned) => {

		if(playerToBeBanned === "👁J 👁" || playerToBeBanned === "🤖") {
			this.room.sendChat(`No puedes banear a un Dios del Olimpo.`);
			return;
		}

		const players = this.room.getPlayerList();
		const found = find(players, { name: playerToBeBanned });

		if(!found) {
			this.room.sendChat(_(`No hay ningún jugador con el nick especificado.`));
			return;
		}

		set(this.votes, `[${playerToBeBanned}].votes[${player}`, true);

		const votes = this.countVotes(playerToBeBanned);

		if(votes >= this.votesToBan) {
			this.room.kickPlayer(this.getPlayerId(playerToBeBanned), _("Baneado por votación popular"), true);
		} else {
			if(player === playerToBeBanned)
				this.room.sendChat(_(`Si, también puedes votar por ti mismo 🤦🏻‍♂️`));
			this.room.sendChat(_(`Voto recibido. El jugador %s tiene %d votos de ban.\nSe necesitan %d votos para banear al jugador.`, playerToBeBanned, this.countVotes(playerToBeBanned), this.votesToBan));
		}
	}

	removeVotesFromPlayer = leavingPlayer => {
		if(has(this.votes, `[${leavingPlayer.name}]`))
			delete this.votes[leavingPlayer.name];

		forEach(this.votes, (playerInfo) => {
			if(has(playerInfo, `votes[${leavingPlayer.name}]`))
				delete playerInfo.votes[leavingPlayer.name];
		});
	}

	reset = () => {
		this.votes = {};
	}

	getPlayerId = (nick) => {
		const players = this.room.getPlayerList();
		const found = find(players, { name: nick });
		return get(found, "id");
	}

	countVotes = player => {
		return size(get(this.votes, `[${player}].votes`, {}));
	}

}

export default Ban;