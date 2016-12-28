require('babel-plugin-module-alias');
const mockery = require('mockery');

const React = require('react');
const enzyme = require('enzyme');
const chai = require('chai');

const shallow = enzyme.shallow;

global.expect = chai.expect;
global.assert = chai.assert;

global.mockComp = (Comp, props) => shallow(<Comp { ...props} />);

mockery.enable({
  warnOnReplace: false,
  warnOnUnregistered: false
});

mockery.registerMock('react-native-router-flux', { Actions: {} });
