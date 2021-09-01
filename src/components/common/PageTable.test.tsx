import React from 'react';
import { shallow } from 'enzyme';
import PageTable from './PageTable'
 
describe('PageTable component', () => {
  const head = <tr></tr>;
  
  describe('when provided with an empty array of rows', () => {
    it('contains an table Head and empty body', () => {
      const table = shallow(<PageTable tableRows={[]} tableHead={head}/>);
      expect(table.find('tr').length).toEqual(1);
    })
  });
 
  describe('when provided with an array of items', () => {
    it('contains a matching number of <li> elements', () => {
      const items = [{id: 0, name: "first", count: 6}, {id: 1, name: "second", count: 8}]
      
      const rows = items.map(i => (
      <tr key={i.id}>
        <td>{i.id + 1}</td>
        <td>{i.name}</td>
        <td>{i.count}</td>
      </tr>));

      const toDoList = shallow(<PageTable tableHead={head} tableRows={rows}/>);
      expect(toDoList.find('tr').length).toEqual(rows.length + 1);
    })
  });
});