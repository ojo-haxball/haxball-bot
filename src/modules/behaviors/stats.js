import get from "lodash-es/get";
import set from "lodash-es/set";
import orderBy from "lodash-es/orderBy";
import filter from "lodash-es/filter";
import { _ } from "../../translations/index.js";

class Stats {

	constructor(room) {
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

	showScorers = () => {
		const ordered = filter(orderBy(this.goalsRegistry, "goals", "desc"), player => player.goals !== undefined);
		for(let i = 0; i<3; i++) {
			if(!ordered[i])
				break;
			this.room.sendChat(_(`%dº.- %d goals - %s`, i+1, ordered[i].goals, ordered[i].name));
		}
	}

	showOwnScorers = () => {
		const ordered = filter(orderBy(this.goalsRegistry, "ownGoals", "desc"), player => player.ownGoals !== undefined); 
		for(let i = 0; i<3; i++) {
			if(!ordered[i])
				break;
			this.room.sendChat(_(`%dº.- %d own goals - %s`, i+1, ordered[i].ownGoals, ordered[i].name));
		}
	}

	showPlayerStats = ({ name }) => {
		let goals = get(this.goalsRegistry, `${name}.goals`, 0);
		let ownGoals = get(this.goalsRegistry, `${name}.ownGoals`, 0);
		this.room.sendChat(_(`%s has %d goals`, name, goals));
		this.room.sendChat(_(`%s has %d own goals`, name, ownGoals));
	}

	saveLastKick = player => {
		this.lastKick = player;
	}

	onTeamGoal = teamId => {
		if(!this.lastKick) {
			this.room.sendChat(_(`Goal!!!`));
			return;
		}

		if(this.lastKick.team === teamId) {
			this.room.sendChat(_(`Goal from player %s!!!`, this.lastKick.name));
			let goals = get(this.goalsRegistry, `${this.lastKick.name}.goals`, 0);
			set(this.goalsRegistry, `${this.lastKick.name}.goals`, ++goals);
			this.room.sendChat(_(`%s has %d goals.`, this.lastKick.name, goals));
		} else {
			this.room.sendChat(_(`Own goal from player %s 😆🤦🏻‍♂️`, this.lastKick.name));
			let ownGoals = get(this.goalsRegistry, `${this.lastKick.name}.ownGoals`, 0);
			set(this.goalsRegistry, `${this.lastKick.name}.ownGoals`, ++ownGoals);
			this.room.sendChat(_(`%s has %d own goals.`, this.lastKick.name, ownGoals));
		}
		set(this.goalsRegistry, `${this.lastKick.name}.name`, this.lastKick.name);
		this.resetLastKick();
		
		//run this async
		setTimeout(() => {
			this.saveStats();
		}, 0);
	}

	resetLastKick = () => {
		this.lastKick = false;
	}

	saveStats() {
		localStorage.setItem(this.room.dbPrefix + "__goals__registry__", JSON.stringify(this.goalsRegistry));
	}

	loadStats() {
		const registry = localStorage.getItem(this.room.dbPrefix + "__goals__registry__");
		if(!registry) {
			this.goalsRegistry = {};
			return;
		}
		this.goalsRegistry = JSON.parse(registry);
	}
}

export default Stats;