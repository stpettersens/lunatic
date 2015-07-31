/*
    Lunatic
    Documentation generator for Lua code.
    Copyright 2015 Sam Saint-Petersen
    Released under the MIT License.
*/
/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/chalk/chalk.d.ts" />
var fs = require('fs');
var Lunatic = (function () {
    function Lunatic() {
    }
    Lunatic.prototype.parse = function (file) {
        this.descs = new Array();
        this.methods = new Array();
        this.docstrings = new Array();
        this.signatures = new Array();
        var data = fs.readFileSync(file, 'utf8');
        var lines = data.toString().split('\n');
        for (var i = 0; i < lines.length; i++) {
            if (lines[i] != '') {
                var pattn = /^-/;
                if (pattn.test(lines[i])) {
                    this.docstrings.push(lines[i]);
                }
                pattn = /^function/;
                if (pattn.test(lines[i])) {
                    var matches = lines[i].match(/(function) ([\.\:\w]+)/);
                    this.signatures.push(matches[2]);
                }
            }
        }
    };
    Lunatic.prototype.tables = function () {
        console.log('Descs:');
        for (var i = 0; i < this.descs.length; i++) {
            console.log(this.descs[i]);
        }
        console.log('\nMethods:');
        for (var i = 0; i < this.methods.length; i++) {
            console.log(this.methods[i]);
        }
        console.log('\nSignatures:');
        for (var i = 0; i < this.signatures.length; i++) {
            console.log(this.signatures[i]);
        }
    };
    return Lunatic;
})();
module.exports = Lunatic;
