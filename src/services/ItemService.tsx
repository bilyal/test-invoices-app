export const retrieveCustomers = async () => {
    return Promise.resolve([{
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
    }])
}

export const retrieveProducts = async () => {
    return Promise.resolve([{
        id: 0,
        name: "Banana",
        price: 10.00
    },
    {
        id: 1,
        name: "Mango",
        price: 95
    },
    {
        id: 2,
        name: "Orange",
        price: 74.95
    }])
}