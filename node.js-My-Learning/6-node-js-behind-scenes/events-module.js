const EventEmitter = require('events');

const emitter = new EventEmitter();

// How it works behind the scenes:
class newSale extends EventEmitter{
    constructor(){
        super();
    }
}


// on - listens to event
// emit - emit an event

// Listen to event
// Events runs synchronosically (Order matters)

emitter.on('newSale', () => {
    console.log('New Sale');
})

emitter.on('newSale', () => {
    console.log('Customer name: Maks');
})

emitter.emit('newSale');

////
emitter.on('response', (name, id) => {
    console.log(`Data received user ${name} with id of ${id}`);
})
emitter.on('response', () => {
    console.log(`Some other logic here `);
})

// Emit the event
emitter.emit('response', 'john', 54);

// Lister to event only once
emitter.once('userJoined', (user, id) => {
    console.log(`${user} with id: ${id} has joined`);
})
emitter.emit('userJoined', 'Joe', 2451);
emitter.emit('userJoined', 'Doe', 1342); // gonna be ignored


// Creating server using Event Emitter API
const http = require('http');
const server = http.createServer();
// Emits request event

server.on('request', (req, res) => {
    res.end('Welcome!');
})
server.listen(5000)