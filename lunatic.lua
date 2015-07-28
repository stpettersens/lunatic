-- Lunatic
-- Documentation generator for Lua code written in Lua.
-- Copyright 2015 Sam Saint-Pettersen
-- Released under the MIT License.

--- Lunatic 
-- @copyright 2015 Sam Saint-Pettersen

Lunatic = {}
Lunatic.__index = Lunatic

--- Lunatic implements the documentation generator itself.
-- @constructor
function Lunatic.create()
	local self = setmetatable({}, Lunatic)
	self.docstrings = {}
	return self
end

--- Parse a Lua file and document it.
-- @param [string] file Lua file to parse and document.
function Lunatic:parse(file)
	local f = assert(io.open(file, 'r'))
	while true do
		line = f:read()
		if line == nil then 
			break 
		end
		if string.find(line, '---') then
			table.insert(self.docstrings, line)
		end
	end
	for k,v in pairs(self.docstrings) do
		print(v)
	end
end

lunatic = Lunatic.create()
lunatic:parse('lunatic.lua')
