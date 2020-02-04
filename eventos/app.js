'use strict'

var EventEmitter = require('events');

class Cao extends EventEmitter{
  latir(){
    console.log('Au, au!');
  }
}

var Rex = new Cao();

Rex.once('pessoa_no_portão', Rex.latir);

Rex.emit('pessoa_no_portao');
Rex.emit('pessoa_no_portao');
Rex.emit('pessoa_no_portao');