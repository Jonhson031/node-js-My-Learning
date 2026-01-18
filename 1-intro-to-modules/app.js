// GLOBALS - NO WINDOW !!!!

// __dirname - path to current directory
// __filename - file name
// require - function to use modules (CommonJS)
// module - info about current module (file)
// process - info about environment where the program is being executed

// ? Introduction to modules
// CommonJS, every file is module (by default)
// Modules Encapsulated Code (only share minimum)

// Node.js originally used CommonJS, where we use module.exports and require() instead of import and export in Vanilla JS
const {peter, john} = require('./3-names.js')
const sayHi = require('./4-functions.js')
const data = require('./5-alternative-exports.js');
// const {num1, num2, addValues} = require('./6-mind-grenade.js');

// ? Side-effect imports.
require('./6-mind-grenade.js'); // Runs the code without exporting any module

sayHi('susan')
sayHi(john)
sayHi(peter)
sayHi(data.singlePerson.name);
