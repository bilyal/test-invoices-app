import React from 'react'
import { CustomerPage } from './CustomerPage';
import { mount } from 'enzyme';

const props = {
  customers: [{
    id: 0,
    name: "John",
    location: "USA",
    phone: "555-555"
  },
  {
    id: 1,
    name: "Alice",
    location: "Canada",
    phone: "337-443"
  },
  {
    id: 2,
    name: "Bob",
    location: "France",
    phone: "324-546"
  }],

  fetchCustomers: jest.fn()
}

describe('Customer page component', () => {
  const container = mount(<CustomerPage {...props} />)

  it("renders", () => { container })

  it("should have page Header with correct name and button", () => {
    const header = container.find('PageHeader');
    expect(header.length).toEqual(1)
    expect(header.prop("pageName")).toEqual("Customer")

    const button = header.find('Button');
    expect(button.length).toEqual(1);
  })

  it("should have table with body rows of Customers", () => {
    const table = container.find('PageTable');
    expect(table.length).toEqual(1);
    expect(table.find('tr').length).toEqual(props.customers.length + 1)
  })

  it("shouldn't render modal windows", () => {
    const editModals = container.find('EditModal');
    const deleteModal = container.find('DeleteModal');
    expect(editModals.length).toEqual(0);
    expect(deleteModal.length).toEqual(0);
  })
})