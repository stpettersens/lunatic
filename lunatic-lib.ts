/*
	Lunatic
	Documentation generator for Lua code.
	Copyright 2015 Sam Saint-Petersen
	Released under the MIT License.
*/

/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/chalk/chalk.d.ts" />

import fs = require('fs');
import chalk = require('chalk');

class Lunatic {
	private docstrings: string[];
	private signatures: string[];
	private descs: string[];
	private methods: string[];
	private class: string;

	/**
	 * Parse a Lua file and document it.
	 * @param {string} file - Lua file to parse and document.
	*/
	public parse(file: string): void {
		this.descs = new Array<string>();
		this.methods = new Array<string>();
		this.docstrings = new Array<string>();
		this.signatures = new Array<string>();
		var data: any = fs.readFileSync(file, 'utf8');
		var lines: string[] = data.toString().split('\n');
		for(var i: number = 0; i < lines.length; i++) {
			if(lines[i] != '') {
				var pattn: RegExp = /^-/;
				if(pattn.test(lines[i])) {
					this.docstrings.push(lines[i]);
				}
				pattn = /^function/;
				if(pattn.test(lines[i])) {
					var matches: string[] = lines[i].match(/(function) ([\.\:\w]+)/);
					this.signatures.push(matches[2]);
				}
			}
		}
	}

	public tables(): void {
		console.log('Descs:');
		for(var i: number = 0; i < this.descs.length; i++) {
			console.log(this.descs[i]);
		}
		console.log('\nMethods:');
		for(var i: number = 0; i < this.methods.length; i++) {
			console.log(this.methods[i]);
		}
		console.log('\nSignatures:');
		for(var i: number = 0; i < this.signatures.length; i++) {
			console.log(this.signatures[i]);
		}
	}
}
export = Lunatic;
