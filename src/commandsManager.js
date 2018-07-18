class CommandsManager {
	constructor(room) {
		this.room = room;
		this.commands = {};
		this.room.addEventListener("onPlayerChat", (player, message) => {
			if(!message.startsWith("!"))
				return;
			const command = message.split(" ")[0];
			if(!this.commands[command]) {
				return;
			}
			const args = message.replace(command + " ", "");
			return this.exec(command, player, args);
		});
	}

	add = (command, callback) => {
		this.commands[command] = callback;
	};
	exec = (command, player, args) => {
		if(!this.commands[command]) {
			return;
		}
		return this.commands[command](player, args);
	};
}

export default CommandsManager;