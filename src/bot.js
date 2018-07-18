import Room from "./room.js";

class Bot {
	constructor(settings = {}) {
		const {
			scoreLimit = 3,
			timeLimit = 3,
			teamsLock = true,
			customStadium = false,
			dbPrefix = "",
			...rest
		} = settings;

		const room = window.HBInit(rest);
		this.room = new Room(room, settings);
		if (customStadium)
			this.room.setCustomStadium(JSON.stringify(customStadium));
		this.room.setScoreLimit(scoreLimit);
		this.room.setTimeLimit(timeLimit);
		this.room.setTeamsLock(teamsLock);
	}

	getRoom() {
		return this.room;
	}
}

export default Bot;
