jest.dontMock('../components/Input.jsx');

var React = require('react/addons'),  
    Input = require('../components/Input.jsx'),
    TestUtils = React.addons.TestUtils;

describe('Checkout', function () {
    it('renders each item as a li', function () {
        
        var element = TestUtils.renderIntoDocument(<Input/>);
        var items = TestUtils.scryRenderedDOMComponentsWithTag(element , 'input');
        
        expect(items.length).toEqual(2);

    });
 
});