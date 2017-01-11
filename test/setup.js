const mockery = require('mockery');

const React = require('react');
const enzyme = require('enzyme');
const chai = require('chai');

const gbs = {
  c: {}, f: {}, l: {}, s: {}, t: {}, w: {}
};

const shallow = enzyme.shallow;

global.expect = chai.expect;
global.assert = chai.assert;

global.mockComp = (Comp, props = {}) => shallow(<Comp { ...Object.assign(props, { gbs }) } />);

mockery.enable({
  warnOnReplace: false,
  warnOnUnregistered: false
});

mockery.registerMock('react-native-router-flux', { Actions: {} });
