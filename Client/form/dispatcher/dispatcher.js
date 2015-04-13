/** @flow */

'use strict';

var EventEmitter = require('events').EventEmitter;

var EVENT = 'dispatch';
var emitter = new EventEmitter();

var Dispatcher = {
    dispatch: function dispatch(event) {
        emitter.emit(EVENT, event);
    },
    
    subscribe: function subscribe(fn) {
        emitter.on(EVENT, fn);
        return {
            remove: function remove() {
                emitter.removeListener(EVENT, fn);
            }
        };
    }
};

module.exports = Dispatcher;