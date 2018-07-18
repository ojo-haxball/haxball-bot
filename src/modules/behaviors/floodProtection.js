import get from "lodash-es/get";
import set from "lodash-es/set";
import { _ } from "../../translations/index.js";

class FloodProtection {

	constructor(room, floodLimit = 10, ban = false) {
		this.room = room;
		this.ban = ban;
		this.floodLimit = floodLimit;
		this.messages = {};
		this.room.addEventListener("onPlayerChat", this.detectFlood);
	}

	detectFlood = (player, message) => {
		/*Run this async*/
		setTimeout(() => {
			let messages = get(this.messages, `[${player.name}].messages`, []);
			if(messages.length >= this.floodLimit) {
				messages = messages.slice(0,this.floodLimit);
			}
			messages.unshift({ text: message, time: new Date().valueOf()});
			set(this.messages, `[${player.name}].messages`, messages);
			if(messages.length < this.floodLimit)
				return;
			for(let i = 1; i<messages.length; i++) {
				if(messages[i].text != messages[i-1].text)
					return;
			}
			this.room.kickPlayer(player.id, "Spam detected", this.ban);
		}, 1);
	}
}

export default FloodProtection;