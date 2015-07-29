/*
	Lunatic
	Documentation generator for Lua code.
	Copyright 2015 Sam Saint-Petersen
	Released under the MIT License.
*/
import Lunatic = require('./lunatic-lib');
var lunatic = new Lunatic();
lunatic.parse(process.argv[2]);
