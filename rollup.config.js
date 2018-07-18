import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import pkg from "./package.json";

export default [
	{
		input: "src/index.js",
		output: [
			{ file: pkg.main, format: "cjs" },
			{ file: pkg.module, format: "es" }
		],
		external: [
			"voca",
			"lodash-es/map",
			"lodash-es/filter",
			"lodash-es/forEach",
			"lodash-es/get",
			"lodash-es/set",
			"lodash-es/has",
			"lodash-es/find",
			"lodash-es/orderBy",
			"lodash-es/size"
		],
		plugins: [
			json(),
			babel({
				exclude: "node_modules/**",
				presets: [
					[
						"env",
						{
							modules: false
						}
					]
				],
				plugins: [
					"external-helpers",
					"transform-class-properties",
					"transform-object-rest-spread"
				]
			})
		]
	}
];
