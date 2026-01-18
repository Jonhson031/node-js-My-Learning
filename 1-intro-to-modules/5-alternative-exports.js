// ? We have diffrent alternatives to export modules
module.exports.items = ['item1', 'item2']; // not the best way to export
const person = {
    name: 'Bob',
}
module.exports.singlePerson = person;
