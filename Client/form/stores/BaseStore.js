/** @flow */

var Dispatcher = require('../Dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;


var CHANGE_EVENT = 'change';

class BaseStore {
 

constructor() {
autobind(this);
this._emitter = new EventEmitter();
this.handleDispatch && Dispatcher.register(this.handleDispatch);
}

emitChange(data: Object = {}) {
this._emitter.emit(CHANGE_EVENT,{ store: this});
}

addChangeListener(fn)
    {

this._emitter.on(CHANGE_EVENT, fn);

}

removeChangeListener(fn)
{
this._emitter.removeListener(CHANGE_EVENT, fn);
}

loadCachedData() {
loadCachedData(this);
}

subscribe(
fn: (data: any) => void
): {remove: () => void;} {
this._emitter.on(CHANGE_EVENT, fn);

return {
    remove: () => {
this._emitter.removeListener(CHANGE_EVENT, fn);
}
};
}
}

function loadCachedData(instance) {
if (!isOffline()) {
return;
}

Object.keys(instance).forEach(key => {
var ctor = instance.constructor;
var value = localStorage.getItem(ctor.name + '.' + key);
if (value) {
instance[key] = JSON.parse(value);
}
});
}

function autobind(instance) {
Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).forEach(prop => {
if (
typeof instance[prop] === 'function' &&
/^[A-Za-z]/.test(prop) &&
prop !== 'constructor'
) {
instance[prop] = instance[prop].bind(instance);
instance[prop].store = instance;
}
});
}

module.exports = BaseStore;
