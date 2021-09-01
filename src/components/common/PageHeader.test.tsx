import React from 'react';
import { shallow } from 'enzyme';
import PageHeader from './PageHeader';
 
describe('PageHeader component', () => {
  
  const callbackFn = jest.fn();

  const name = "PAGE NAME"
  
  describe('when provided with pageName', () => {
    it('render header with correctly name', () => {
      const header = shallow(<PageHeader pageName={name} showAddModal={callbackFn}/>);
      const pageNameHeader = <h1>{name} List</h1>
      expect(header.contains(pageNameHeader)).toEqual(true);
    })
  });
  
  describe('when the button is clicked', () => {
    it('should call a callback function', () => {
      const header = shallow(<PageHeader pageName={name} showAddModal={callbackFn}/>);
      const button = header.find('Button');
      button.simulate('click');
      expect(callbackFn).toBeCalled();
    });
  });
});