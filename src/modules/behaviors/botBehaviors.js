import { _ } from "../../translations/index.js";

class BotBehaviors {
	constructor(room, settings) {
		this.room = room;
		this.settings = settings;
		const { lockMap = true } = settings;

		if(lockMap)
			this.lockMap();
	}


	lockMap = () => {
		//call this 5 seconds after room loads
		setTimeout(() => {
			this.room.addEventListener("onStadiumChange", (newStadiumName) => {
				const { customStadium, defaultStadium } = this.room.settings;

				let stadium;

				if(customStadium)
					stadium = customStadium.name;
				else
					stadium = defaultStadium;

				console.log(stadium, newStadiumName);

				if(newStadiumName !== stadium) {
					if(customStadium) {
						this.room.setCustomStadium(JSON.stringify(customStadium));
					} else {
						this.room.setDefaultStadium(stadium);
					}
				}
			});
		}, 5000);
	}
}


export default BotBehaviors;