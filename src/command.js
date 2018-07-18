class Command {

	constructor(roomObject, commands = {}) {
		this.room = roomObject;
		this.commands = commands;
		this.addCommands();
	}

	addCommands = () => {
		for (let command in this.commands) {
			if (this.commands.hasOwnProperty(command)) {
				this.room.commandsManager.add(command, this.commands[command]);
			}
		}
	};

	addCommand = (command, func) => {
		this.commands[command] = func;
		this.room.commandsManager.add(command, func);
	};
}

export default Command;