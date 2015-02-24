jest.dontMock('../modules/ModuleWithProto.js');

var React = require('react/addons'),  
    Input = require('../modules/ModuleWithProto.jsx'),
    TestUtils = React.addons.TestUtils;

describe('square', function () {
    it('renders each item as a li', function () {
        
        
        // you can use `new` keyword
        var s = new Square(5);
        s.area(); // 25
        expect(s.area).toEqual(25);
 
    });
 
});


