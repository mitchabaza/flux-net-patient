'use strict';

function createStoreMixin(store) {
    var storeMixin = {
        getInitialState: function() {
            return this.getStateFromStores(this.props);
        },

        componentDidMount: function() {

            store.addChangeListener(this.handleStoresChanged);
            this.setState(this.getStateFromStores(this.props));
        },
        componentWillUnmount: function() {

            store.removeChangeListener(this.handleStoresChanged);
        },
        handleStoresChanged: function() {
            if (this.isMounted()) {
                this.setState(this.getStateFromStores());
            }
        }
    };
    return storeMixin;
}

module.exports = createStoreMixin;