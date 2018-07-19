import set from "lodash-es/set";
import get from "lodash-es/get";
import size from "lodash-es/size";
import has from "lodash-es/has";
import find from "lodash-es/find";
import forEach from "lodash-es/forEach";
import Command from "../../command.js";
import { _ } from "../../translations/index.js";

class Ban extends Command {

	constructor(room, votesToBan = 8, excludedPlayers = [], banAdmins = false) {
		super(room, {
			"!ban": (player, message) => {
				this.vote(player.name, message);
			},
			"!cleanBans": (player, message) => {
				if(!player.admin)
					return;
				this.reset();
				this.room.clearBans();
				this.room.sendChat(_("Banned users has been cleared."));
			}
		});
		this.banAdmins = banAdmins;
		this.excludedPlayers = excludedPlayers;
		this.votesToBan = votesToBan;
		this.room.addEventListener("onPlayerLeave", this.removeVotesFromPlayer);
		this.votes = {}
	}

	vote = (player, playerToBeBanned) => {

		const players = this.room.getPlayerList();
		const found = find(players, { name: playerToBeBanned });

		if(!found) {
			this.room.sendChat(_(`There is no player with the specified nick name`));
			return;
		}

		if(found.admin && !this.banAdmins) {
			this.room.sendChat(_(`You can't ban an admin`));
			return;
		}

		set(this.votes, `[${this.encode(playerToBeBanned)}].votes[${this.encode(player)}`, true);

		const votes = this.countVotes(playerToBeBanned);

		if(votes >= this.votesToBan) {
			this.room.kickPlayer(this.getPlayerId(playerToBeBanned), _("Banned in democracy"), true);
		} else {
			if(player === playerToBeBanned)
				this.room.sendChat(_(`Yes, you can also vote by yourself 🤦🏻‍♂️`));
			this.room.sendChat(_(`Vote saved. Player %s has %d ban votes.\nYou need %d votes to ban the player.`, playerToBeBanned, this.countVotes(playerToBeBanned), this.votesToBan));
		}
	}

	removeVotesFromPlayer = leavingPlayer => {
		if(has(this.votes, `[${this.encode(leavingPlayer.name)}]`))
			delete this.votes[this.encode(leavingPlayer.name)];

		forEach(this.votes, (playerInfo) => {
			if(has(playerInfo, `votes[${this.encode(leavingPlayer.name)}]`))
				delete playerInfo.votes[this.encode(leavingPlayer.name)];
		});
	}

	encode = nick => {
		return btoa(unescape(encodeURIComponent("nick-" + nick)));
	}

	decode = str => {
		let nick = decodeURIComponent(escape(atob(str)));
		return nick.replace("nick-", "");
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
		return size(get(this.votes, `[${this.encode(player)}].votes`, {}));
	}

}

export default Ban;