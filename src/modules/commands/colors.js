import map from "lodash-es/map";
import Command from "../../command.js";
import { _ } from "../../translations/index.js";

const colors = {
	AR: [90, 0xd4e05c, [0x11a0e8, 0xffffff, 0x11a0e8]],
	GR: [90, 0x000000, [0x000000, 0xff0000, 0xffff00]],
	AU: [90, 0x579fcf, [0xff0000, 0xffffff, 0xff0000]],
	BO: [90, 0x000000, [0xff0000, 0xffff00, 0x32cd32]],
	BE: [0, 0x00009c, [0x000000, 0xffff00, 0xff0000]],
	BR: [0, 0x007a08, [0xe6d647]],
	CA: [0, 0x000000, [0x3f8541, 0xd90007, 0xe3c634]],
	CL: [90, 0x000000, [0xffffff, 0xff0000, 0xff0000]],
	CO: [90, 0x000000, [0xffe712]],
	ES: [90, 0x000000, [0xff0000, 0xffff00, 0xff0000]],
	FR: [0, 0x000000, [0x4d4dff, 0xffffff, 0xff0000]],
	IT: [0, 0x000000, [0x238e23, 0xffffff, 0xff0000]],
	NG: [180, 0x000000, [0x04b404, 0xffffff, 0x04b404]],
	PR: [60, 0x000000, [0xff0000, 0xffffff, 0xff0000]],
	UR: [0, 0x000000, [0x87cefa, 0x87cefa, 0x87cefa]],
	RU: [0, 0xdbfafa, [0x1100fc, 0xf5ec00, 0xff0000]],
	Barcelona: [180, 0xcde819, [0x031d3e, 0xa71030, 0x031d3e]],
	Real: [90, 0x000000, [0xffffff]],
	Inter: [180, 0xffffff, [0x080470, 0x000000, 0x080470]],
	Juve: [180, 0xffffff, [0xffffff, 0x000000, 0xffffff]],
	MCity: [90, 0xffffff, [0x29bfff]],
	Arsenal: [180, 0xffffff, [0xf7f7f7, 0xf20505, 0xffffff]],
	Bayer: [360, 0xfadd23, [0xff0000]],
	U: [180, 0xfcfcfc, [0x302bb5]],
	Colo: [90, 0x000000, [0xffffff]]
};

class Colors extends Command {
	constructor(room) {
		super(room, {
			"!colors": (player, message) => {
				if (message === "ls") {
					room.sendChat(
						_("Available colors:") + " " +
							map(colors, (c, k) => k).join(", ")
					);
					return;
				}

				if (colors[message]) {
					room.setTeamColors(
						player.team,
						colors[message][0],
						colors[message][1],
						colors[message][2]
					);
				}
			}
		});
	}
}

export default Colors;
