import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { CrosswordGrid } from '../src/components';


describe('the environment', () => {
  it('works, hopefully', () => {
    expect(true).to.be.true;
  });
});

// doesn't work
// describe('CrosswordGrid', () => {
//   it('should render something', () => {
//     const wrapper = shallow(<CrosswordGrid/>);
//     expect(wrapper.render()).to.not.equal(null);
//   });
// });