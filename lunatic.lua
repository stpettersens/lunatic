-- Lunatic
-- Documentation generator for Lua code written in Lua.
-- Copyright 2015 Sam Saint-Pettersen
-- Released under the MIT License.

Lunatic = {}
Lunatic.__index = Lunatic

-- ~ Lunatic implements the documentation generator itself.
-- @constructor
function Lunatic.create()
	local self = setmetatable({}, Lunatic)
	self.docstrings = {}
	self.class = ''
	self.signatures = {}
	self.descs = {}
	self.methods = {}
	return self
end

-- ~ Parse a Lua file and document it.
-- @param [string] file Lua file to parse and document.
function Lunatic:parse(file)
	local f = assert(io.open(file, 'r'))
	while true do
		line = f:read()
		if line == nil then 
			break 
		end
		if string.find(line, '^-') then
			table.insert(self.docstrings, line)

		elseif string.find(line, '^function') then
			kw, class, method = line:match('(function) (%w+).(%w+)')
			self.class = class
			table.insert(self.signatures, method)
		end
	end
	for k, v in pairs(self.docstrings) do
		if string.find(v, '--') and string.find(v, '~') then
			v = v:gsub('-- ~', '')
			table.insert(self.descs, v)
		end
		if string.find(v, '@constructor') then
			constructor = v:match('(@%a+)')
			table.insert(self.methods, self.class)

		elseif string.find(v, '@param') then
			param, type, var, desc = v:match('(@%a+) %[(%a+)%] (%a+) (.+)')
			table.insert(self.methods, '(' .. type .. ' ' .. var .. ') : ' .. desc)
		end
	end
end

function Lunatic:tables()
	print('Descs:')
	for k, v in pairs(self.descs) do
		print(v)
	end
	print('\nMethods:')
	for k, v in pairs(self.methods) do
		print(v)
	end
	for k, v in pairs(self.signatures) do
		print(v)
	end
end

lunatic = Lunatic.create()
lunatic:parse('lunatic.lua')
lunatic:tables()
