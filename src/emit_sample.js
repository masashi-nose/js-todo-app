import { EventEmitter } from './EventEmitter.js'

const event = new EventEmitter();
event.addEventListner('test-event', () => console.log('One!'));
event.addEventListner('test-event', () => console.log('Two!'));

event.emit('test-event');